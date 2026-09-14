from pathlib import Path
import re, json, math, hashlib, collections, xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'docs/color-audit'
files=sorted(p for folder in ['src','public'] for p in (ROOT/folder).rglob('*') if p.suffix in ['.css','.tsx','.ts','.svg'])
color_re=re.compile(r'#[0-9a-fA-F]{8}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{4}\b|#[0-9a-fA-F]{3}\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\([^()]*\)|(?<![\w-])(?:white|black|transparent|currentColor)(?![\w-])',re.I)
def rgba(s):
 s=s.lower()
 if s in ['white','black','transparent']: return {'white':[255,255,255,1],'black':[0,0,0,1],'transparent':[0,0,0,0]}[s]
 if s.startswith('#'):
  h=s[1:]; h=''.join(c*2 for c in h) if len(h) in [3,4] else h
  return [int(h[i:i+2],16) for i in (0,2,4)]+[int(h[6:8],16)/255 if len(h)==8 else 1]
 if s.startswith('rgb'):
  v=re.findall(r'[\d.]+%?',s); return [float(x.strip('%'))*2.55 if '%' in x else float(x) for x in v[:3]]+[float(v[3].strip('%'))/(100 if '%' in v[3] else 1) if len(v)>3 else 1]
 return None
def key(s):
 v=rgba(s)
 return ','.join(f'{n:.8g}' for n in v) if v else s.lower()
rows=[]; effects=[]; refs=[]; gradients=[]; manifest=[]
for p in files:
 text=p.read_text(); rel=str(p.relative_to(ROOT))
 scope='svg-artwork' if p.suffix=='.svg' else 'legacy-unreferenced' if p.name in ['prototype.tsx','prototype.module.css'] else 'global' if p.name=='globals.css' else 'active-source'
 manifest.append({'file':rel,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'scope':scope})
 # Comments are masked to preserve source offsets and line numbers.
 clean=re.sub(r'/\*[\s\S]*?\*/|<!--(?:[\s\S]*?)-->',lambda m:re.sub(r'[^\n]',' ',m[0]),text)
 for m in color_re.finditer(clean):
  line=clean.count('\n',0,m.start())+1
  context=clean[max(clean.rfind('\n',0,m.start()),clean.rfind(';',0,m.start()),clean.rfind('{',0,m.start()))+1: min([x for x in [clean.find(';',m.end()),clean.find('\n',m.end()),len(clean)] if x>=0])].strip()
  selector=''
  if p.suffix=='.css':
   brace=clean.rfind('{',0,m.start()); start=max(clean.rfind('}',0,brace),clean.rfind('{',0,brace))+1; selector=clean[start:brace].strip()
  if p.suffix=='.svg':
   tag=clean[clean.rfind('<',0,m.start()):clean.find('>',m.end())+1]
   attrs=re.findall(r'(?:id|fill|stroke|fill-opacity|stroke-opacity|opacity|stop-color|stop-opacity|offset)="[^"]*"',tag)
   context=' '.join(attrs)
  rows.append({'raw':m[0],'normalized_rgba':rgba(m[0]),'key':key(m[0]),'file':rel,'line':line,'scope':scope,'selector':selector,'context':context[:700]})
 for m in re.finditer(r'(?<![\w-])(?:fill-opacity|stroke-opacity|stop-opacity|opacity)\s*[:=]\s*["\']?([.\d]+%?)',clean):
  effects.append({'file':rel,'line':clean.count('\n',0,m.start())+1,'scope':scope,'expression':m[0],'value':m[1]})
 for m in re.finditer(r'var\((--[\w-]+)',clean):
  refs.append({'file':rel,'line':clean.count('\n',0,m.start())+1,'name':m[1]})
 for m in re.finditer(r'(?:repeating-)?(?:linear|radial|conic)-gradient\(',clean):
  start=m.start(); end=m.end(); depth=1
  while depth and end<len(clean):
   depth+=(clean[end]=='(')-(clean[end]==')'); end+=1
  gradients.append({'file':rel,'line':clean.count('\n',0,start)+1,'expression':clean[start:end]})
 if p.suffix=='.svg':
  root=ET.fromstring(text)
  for el in root.iter():
   if el.tag.split('}')[-1] in ['linearGradient','radialGradient']:
    gradients.append({'file':rel,'id':el.get('id'),'expression':ET.tostring(el,encoding='unicode')})
summary={}
for scope in ['active-source','global','legacy-unreferenced','svg-artwork']:
 rr=[r for r in rows if r['scope']==scope]; summary[scope]={'occurrences':len(rr),'raw_spellings':len(set(r['raw'] for r in rr)),'normalized_values':len(set(r['key'] for r in rr))}
def lin(c):
 c=c/255; return c/12.92 if c<=.04045 else ((c+.055)/1.055)**2.4
def lab(s):
 r,g,b=map(lin,rgba(s)[:3]); l=(.4122214708*r+.5363325363*g+.0514459929*b)**(1/3); m=(.2119034982*r+.6806995451*g+.1073969566*b)**(1/3); s=(.0883024619*r+.2817188376*g+.6299787005*b)**(1/3)
 return [.2104542553*l+.793617785*m-.0040720468*s,1.9779984951*l-2.428592205*m+.4505937099*s,.0259040371*l+.7827717662*m-.808675766*s]
opaque=sorted(set('#'+''.join(f'{int(n):02x}' for n in r['normalized_rgba'][:3]) for r in rows if r['scope']=='active-source' and r['normalized_rgba'] and r['normalized_rgba'][3]==1))
near=[]
for i,a in enumerate(opaque):
 for b in opaque[i+1:]:
  d=math.dist(lab(a),lab(b))
  if d<.025: near.append({'a':a,'b':b,'oklab_distance':d})
near.sort(key=lambda x:x['oklab_distance'])
def composite(f,b):
 f=rgba(f) if isinstance(f,str) else f; b=rgba(b) if isinstance(b,str) else b
 return [f[i]*f[3]+b[i]*(1-f[3]) for i in range(3)]+[1]
def contrast(f,b):
 b=rgba(b) if isinstance(b,str) else b; f=composite(f,b)
 a=sum(x*w for x,w in zip(map(lin,f[:3]),[.2126,.7152,.0722])); z=sum(x*w for x,w in zip(map(lin,b[:3]),[.2126,.7152,.0722]))
 return (max(a,z)+.05)/(min(a,z)+.05)
pairs=[]
def pair(label,f,b,threshold=4.5):
 pairs.append({'label':label,'foreground':f,'background':b,'ratio':contrast(f,b),'threshold':threshold,'passes':contrast(f,b)>=threshold})
pair('Learning enabled Continue / cards Resources title','#fff','#5ea8ff')
pair('Article next link','#faf4ea','#5ea8ff')
pair('Resources result count','#5a3a0066','#faf4ea')
pair('Learning result count','#5a3a0066','#fdf9ed')
pair('Header muted navigation on canvas','#737373','#faf4ea')
pair('Header muted navigation on learning canvas','#737373','#fdf9ed')
pair('Glossary placeholder','#005c53a6',composite('#faf4eae6','#005c53'))
pair('Default body','#20291b','#faf4ea')
pair('Article body','#4b4b4b','#faf4ea')
pair('Brand inverse text','#faf4ea','#005c53')
pair('Clear filters enabled','#cc3033',composite('#ffcfcf80','#faf4ea'))
pair('Legacy global focus on canvas','#1cb0f6','#faf4ea',3)
pair('Legacy global focus on brand','#1cb0f6','#005c53',3)
pair('Selected age border against dialog','#5ea8ff','#fdf9ed',3)
pair('Selected age border against selected fill','#5ea8ff',composite('#5ea8ff26','#fdf9ed'),3)
for bg in ['#a5d089','#9ccaed','#dfb6f4','#c9e7dd','#d3a5a8','#ada3e4','#d2b9e2','#2d944d']:
 pair('Resource body on '+bg,'#20291b',bg)
 pair('Resource age pill on '+bg,'#20291b',composite('#00000026',bg))
 pair('Resource download on '+bg,'#fff',composite('#0006',bg))
for bg in ['#c9e7dd','#e8c4ff','#00cd9c','#5ea8ff','#9ccaed','#aea3e3']:
 pair('Learning variant 2 start on '+bg,'#faf4ea',composite('#0006',bg))
for bg,fg in [('#f8ecd7','#393939'),('#ff8361','#301912'),('#5ea8ff','#fff'),('#dddd62','#331a13'),('#a5d089','#393939')]:
 pair('Homepage card title '+bg,fg,bg,3)
 pair('Homepage revealed action '+bg,fg,composite('#0000001a',bg))
payload={'method':'Static source inventory, not computed browser styles. SVG artwork includes unused assets. Color counts include currentColor and transparent; opacity is separate. Near duplicates: active opaque literals, Euclidean OKLab < 0.025; candidates, not automatic merges. Contrast: WCAG sRGB with unrounded alpha compositing.','summary':summary,'files':manifest,'colors':rows,'opacity':effects,'gradients':gradients,'variable_references':refs,'near_duplicates':near,'contrast_pairs':pairs}
(OUT/'inventory.json').write_text(json.dumps(payload,indent=2)+'\n')
md=['# Color source inventory','',payload['method'],'','## Counts','', '| Scope | Occurrences | Raw spellings | Normalized values |','| --- | ---: | ---: | ---: |']
for s,v in summary.items(): md.append(f"| {s} | {v['occurrences']} | {v['raw_spellings']} | {v['normalized_values']} |")
for scope in summary:
 md+=['',f'## {scope} — all values','', '| Normalized RGBA / keyword | Source spellings | Occurrences | Locations |','| --- | --- | ---: | --- |']
 groups=collections.defaultdict(list)
 for r in rows:
  if r['scope']==scope:groups[r['key']].append(r)
 for k,rs in sorted(groups.items()):
  locs=sorted(set((r['file'],r['line']) for r in rs)); loc='; '.join(f'[{f}:{n}]({ROOT/f}:{n})' for f,n in locs)
  md.append(f"| `{k}` | {', '.join('`'+v+'`' for v in sorted(set(r['raw'] for r in rs)))} | {len(rs)} | {loc} |")
md+=['','## Near-duplicate candidates','','| A | B | OKLab distance |','| --- | --- | ---: |']
for n in near:md.append(f"| `{n['a']}` | `{n['b']}` | {n['oklab_distance']:.5f} |")
md+=['','## Opacity declarations','','| Location | Scope | Expression |','| --- | --- | --- |']
for e in effects:md.append(f"| [{e['file']}:{e['line']}]({ROOT/e['file']}:{e['line']}) | {e['scope']} | `{e['expression']}` |")
md+=['','## Gradients','',f'{len(gradients)} authored CSS/SVG gradient definitions found.']
for g in gradients:md+=['',f"{g['file']} {g.get('id','')}",'```xml',g['expression'],'```']
(OUT/'inventory.md').write_text('\n'.join(md)+'\n')
cm=['# Static contrast calculations','','Alpha backgrounds are composited over their known parent; intermediate RGB channels stay unrounded. Arrays are resolved [R,G,B,A]. Ratios are rounded for display only. Thresholds apply to the stated text/state; this is not a full conformance audit.','','| Pair | Foreground | Background | Ratio | Target | Result |','| --- | --- | --- | ---: | ---: | --- |']
for p in pairs:cm.append(f"| {p['label']} | `{p['foreground']}` | `{p['background']}` | {p['ratio']:.2f} | {p['threshold']} | {'Pass' if p['passes'] else 'Below target'} |")
(OUT/'contrast.md').write_text('\n'.join(cm)+'\n')
print(json.dumps({'summary':summary,'files':len(files),'gradients':len(gradients),'near':near,'contrast_failures':[p for p in pairs if not p['passes']]},indent=2))

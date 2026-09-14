"""Map FiraGO 1.001's existing .case glyphs to Unicode Mtavruli.
Run with fonttools[woff] installed; source WOFF2 files stay untouched.
"""
from pathlib import Path
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1] / 'public/fonts/firago'
for weight in ('Regular', 'Medium', 'SemiBold', 'Bold'):
    font = TTFont(root / f'FiraGO-{weight}.woff2')
    cmap = font.getBestCmap()
    mappings = {}
    for code in list(range(0x10D0, 0x10FB)) + list(range(0x10FD, 0x1100)):
        glyph = cmap[code] + '.case'
        assert glyph in font.getGlyphOrder(), (weight, hex(code), glyph)
        mappings[code + 0xBC0] = glyph
    for table in font['cmap'].tables:
        if table.isUnicode():
            table.cmap.update(mappings)
    # Rename the derivative; retain all copyright and license records.
    for record in font['name'].names:
        if record.nameID in (1, 4, 6, 16, 17, 3):
            value = {1: 'Hub UI', 4: f'Hub UI {weight}', 6: f'HubUI-{weight}',
                     16: 'Hub UI', 17: weight, 3: f'HubUI-{weight}-Mtavruli-1'}[record.nameID]
            record.string = value.encode(record.getEncoding())
    font.save(root / f'HubUI-{weight}.woff2')
    print(f'{weight}: mapped {len(mappings)} Mtavruli capitals')

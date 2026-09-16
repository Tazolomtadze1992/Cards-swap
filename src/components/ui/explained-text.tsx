import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { glossaryItems } from "../homepage-prototype/glossary-data";
import { TermExplanation } from "./term-explanation";

// Service definitions from N5, section 1; digital terms reuse the site's glossary.
const terms = [
  ...glossaryItems.filter(item => ["ავატარი", "ბრაუზერი", "გეოლოკაცია", "კონფიდენციალურობა", "ონლაინ", "ფიშინგი", "ციფრული კვალი", "ჰეშთეგი"].includes(item.term)),
  { term: "ვებგვერდი", definition: "ინტერნეტში გახსნილი გვერდი, სადაც შეგიძლია წაიკითხო ტექსტი, ნახო სურათები ან ვიდეო." },
  { term: "საძიებო სისტემები", definition: "სერვისები, რომლებიც ინტერნეტში ინფორმაციის მოძებნაში გეხმარება. ჩაწერე სიტყვა ან კითხვა და ნახავ დაკავშირებულ გვერდებს." },
  { term: "შეტყობინება", definition: "როცა ძალადობის ან საფრთხის შესახებ ეუბნები სამსახურს, რომელსაც შენი დაცვა შეუძლია." },
  { term: "რეფერირება", definition: "როცა ადამიანი ან სამსახური გაკავშირებს სხვა სპეციალისტთან ან სერვისთან, რომელსაც შეუძლია დაგეხმაროს." },
  { term: "გადამისამართება", definition: "როცა ადამიანი ან სამსახური გაკავშირებს სხვა სპეციალისტთან ან სერვისთან, რომელსაც შეუძლია დაგეხმაროს." },
].sort((a, b) => b.term.length - a.term.length);
const byTerm = new Map(terms.map(item => [item.term, item.definition]));
const pattern = new RegExp(`(?<![\\p{L}\\p{N}])(${terms.map(item => item.term).join("|")})(?![\\p{L}\\p{N}])`, "gu");

export function ExplainedText({ children }: { children: string }) {
  return children.split(pattern).map((part, index) => {
    const definition = byTerm.get(part);
    return definition ? <TermExplanation key={index} term={part} definition={definition} /> : part;
  });
}

// Only transform prose, never headings, links, controls, or other components.
export function explainProse(children: ReactNode): ReactNode {
  return Children.map(children, child => {
    if (typeof child === "string") return <ExplainedText>{child}</ExplainedText>;
    if (!isValidElement<{ children?: ReactNode }>(child) || typeof child.type !== "string" ||
      !["p", "ul", "ol", "li", "strong", "em", "span"].includes(child.type)) return child;
    return cloneElement(child, {}, explainProse(child.props.children));
  });
}

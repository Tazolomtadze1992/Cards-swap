import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import type { FaqItem } from "./faq-data";
import styles from "./faq-list.module.css";

function FaqAnswer({ answer }: { answer: string }) {
  return <div className={styles.answer}>
    {answer.split("\n\n").map((section, index) => section.startsWith("- ")
      ? <ul key={index}>{section.split("\n").map(line => <li key={line}>{line.slice(2)}</li>)}</ul>
      : <p key={index}>{section}</p>)}
  </div>;
}

export function FaqList({ items, name, fullPage = false, appearance = "default" }: { items: FaqItem[]; name: string; fullPage?: boolean; appearance?: "default" | "light" }) {
  return <div className={fullPage ? styles.fullList : styles.list}>
    <Accordion appearance={appearance} type="single" collapsible data-faq-list={name}>
      {items.map((item, index) => <AccordionItem key={item.question} value={item.question} id={fullPage ? `faq-${index}` : undefined}>
        <AccordionTrigger headingLevel={fullPage ? 2 : 3}>
          <span>{item.question}</span>
        </AccordionTrigger>
        <AccordionContent><FaqAnswer answer={item.answer} /></AccordionContent>
      </AccordionItem>)}
    </Accordion>
  </div>;
}

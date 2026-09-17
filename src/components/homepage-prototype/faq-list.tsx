import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import type { FaqItem } from "./faq-data";
import styles from "./faq-list.module.css";

export function FaqList({ items, name, fullPage = false, appearance = "default" }: { items: FaqItem[]; name: string; fullPage?: boolean; appearance?: "default" | "light" }) {
  return <div className={fullPage ? styles.fullList : styles.list}>
    <Accordion appearance={appearance} type="single" collapsible data-faq-list={name}>
      {items.map((item, index) => <AccordionItem key={item.question} value={item.question} id={fullPage ? `faq-${index}` : undefined}>
        <AccordionTrigger headingLevel={fullPage ? 2 : 3}>
          <span>{item.question}</span>
        </AccordionTrigger>
        <AccordionContent><p>{item.answer}</p></AccordionContent>
      </AccordionItem>)}
    </Accordion>
  </div>;
}

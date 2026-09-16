import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { Modal } from "../ui/modal";
import { supportPeople, supportAgencies } from "./services-people-data";
import { ReadingContent, ContentSection } from "../ui/reading-content";
import styles from "./services.module.css";

export function ServicesPeopleDialog({ onClose }: { onClose: () => void }) {
  return <Modal title="ვინ და როგორ გეხმარება?" onClose={onClose}>
    <ReadingContent width="full">
      <ContentSection as="div">
        <p>სისტემაში ბევრი ადამიანი და სამსახური ჩანს, მაგრამ მათი მოძებნა შენ არ მოგიწევს. უთხარი შენს საჭიროებაზე იმას, ვისთანაც საუბარი უსაფრთხოდ შეგიძლია. თუ დახმარება სხვა სამსახურს შეუძლია, ამ ადამიანმა უნდა დაგაკავშიროს.</p>
      </ContentSection>
      <ContentSection width="full">
        <h3>ადამიანები და სერვისები, რომლებსაც შეიძლება შეხვდე</h3>
        <Accordion type="single" collapsible appearance="light">
          {supportPeople.map(person => <AccordionItem value={person.title} key={person.title}>
            <AccordionTrigger headingLevel={4}>{person.title}</AccordionTrigger>
            <AccordionContent>
              <div className={styles.peopleAnswer}>
                <div><h5>რაზეა პასუხისმგებელი?</h5><p>{person.responsibility}</p></div>
                <div><h5>რა შეიძლება მოხდეს შემდეგ?</h5><p>{person.next}</p></div>
              </div>
            </AccordionContent>
          </AccordionItem>)}
        </Accordion>
      </ContentSection>
      <ContentSection width="full">
        <h3>უწყებები, რომლებიც სისტემას ამუშავებენ</h3>
        <Accordion type="single" collapsible appearance="light">
          {supportAgencies.map(agency => <AccordionItem value={agency.title} key={agency.title}>
            <AccordionTrigger headingLevel={4}>{agency.title}</AccordionTrigger>
            <AccordionContent><p>{agency.responsibility}</p></AccordionContent>
          </AccordionItem>)}
        </Accordion>
      </ContentSection>
      <ContentSection>
        <h3>რას ნიშნავს ეს მარტივად?</h3>
        <p>შენ არ გევალება ამ უწყებების სახელების დამახსოვრება. მთავარია იცოდე, რომ დახმარება ერთ ადამიანს არ უნდა ეკიდოს. თუ საჭიროა, სხვადასხვა სამსახური ერთმანეთს უკავშირდება და თითოეული თავის საქმეს აკეთებს.</p>
      </ContentSection>
    </ReadingContent>
  </Modal>;
}

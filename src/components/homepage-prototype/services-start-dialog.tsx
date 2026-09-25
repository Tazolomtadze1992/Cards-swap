import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Modal } from "../ui/modal";
import { ReadingContent, ContentSection } from "../ui/reading-content";
import { labelText } from "./label-text";
import styles from "./services.module.css";

// N5, section 2 and its visual map. These are possible routes, not mandatory steps.
export function ServicesStartDialog({ onClose, onShowContacts, onRequestCall112 }: { onClose: () => void; onShowContacts: () => void; onRequestCall112: () => void }) {
  return <Modal title="დახმარება გჭირდება - საიდან დაიწყო?" onClose={onClose}>
    <ReadingContent width="full">
      <ContentSection as="div">
        <p>ეს რუკა დახმარების ერთ შესაძლო გზას გაჩვენებს. თუმცა იცოდე, რომ ყველა ბავშვის ამბავი ერთნაირი არაა. ყველა ბავშვი ყველა ნაბიჯს არ გადის. შეგიძლია დახმარება იქიდან დაიწყო, ვისთან საუბარიც უფრო უსაფრთხოდ გეჩვენება.</p>
      </ContentSection>

      <ContentSection className={styles.startCallout} width="full">
        <h3>საფრთხე ახლავეა?</h3>
        <p>თუ შენ ან შენი ახლობელი ვინმემ შეიძლება ახლავე დააზიანოს, გადადი უსაფრთხო ადგილას, თუ ამას შეძლებ, და დარეკე 112-ზე. თუ საფრთხე ახლავე არ არის, მაინც შეგიძლია დახმარება ითხოვო შენთვის უსაფრთხო გზით. იცოდე, რომ დახმარების თხოვნისთვის უფროსების თანხმობა არ გჭირდება.</p>
        <Button variant="call" onClick={onRequestCall112}><Icon name="phone" />{labelText("ზარი 112-ზე")}</Button>
      </ContentSection>

      <ContentSection width="full">
        <Accordion type="single" collapsible appearance="light">
          <AccordionItem value="start">
            <AccordionTrigger>დახმარება გჭირდება — საიდან დაიწყო?</AccordionTrigger>
            <AccordionContent>
              <ContentSection as="div">
                <p>შეგიძლია უთხრა სანდო უფროსს, სკოლის თანამშრომელს, მანდატურს, სოციალურ მუშაკს, ექიმს ან პირდაპირ იმ სამსახურს, ვინც ბავშვთა დაცვაზე ზრუნავს. თუ მეგობარს ეუბნები, მას შეუძლია შენთან ერთად მივიდეს უფროსთან.</p>
                <p>შენი დაცვა მეგობრის პასუხისმგებლობა არ არის — ამაზე უფროსებმა და სამსახურებმა უნდა იზრუნონ.</p>
              </ContentSection>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="first">
            <AccordionTrigger>რა მოხდება პირველად?</AccordionTrigger>
            <AccordionContent><ContentSection as="div">
              <p>მას შემდეგ, რაც შენს ამბავს მოყვები, ჯერ მოგისმენენ. შემდეგ ნახავენ, უსაფრთხოდ ხარ თუ არა და რა გჭირდება ახლა.</p>
              <p>შეიძლება ერთი უფროსი ადამიანი მარტო ვერ დაგეხმაროს, მაგრამ აგიხსნას, ვის უნდა უთხრას ეს ამბავი და რატომ. ყველა დეტალის მოყოლა ერთდროულად არ არის აუცილებელი.</p>
            </ContentSection></AccordionContent>
          </AccordionItem>
          <AccordionItem value="support">
            <AccordionTrigger>რა დახმარება შეიძლება მიიღო?</AccordionTrigger>
            <AccordionContent><ContentSection as="div">
              <p>შეიძლება დაგჭირდეს სხვადასხვანაირი დახმარება. ზოგჯერ პოლიციაც ერთვება.</p>
              <p>ეს ადამიანები სხვადასხვა საქმეს აკეთებენ, მაგრამ შენს დასახმარებლად ერთმანეთს უკავშირდებიან.</p>
            </ContentSection></AccordionContent>
          </AccordionItem>
          <AccordionItem value="next">
            <AccordionTrigger>რა ხდება მერე?</AccordionTrigger>
            <AccordionContent><ContentSection as="div">
              <p>დახმარება ერთი საუბრით ყოველთვის არ მთავრდება. შესაბამისი სპეციალისტი შეიძლება დაგიკავშირდეს ისევ, ნახოს, როგორ ხარ და გადაამოწმოს, მიიღე თუ არა საჭირო დახმარება.</p>
            </ContentSection></AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContentSection>

      <ContentSection className={styles.startCallout} width="full">
        <h3>თუ პირველმა ადამიანმა ვერ დაგეხმარა</h3>
        <p>მიმართე სხვა სანდო უფროსს ან სერვისს. დახმარების თხოვნა ისევ შეგიძლია.</p>
        <Button onClick={onShowContacts}>{labelText("სერვისების ნახვა")}<Icon name="chevronsRight" /></Button>
      </ContentSection>
    </ReadingContent>
  </Modal>;
}

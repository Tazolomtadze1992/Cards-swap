import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Modal } from "../ui/modal";
import { ReadingContent, ContentSection } from "../ui/reading-content";
import { labelText } from "./label-text";
import styles from "./services.module.css";

// N5, section 2 and its visual map. These are possible routes, not mandatory steps.
export function ServicesStartDialog({ onClose, onShowContacts, onRequestCall112 }: { onClose: () => void; onShowContacts: () => void; onRequestCall112: () => void }) {
  return <Modal title="დახმარება მჭირდება - საიდან დავიწყო?" onClose={onClose}>
    <ReadingContent width="full">
      <ContentSection as="div">
        <p>დახმარება შეგიძლია დაიწყო იმ გზით, რომელიც უფრო უსაფრთხოდ გეჩვენება. ყველა ბავშვის ამბავი ერთნაირი არ არის და ყველა ბავშვი ყველა ნაბიჯს არ გადის.</p>
      </ContentSection>

      <ContentSection className={styles.startCallout} width="full">
        <h3>საფრთხე ახლავეა?</h3>
        <p>თუ შენ ან შენი ახლობელი ვინმემ შეიძლება ახლავე დააზიანოს, გადადი უსაფრთხო ადგილას, თუ ამას შეძლებ, და დარეკე 112-ზე. თუ საფრთხე ახლავე არ არის, მაინც შეგიძლია დახმარება ითხოვო შენთვის უსაფრთხო გზით.</p>
        <Button variant="call" onClick={onRequestCall112}><Icon name="phone" />{labelText("ზარი 112-ზე")}</Button>
      </ContentSection>

      <ContentSection width="full">
        <Accordion type="single" collapsible appearance="light">
          <AccordionItem value="start">
            <AccordionTrigger>ვის შემიძლია მივმართო?</AccordionTrigger>
            <AccordionContent>
              <ContentSection as="div">
                <p>შეგიძლია აირჩიო, ვისთან საუბარია შენთვის უსაფრთხო:</p>
                <ul>
                  <li><strong>ოჯახი ან სხვა სანდო უფროსი</strong> — მშობელი, მზრუნველი ან ნათესავი, თუ მათთან საუბარი უსაფრთხოა.</li>
                  <li><strong>მეგობარი ან თანატოლი</strong> — შეუძლია მოგისმინოს და შენთან ერთად მივიდეს უფროსთან.</li>
                  <li><strong>სკოლა და მანდატურის სამსახური</strong> — მასწავლებელი, სკოლის თანამშრომელი, მანდატური, ფსიქოლოგი ან სოციალური მუშაკი.</li>
                  <li><strong>პირდაპირ მხარდაჭერის სერვისი</strong> — სოციალური სამსახური, ცხელი ხაზი, ექიმი, პოლიცია, იურიდიული, მუნიციპალური ან არასამთავრობო სერვისი.</li>
                </ul>
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
            <AccordionTrigger>რა დახმარება შეიძლება მივიღო?</AccordionTrigger>
            <AccordionContent><ContentSection as="div">
              <p>შენი საჭიროებების მიხედვით შეიძლება ჩაერთოს ერთი ან რამდენიმე მიმართულება:</p>
              <ul>
                <li>უსაფრთხოება და სოციალური მხარდაჭერა;</li>
                <li>ფსიქოლოგიური მხარდაჭერა;</li>
                <li>სამედიცინო დახმარება;</li>
                <li>უფლებები და იურიდიული დახმარება;</li>
                <li>თუ საჭიროა — პოლიცია, გამოძიება ან სასამართლო.</li>
              </ul>
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

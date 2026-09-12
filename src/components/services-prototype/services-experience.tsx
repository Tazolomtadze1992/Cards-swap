"use client";

import { useMemo, useState } from "react";
import { contacts, helpNodes, people, sectionTitles, stages } from "./data";
import styles from "./services-prototype.module.css";

type SectionId = "system" | "help" | "people" | "process" | "barnahus" | "contacts";
type Direction = "quiet" | "directory" | "map";

const sectionIds: SectionId[] = ["system", "help", "people", "process", "barnahus", "contacts"];

export function ServicesExperience({ direction }: { direction: Direction }) {
  const [open, setOpen] = useState<Set<SectionId>>(new Set());
  const [selectedNode, setSelectedNode] = useState("start");
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [copied, setCopied] = useState("");
  const [emergencyClicked, setEmergencyClicked] = useState(false);

  const order = useMemo<SectionId[]>(() => {
    if (direction === "directory") return ["contacts", "help", "people", "process", "system", "barnahus"];
    if (direction === "map") return ["help", "process", "people", "system", "barnahus", "contacts"];
    return sectionIds;
  }, [direction]);

  function toggle(id: SectionId) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function copyNumber(number: string) {
    await navigator.clipboard.writeText(number);
    setCopied(number);
    window.setTimeout(() => setCopied(""), 1800);
  }

  function renderSection(id: SectionId) {
    const title = sectionTitles[sectionIds.indexOf(id)];
    const isOpen = open.has(id);
    return (
      <section className={styles.accordion} key={id} data-section={id}>
        <h2>
          <button type="button" onClick={() => toggle(id)} aria-expanded={isOpen} aria-controls={`panel-${id}`}>
            <span>{title}</span>
            <span className={styles.sign} aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
        </h2>
        {isOpen && (
          <div className={styles.panel} id={`panel-${id}`}>
            {id === "system" && <SystemContent />}
            {id === "help" && <HelpMap selected={selectedNode} onSelect={setSelectedNode} />}
            {id === "people" && (
              <PeopleDirectory selected={selectedPerson} onSelect={setSelectedPerson} />
            )}
            {id === "process" && <ProcessStages />}
            {id === "barnahus" && <Barnahus />}
            {id === "contacts" && <ContactDirectory copied={copied} onCopy={copyNumber} />}
          </div>
        )}
      </section>
    );
  }

  return (
    <div className={styles.page} data-direction={direction}>
      <header className={styles.siteHeader}>
        <a href="#content">ბავშვთა უსაფრთხოების ჰაბი</a>
        <span>სერვისები</span>
      </header>
      <main id="content" className={styles.main}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{direction === "map" ? "ერთი შესაძლო გზა" : direction === "directory" ? "სწრაფი კონტაქტები და გზები" : "სერვისები და მხარდაჭერა"}</p>
          <h1>სერვისები და მხარდაჭერა</h1>
          <p>აქ გაიგებ ვის შეიძლება მიმართო, როგორ შეიძლება დაგეხმარონ და რა შეიძლება მოხდეს შემდეგ.</p>
        </div>

        <aside className={styles.emergency} aria-label="გადაუდებელი დახმარება">
          <div>
            <strong>საფრთხე ახლავეა?</strong>
            <span>თუ შეგიძლია, გადადი უსაფრთხო ადგილას და დარეკე 112-ზე.</span>
          </div>
          <a href="tel:112" onClick={() => setEmergencyClicked(true)}>დარეკე 112-ზე</a>
        </aside>

        <div className={styles.layout}>
          <div className={styles.sections}>{order.map(renderSection)}</div>
          {direction !== "quiet" && (
            <aside className={styles.contextRail}>
              <strong>{direction === "directory" ? "სასწრაფოდ გჭირდება კონტაქტი?" : "ეს არ არის სავალდებულო გზა"}</strong>
              <p>{direction === "directory" ? "გახსენი პირველი სექცია და აირჩიე ნომერი." : "ყველა ბავშვის ამბავი განსხვავებულია. შეგიძლია დაიწყო იქიდან, სადაც თავს უსაფრთხოდ გრძნობ."}</p>
            </aside>
          )}
        </div>

        <div className={styles.reassurance} role="note">
          <strong>თუ პირველმა ადამიანმა ვერ დაგეხმარა, უთხარი სხვას.</strong>
          <span>მიმართე სხვა სანდო უფროსს ან სერვისს.</span>
        </div>

        <details className={styles.debug}>
          <summary>ტესტის პანელი</summary>
          <div>
            <button type="button" onClick={() => setOpen(new Set(sectionIds))}>ყველას გახსნა</button>
            <button type="button" onClick={() => setOpen(new Set())}>ყველას დაკეცვა</button>
            <button type="button" onClick={() => { setOpen(new Set()); setSelectedNode("start"); setSelectedPerson(0); setCopied(""); setEmergencyClicked(false); }}>ყველა მდგომარეობის გასუფთავება</button>
            <output>ღია: {open.size}/6 · რუკა: {selectedNode} · ადამიანი: {selectedPerson + 1} · 112: {emergencyClicked ? "დაჭერილია" : "არა"}</output>
          </div>
        </details>
      </main>
    </div>
  );
}

function SystemContent() {
  return (
    <div className={styles.prose}>
      <p>ბავშვთა დაცვის სისტემა არის ადამიანები და სამსახურები, რომლებიც ერთად ზრუნავენ, რომ ბავშვმა თავი იგრძნოს უსაფრთხოდ და დაცულად და, საჭიროებისას, მიიღოს დახმარება.</p>
      <p>დახმარება მაშინაც შეგიძლია ითხოვო, თუ ზუსტად არ იცი რა მოხდა, როგორ მოყვე ან რა ჰქვია მომხდარს.</p>
      <ul>
        <li>ცუდი შეგრძნება ან ეჭვიც საკმარისია დახმარების სათხოვნელად.</li>
        <li>მომხდარის დამტკიცება ან მტკიცებულებების შეგროვება შენი საქმე არ არის.</li>
        <li>თუ ვინმემ ზიანი მოგაყენა, ეს შენი ბრალი არ არის.</li>
        <li>ყველა ბავშვი ყველა სპეციალისტს არ ხვდება.</li>
      </ul>
    </div>
  );
}

function HelpMap({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const selectedItem = helpNodes.find((node) => node.id === selected) ?? helpNodes[0];
  return (
    <div>
      <p className={styles.sectionLead}>ეს მხოლოდ ერთი შესაძლო გზაა. დააჭირე ნებისმიერ ნაბიჯს განმარტებისთვის.</p>
      <div className={styles.mapGrid}>
        <MapNode id="start" selected={selected} onSelect={onSelect} />
        <div className={styles.connector} aria-hidden="true">↓</div>
        <MapNode id="danger" selected={selected} onSelect={onSelect} />
        <div className={styles.branchLabels} aria-hidden="true"><span>კი ↙</span><span>↘ არა</span></div>
        <div className={styles.branches}>
          <MapNode id="urgent" selected={selected} onSelect={onSelect} />
          <div className={styles.normalPath}>
            <MapNode id="not-urgent" selected={selected} onSelect={onSelect} />
            <span aria-hidden="true">↓</span>
            <MapNode id="tell" selected={selected} onSelect={onSelect} />
            <span aria-hidden="true">↓</span>
            <MapNode id="listen" selected={selected} onSelect={onSelect} />
            <span aria-hidden="true">↓</span>
            <MapNode id="support" selected={selected} onSelect={onSelect} />
            <span aria-hidden="true">↓</span>
            <MapNode id="follow" selected={selected} onSelect={onSelect} />
          </div>
        </div>
      </div>
      <div className={styles.mapExplanation} aria-live="polite">
        <span>არჩეული ნაბიჯი</span>
        <strong>{selectedItem.label}</strong>
        <p>{selectedItem.text}</p>
      </div>
    </div>
  );
}

function MapNode({ id, selected, onSelect }: { id: string; selected: string; onSelect: (id: string) => void }) {
  const item = helpNodes.find((node) => node.id === id)!;
  return <button type="button" className={styles.mapNode} data-selected={selected === id || undefined} onClick={() => onSelect(id)}>{item.label}</button>;
}

function PeopleDirectory({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  const person = people[selected];
  return (
    <div>
      <p className={styles.sectionLead}>მათი მოძებნა შენ არ მოგიწევს. აირჩიე ადამიანი ან სერვისი და ნახე, როგორ შეიძლება დაგეხმაროს.</p>
      <div className={styles.peopleLayout}>
        <div className={styles.personList} role="list">
          {people.map((item, index) => (
            <button type="button" key={item.name} data-selected={selected === index || undefined} onClick={() => onSelect(index)}>{item.name}<span aria-hidden="true">›</span></button>
          ))}
        </div>
        <article className={styles.personDetail} aria-live="polite">
          <span>არჩეული</span><h3>{person.name}</h3>
          <dl>
            <div><dt>ვინ არის</dt><dd>{person.who}</dd></div>
            <div><dt>რაში გეხმარება</dt><dd>{person.helps}</dd></div>
            <div><dt>რა შეიძლება მოხდეს შემდეგ</dt><dd>{person.next}</dd></div>
          </dl>
        </article>
      </div>
    </div>
  );
}

function ProcessStages() {
  return <ol className={styles.stages}>{stages.map(([number, title, text]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ol>;
}

function Barnahus() {
  return (
    <div className={styles.prose}>
      <p><strong>ბარნაჰუსი</strong> თბილისში არსებული ბავშვზე მორგებული ადგილია, სადაც სექსუალური ძალადობის მსხვერპლ ბავშვს რამდენიმე სპეციალისტი ერთ სივრცეში ეხმარება.</p>
      <ul>
        <li>იქ შეიძლება შეხვდე სოციალურ მუშაკს, ფსიქოლოგს, ექიმს და ბავშვისთვის მომზადებულ გამომძიებელს.</li>
        <li>სპეციალისტები აფასებენ უსაფრთხოებასა და საჭიროებებს, გეგმავენ დახმარებას და აკვირდებიან მის მიმდინარეობას.</li>
        <li>ბარნაჰუსის მოძებნა ბავშვს არ ევალება — შესაბამისი სამსახური უნდა დაეხმაროს დაკავშირებაში.</li>
        <li>სხვა ქალაქიდან ჩართვა და თბილისში ჩამოყვანა შესაძლებელია კონკრეტული შემთხვევის მიხედვით.</li>
      </ul>
    </div>
  );
}

function ContactDirectory({ copied, onCopy }: { copied: string; onCopy: (number: string) => void }) {
  return (
    <div>
      <p className={styles.sectionLead}>თუ მარტო დარეკვა გიჭირს, შეგიძლია სანდო უფროსს სთხოვო, შენთან ერთად დარეკოს.</p>
      <div className={styles.contactList}>
        {contacts.map((contact) => (
          <article key={contact.service} className={styles.contactCard}>
            <div className={styles.contactTop}><h3>{contact.service}</h3><div>{contact.facts.map((fact) => <span key={fact} data-tbd={fact.includes("TBD") || undefined}>{fact}</span>)}</div></div>
            <p><strong>როდის გამოიყენებ:</strong> {contact.use}</p>
            <p><strong>როგორ გეხმარება:</strong> {contact.helps}</p>
            {contact.note && <p className={styles.contactNote}>{contact.note}</p>}
            <div className={styles.numberRows}>
              {contact.numbers.map((number) => {
              const tel = number.replace(/\s/g, "").replace(/\((\d+)\)/, ",$1");
                return <div key={number}><code>{number}</code><a href={`tel:${tel}`}>დარეკვა</a><button type="button" onClick={() => onCopy(number)}>{copied === number ? "დაკოპირდა" : "კოპირება"}</button></div>;
              })}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

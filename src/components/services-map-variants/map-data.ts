// Content of the client's "ბავშვთა დაცვის სისტემის მარტივი რუკა" diagram, transcribed once
// so every presentation variant shows identical wording.

export type Tone = "blue" | "green" | "purple" | "warm" | "danger";

export const mapTitle = "ბავშვთა დაცვის სისტემის მარტივი რუკა";
export const mapSubtitle = "დახმარება შეიძლება სხვადასხვა გზით დაიწყოს — ყველა ბავშვი ყველა ეტაპს არ გადის";

export const start = "ბავშვს დახმარება სჭირდება ან ვინმე მის უსაფრთხოებაზე წუხს";
export const dangerQuestion = "საფრთხე ახლავეა ან სასწრაფო სამედიცინო დახმარებაა საჭირო?";
export const dangerYes = { answer: "კი", text: "გადადი უსაფრთხო ადგილას და დაუკავშირდი 112-ს ან სანდო უფროსს" };
export const dangerNo = { answer: "არა / არ ვარ დარწმუნებული", text: "დახმარება შეიძლება დაიწყო იმ გზით, რომელიც უფრო უსაფრთხოდ გეჩვენება" };

export const whoTitle = "ვის შეიძლება მიმართო პირველ რიგში?";
export const who: { title: string; text: string; tone: Tone }[] = [
  { title: "ოჯახი ან სხვა სანდო უფროსი", text: "მშობელი, მზრუნველი ან ნათესავი — თუ მასთან საუბარი უსაფრთხოა", tone: "blue" },
  { title: "მეგობარი ან თანატოლი", text: "შეიძლება მოგისმინოს და უფროსთან ან სერვისთან დაკავშირებაში დაგეხმაროს", tone: "purple" },
  { title: "სკოლა და მანდატურის სამსახური", text: "მასწავლებელი, ადმინისტრაცია, ფსიქოლოგი, სოციალური მუშაკი, მანდატური ან ფსიქოსოციალური მომსახურება", tone: "warm" },
  { title: "პირდაპირ მხარდამჭერის სერვისი", text: "სოციალური სამსახური, ცხელი ხაზი, ექიმი, პოლიცია, იურიდიული, მუნიციპალური ან არასამთავრობო სერვისი", tone: "green" },
];
export const whoNote = "მეგობარს შეუძლია მხარში დაგიდგეს; დაცვაზე პასუხისმგებლობა უფროსებსა და შესაბამის სამსახურებს აქვთ.";
export const anyPath = "ნებისმიერი ამ გზიდან";

export const firstResponse = "პირველი პასუხი: მოგისმინონ, იზრუნონ უსაფრთხოებაზე, გაიგონ რა გჭირდება და აგიხსნან შემდეგი ნაბიჯი";
export const assessment = "საჭიროების შეფასება, რეფერირება და შესაბამის ადამიანებსა და სერვისებს შორის თანამშრომლობა";

export const helpTitle = "საჭიროების მიხედვით შეიძლება ჩაერთოს ერთი ან რამდენიმე მიმართულება";
export const help: { title: string; tone: Tone }[] = [
  { title: "უსაფრთხოება და სოციალური მხარდაჭერა", tone: "blue" },
  { title: "ფსიქოლოგიური მხარდაჭერა", tone: "purple" },
  { title: "სამედიცინო დახმარება", tone: "green" },
  { title: "უფლებები და იურიდიული დახმარება", tone: "warm" },
  { title: "თუ საჭიროა: პოლიცია, გამოძიება ან სასამართლო", tone: "danger" },
];

export const ongoing = "მიმდინარე მხარდაჭერა, უსაფრთხოება და აღდგენა";
export const fallback = "თუ პირველმა ადამიანმა ვერ დაგეხმარა, მიმართე სხვა სანდო უფროსს ან სერვისს.";

/** Five stages, named after the dialog's existing accordion questions so the map and text agree. */
export const stages = [
  { id: "danger", short: "საფრთხე ახლავეა?" },
  { id: "who", short: "ვის უთხრა?" },
  { id: "first", short: "რა მოხდება პირველად?" },
  { id: "help", short: "რა დახმარება შეიძლება მიიღო?" },
  { id: "next", short: "რა ხდება მერე?" },
] as const;
export type StageId = (typeof stages)[number]["id"];

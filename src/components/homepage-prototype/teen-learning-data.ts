import { learningTopics } from "./learning-data";

// The first three entries reproduce the Figma copy. Remaining entries reuse
// existing prototype copy to preview twelve cards; not approved 14–18 content.
export const teenLearningTopics = [
  { id: "teen-rights", title: "შენი უფლებები", intro: "უსაფრთხო და საფრთხის შემცველი სიტუაციები", theme: 0 },
  { id: "teen-safety", title: "უსაფრთხო და საფრთხის შემცველი სიტუაციები", intro: "ემოციური სტრესი, “გაყინვის” რეაქცია და საფრთხის არიდება", theme: 1 },
  { id: "teen-scenarios", title: "სექსუალური ძალადობის ფორმებთან დაკავშირებული სცენები", intro: "უსაფრთხო და საფრთხის შემცველი სიტუაციები", theme: 3 },
  ...learningTopics.filter((_, index) => ![3, 4, 6].includes(index)).map((item, index) => ({ ...item, id: `teen-${item.id}`, theme: [0, 0, 0, 2, 3, 4, 5, 5, 6][index] })),
];

import { faqItems } from "./faq-data";
import { glossaryItems } from "./glossary-data";
import { resources } from "./resources-data";
import { serviceTopics } from "./services-topics";

export type SearchCategory = "resources" | "glossary" | "faq" | "services";
export type SearchResult = {
  id: string;
  category: SearchCategory;
  title: string;
  description: string;
  href: string;
};

export const searchResults: SearchResult[] = [
  ...resources.map(item => ({
    id: `resource-${item.id}`, category: "resources" as const,
    title: item.title, description: `${item.type} · ${item.age} · ${item.description}`,
    href: `/prototypes/resources#resource-${item.id}`,
  })),
  ...glossaryItems.map((item, index) => ({
    id: `term-${index}`, category: "glossary" as const,
    title: item.term, description: item.definition,
    href: `/prototypes/glossary#term-${index}`,
  })),
  ...faqItems.map((item, index) => ({
    id: `faq-${index}`, category: "faq" as const,
    title: item.question, description: item.answer.replace(/\s+/g, " "),
    href: `/prototypes/faq#faq-${index}`,
  })),
  ...serviceTopics.map(item => ({
    id: `service-${item.id}`, category: "services" as const,
    title: item.title, description: "მხარდამჭერი სერვისები და დახმარების გზები",
    href: `/prototypes/services#service-${item.id}`,
  })),
];

const normalize = (value: string) => value.normalize("NFKC").toLocaleLowerCase("ka").trim();

export function findSearchResults(query: string) {
  const phrase = normalize(query);
  if (!phrase) return [];
  const words = phrase.split(/\s+/);
  const matches = searchResults.map(item => {
    const title = normalize(item.title);
    const description = normalize(item.description);
    if (!words.every(word => title.includes(word) || description.includes(word))) return null;
    const score = title.startsWith(phrase) ? 0 : title.includes(phrase) ? 1 : 2;
    return { item, score };
  }).filter((match): match is { item: SearchResult; score: number } => match !== null)
    .sort((a, b) => a.score - b.score || a.item.title.localeCompare(b.item.title, "ka"));
  const titleMatches = matches.filter(match => match.score < 2);
  return (titleMatches.length ? titleMatches : matches).slice(0, 6).map(match => match.item);
}

import Link from "next/link";
import { SiteHeader } from "@/components/homepage-prototype/site-header";
import { labelText } from "@/components/homepage-prototype/label-text";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import styles from "@/components/learning-flow/learning-flow.module.css";

export const metadata = { title: "სცენარის და ქვიზის დიზაინის ტესტი · 10–13" };
const activities = [
  { href: "quiz", title: "როგორ იწყება დახმარება?", description: "სტანდარტული კითხვით · 1 კითხვა" },
  { href: "long-quiz", title: "ემოციები და მხარდაჭერა", description: "გრძელი კითხვებით და პასუხებით · 2 კითხვა" },
  { href: "scenario", title: "გიორგის სანდო პედაგოგი", description: "მრავალნაბიჯიანი ამბით · 2 ნაბიჯი" },
];
export default function Page() {
  return <div className={styles.page}><SiteHeader activeItem="learning" /><main className={styles.index}>
    <Badge>{labelText("10–13 წელი")}</Badge>
    <h1 style={{ marginTop: "var(--space-6)" }}>დიზაინის ტესტი: სცენარი და ქვიზი</h1>
    <p className={styles.indexIntro}>ეს გვერდი გუნდს სამი ნიმუშის შემოწმებაში ეხმარება: ჩვეულებრივი ქვიზი, გრძელი შინაარსი და ორნაბიჯიანი სცენარი. თითოეულის დასრულებისას ნახავთ რეკომენდაციას და პასუხების მიმოხილვას.</p>
    <div className={styles.activityList}>{activities.map(activity => <section className={styles.activityCard} key={activity.href}>
      <h2>{activity.title}</h2><p>{activity.description}</p><Button asChild><Link href={`/prototypes/learning/practice/${activity.href}`}>{labelText("დაწყება")}<Icon name="chevronsRight" /></Link></Button>
    </section>)}</div>
  </main></div>;
}

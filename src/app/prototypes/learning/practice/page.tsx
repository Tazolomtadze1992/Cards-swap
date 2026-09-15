import Link from "next/link";
import { SiteHeader } from "@/components/homepage-prototype/site-header";
import { labelText } from "@/components/homepage-prototype/label-text";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import styles from "@/components/learning-flow/learning-flow.module.css";

export const metadata = { title: "სცენარი და ქვიზი · 10–13" };
const activities = [
  { href: "quiz", title: "როგორ იწყება დახმარება?", description: "ქვიზი · 1 კითხვა" },
  { href: "long-quiz", title: "ემოციები და მხარდაჭერა", description: "ქვიზი · 2 კითხვა" },
  { href: "scenario", title: "გიორგის სანდო პედაგოგი", description: "სცენარი · 2 ნაბიჯი" },
];
export default function Page() {
  return <div className={styles.page}><SiteHeader activeItem="learning" /><main className={styles.index}>
    <Badge>{labelText("10–13 წელი")}</Badge>
    <h1 style={{ marginTop: "var(--space-6)" }}>სცენარი და ქვიზი</h1>
    <p className={styles.indexIntro}>აირჩიე სავარჯიშო. დაფიქრდი შენს არჩევანზე და ბოლოს ნახე რეკომენდაცია და პასუხების განმარტებები.</p>
    <div className={styles.activityList}>{activities.map(activity => <section className={styles.activityCard} key={activity.href}>
      <h2>{activity.title}</h2><p>{activity.description}</p><Button asChild><Link href={`/prototypes/learning/practice/${activity.href}`}>{labelText("დაწყება")}<Icon name="chevronsRight" /></Link></Button>
    </section>)}</div>
  </main></div>;
}

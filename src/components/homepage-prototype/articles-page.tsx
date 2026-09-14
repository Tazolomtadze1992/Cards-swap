"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronsRight } from "lucide-react";
import { SiteHeader } from "./site-header";
import { ResourceCard } from "./resource-card";
import { resources } from "./resources-data";
import { labelText } from "./label-text";
import styles from "./articles.module.css";

const recommendedResources = [resources[0], resources[1], resources[3], resources[2], resources[6]];

type ArticlesPageProps = { recommendedCount: 2 | 3 | 5 };

export default function ArticlesPagePrototype({ recommendedCount }: ArticlesPageProps) {
  const router = useRouter();
  const recommendations = recommendedResources.slice(0, recommendedCount);

  return <main className={styles.page}>
    <SiteHeader />
    <article className={styles.article}>
      <div className={styles.titleRow}>
        <h1>სტატიის სათაური</h1>
        <a className={styles.skip} href="#recommended">{labelText("გამოტოვე სტატია")} <ChevronsRight size={24} aria-hidden="true" /></a>
      </div>
      <Image className={styles.heroImage} src="/assets/articles/article-hero.png" width={1936} height={1446} priority alt="აბსტრაქტული ილუსტრაცია სტატიაში" />
      <div className={styles.copy}>
        <p>ვებგვერდი იყენებს Lorem Ipsum-ს, როგორც დროებით ტექსტს წყობის შესავსებად; Lorem Ipsum-ის მოძებნისას კი საძიებო სისტემები ბევრ დაუსრულებელ გვერდს გვიჩვენებენ. წლების მანძილზე ამ ტექსტის უამრავი ვერსია გამოჩნდა, ზოგი შემთხვევით დაშვებული შეცდომის გამო, ზოგი კი — განზრახ, ხუმრობით.</p>
        <p>ვებგვერდი იყენებს Lorem Ipsum-ს, როგორც დროებით ტექსტს წყობის შესავსებად; Lorem Ipsum-ის მოძებნისას კი საძიებო სისტემები ბევრ დაუსრულებელ გვერდს გვიჩვენებენ. წლების მანძილზე ამ ტექსტის უამრავი ვერსია გამოჩნდა.</p>
      </div>
      <section className={styles.textSection}>
        <h2>ჰედერი</h2>
        <p>ვებგვერდი იყენებს Lorem Ipsum-ს, როგორც დროებით ტექსტს წყობის შესავსებად; Lorem Ipsum-ის მოძებნისას კი საძიებო სისტემები ბევრ დაუსრულებელ გვერდს გვიჩვენებენ. წლების მანძილზე ამ ტექსტის უამრავი ვერსია გამოჩნდა, ზოგი შემთხვევით დაშვებული შეცდომის გამო.</p>
      </section>
      <Image className={styles.sectionImage} src="/assets/articles/article-section.png" width={2940} height={1584} alt="აბსტრაქტული ილუსტრაცია სტატიაში" />
      <section className={styles.textSection}>
        <h2>ჰედერი</h2>
        <p>ბევრ დაუსრულებელ გვერდს გვიჩვენებენ. წლების მანძილზე ამ ტექსტის უამრავი ვერსია გამოჩნდა, ზოგი შემთხვევით დაშვებული შეცდომის გამო, ზოგი კი — განზრახ, ხუმრობით. ვებგვერდი იყენებს Lorem Ipsum-ს, როგორც დროებით ტექსტს წყობის შესავსებად; Lorem Ipsum-ის მოძებნისას კი საძიებო სისტემები ბევრ დაუსრულებელ გვერდს გვიჩვენებენ.</p>
        <p>წლების მანძილზე ამ ტექსტის უამრავი ვერსია გამოჩნდა, ზოგი შემთხვევით დაშვებული შეცდომის გამო, ზოგი კი — განზრახ, ხუმრობით. ვებგვერდი იყენებს Lorem Ipsum-ს, როგორც დროებით ტექსტს წყობის შესავსებად.</p>
      </section>
    </article>
    <section className={styles.recommended} id="recommended" aria-labelledby="recommended-heading">
      <h2 id="recommended-heading">რეკომენდირებული მასალა</h2>
      <div className={styles.recommendationGrid} data-count={recommendations.length}>
        {recommendations.map(item => <ResourceCard className={styles.recommendedCard} item={item} key={item.id} onOpen={() => router.push("/prototypes/resources")} />)}
      </div>
      <a className={styles.next} href="/prototypes/homepage#homepage-cards">{labelText("სცენარზე გადასვლა")} <ChevronsRight size={32} aria-hidden="true" /></a>
    </section>
  </main>;
}

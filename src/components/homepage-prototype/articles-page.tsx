"use client";

import { ReadingContent, ContentSection } from "../ui/reading-content";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Icon } from "../ui/icon";
import { SiteHeader } from "./site-header";
import { RecommendedMaterials } from "./recommended-materials";
import recommendationStyles from "./recommended-materials.module.css";
import { resources } from "./resources-data";
import { labelText } from "./label-text";
import styles from "./articles.module.css";

const recommendedResources = [resources[0], resources[1], resources[3], resources[2], resources[6]];

type ArticlesPageProps = { recommendedCount: 2 | 3 | 5; age?: string };

export default function ArticlesPagePrototype({ recommendedCount, age }: ArticlesPageProps) {
  const router = useRouter();
  const recommendations = recommendedResources.slice(0, recommendedCount);

  return <main className={styles.page}>
    <SiteHeader />
    <div className={styles.article}><ReadingContent>
      <div className={styles.titleRow}>
        <h1>სტატიის სათაური</h1>
        <Button asChild variant="subtle" size="compact"><a href="#recommended">{labelText("გამოტოვე სტატია")} <Icon name="chevronsRight" /></a></Button>
      </div>
      <Image className={styles.heroImage} src="/assets/articles/article-hero.png" width={1936} height={1446} priority alt="აბსტრაქტული ილუსტრაცია სტატიაში" />
      <ContentSection as="div">
        <p>ვებგვერდი იყენებს Lorem Ipsum-ს, როგორც დროებით ტექსტს წყობის შესავსებად; Lorem Ipsum-ის მოძებნისას კი საძიებო სისტემები ბევრ დაუსრულებელ გვერდს გვიჩვენებენ. წლების მანძილზე ამ ტექსტის უამრავი ვერსია გამოჩნდა, ზოგი შემთხვევით დაშვებული შეცდომის გამო, ზოგი კი — განზრახ, ხუმრობით.</p>
        <p>ვებგვერდი იყენებს Lorem Ipsum-ს, როგორც დროებით ტექსტს წყობის შესავსებად; Lorem Ipsum-ის მოძებნისას კი საძიებო სისტემები ბევრ დაუსრულებელ გვერდს გვიჩვენებენ. წლების მანძილზე ამ ტექსტის უამრავი ვერსია გამოჩნდა.</p>
      </ContentSection>
      <ContentSection>
        <h2>ჰედერი</h2>
        <p>ვებგვერდი იყენებს Lorem Ipsum-ს, როგორც დროებით ტექსტს წყობის შესავსებად; Lorem Ipsum-ის მოძებნისას კი საძიებო სისტემები ბევრ დაუსრულებელ გვერდს გვიჩვენებენ. წლების მანძილზე ამ ტექსტის უამრავი ვერსია გამოჩნდა, ზოგი შემთხვევით დაშვებული შეცდომის გამო.</p>
      </ContentSection>
      <Image className={styles.sectionImage} src="/assets/articles/article-section.png" width={2940} height={1584} alt="აბსტრაქტული ილუსტრაცია სტატიაში" />
      <ContentSection>
        <h2>ჰედერი</h2>
        <p>ბევრ დაუსრულებელ გვერდს გვიჩვენებენ. წლების მანძილზე ამ ტექსტის უამრავი ვერსია გამოჩნდა, ზოგი შემთხვევით დაშვებული შეცდომის გამო, ზოგი კი — განზრახ, ხუმრობით. ვებგვერდი იყენებს Lorem Ipsum-ს, როგორც დროებით ტექსტს წყობის შესავსებად; Lorem Ipsum-ის მოძებნისას კი საძიებო სისტემები ბევრ დაუსრულებელ გვერდს გვიჩვენებენ.</p>
        <p>წლების მანძილზე ამ ტექსტის უამრავი ვერსია გამოჩნდა, ზოგი შემთხვევით დაშვებული შეცდომის გამო, ზოგი კი — განზრახ, ხუმრობით. ვებგვერდი იყენებს Lorem Ipsum-ს, როგორც დროებით ტექსტს წყობის შესავსებად.</p>
      </ContentSection>
      <Separator />
    </ReadingContent></div>
    <section className={styles.recommended} id="recommended" aria-label="რეკომენდირებული მასალა">
      <RecommendedMaterials items={recommendations} onOpen={() => router.push("/prototypes/resources")} />
      <a className={recommendationStyles.next} href={`/prototypes/learning/practice/scenario${age === "6-9" ? "?age=6-9" : ""}`}>{labelText("სცენარზე გადასვლა")} <Icon name="chevronsRight" size="large" /></a>
    </section>
  </main>;
}

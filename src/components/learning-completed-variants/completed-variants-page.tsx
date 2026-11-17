"use client";

// Review page: how a finished topic reads when a child returns to სწავლა და პრაქტიკა.
// The client picked the dimmed card without a checkmark. Not wired to real progress yet —
// the completed topics here are fixtures.
import { Separator } from "../ui/separator";
import { SiteHeader } from "../homepage-prototype/site-header";
import { LearningCard } from "../homepage-prototype/learning-card";
import { learningTopics10to13 } from "../homepage-prototype/learning-data-10-13";
import { labelText } from "../homepage-prototype/label-text";
import page from "../homepage-prototype/learning.module.css";

const colors = ["#FFC800", "#58CC02", "#1CB0F6", "#00CD9C", "#CE82FF"];
const completed = new Set([0, 2, 5]);

export default function CompletedVariantsPage() {
  return <main className={page.page}>
    <SiteHeader activeItem="learning" />
    <section className={page.content}>
      <div className={page.intro}>
        <h1>აირჩიე თემა და დაიწყე</h1>
        <p>იმისთვის, რომ დაგიცვათ, ჩვენ არ ვინახავთ შენს მონაცემებს. ამიტომ როგორც კი სწავლის პროცესს შეწყვეტ, შენი მონაცემები წაიშლება</p>
      </div>
      <p className={page.count}>{labelText("ნაჩვენებია : ")}<strong>{labelText(`${learningTopics10to13.length} სტატია`)}</strong></p>
      <div className={page.divider}><Separator /></div>
      <div className={page.grid}>
        {learningTopics10to13.map((item, index) => <LearningCard key={item.id} item={item} color={colors[index % colors.length]}
          eager={index < 3} completed={completed.has(index)} />)}
      </div>
    </section>
  </main>;
}

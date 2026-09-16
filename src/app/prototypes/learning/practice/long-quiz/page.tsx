import LearningFlow from "@/components/learning-flow/learning-flow";
import { longQuiz } from "@/components/learning-flow/learning-content";
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ age?: string }> }) {
  return { title: longQuiz.title + ((await searchParams).age === "6-9" ? " · 6–9" : " · 10–13") };
}
export default async function Page({ searchParams }: { searchParams: Promise<{ age?: string }> }) {
  const { age } = await searchParams;
  return <LearningFlow activity={longQuiz} immediateFeedback={age === "6-9"} />;
}

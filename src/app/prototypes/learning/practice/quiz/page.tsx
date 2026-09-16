import LearningFlow from "@/components/learning-flow/learning-flow";
import { normalQuiz } from "@/components/learning-flow/learning-content";
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ age?: string }> }) {
  return { title: normalQuiz.title + ((await searchParams).age === "6-9" ? " · 6–9" : " · 10–13") };
}
export default async function Page({ searchParams }: { searchParams: Promise<{ age?: string }> }) {
  const { age } = await searchParams;
  return <LearningFlow activity={normalQuiz} immediateFeedback={age === "6-9"} />;
}

import LearningFlow from "@/components/learning-flow/learning-flow";
import { longQuiz } from "@/components/learning-flow/learning-content";
export const metadata = { title: longQuiz.title + " · 10–13" };
export default function Page() { return <LearningFlow activity={longQuiz} />; }

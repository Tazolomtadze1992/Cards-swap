import LearningFlow from "@/components/learning-flow/learning-flow";
import { normalQuiz } from "@/components/learning-flow/learning-content";
export const metadata = { title: normalQuiz.title + " · 10–13" };
export default function Page() { return <LearningFlow activity={normalQuiz} />; }

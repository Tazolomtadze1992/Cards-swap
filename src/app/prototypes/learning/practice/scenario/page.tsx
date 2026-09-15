import LearningFlow from "@/components/learning-flow/learning-flow";
import { longScenario } from "@/components/learning-flow/learning-content";
export const metadata = { title: longScenario.title + " · 10–13" };
export default function Page() { return <LearningFlow activity={longScenario} />; }

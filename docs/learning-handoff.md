# Learning handoff

Current implementation: 16 September 2026. Supersedes historical behavior descriptions in `learning-flow-first-slice.md`.

The library has 6–9, 10–13 and 14–18 presentations. The youngest group intentionally reuses the 10–13 card content pending illustrations and editorial content. Teen content is also a fixture. All topic cards currently lead to a sample article rather than topic-specific content.

`learning-content.ts` defines the scenario, short quiz and long quiz fixtures. `LearningFlow` owns answer/recommendation/review-index/review stages; `useQuestionnaire` owns selected answers and step index. `Questionnaire`, `LearningShell`, `LearningEnding` and shared UI components implement the common design. State is not persisted.

For `?age=6-9`, selecting an answer reveals the correct answer and explanation immediately, disables further choices for that question and enables Continue. Older flows allow a selection to change before Continue and show explanations in review. Skip leads to materials without a score. Completion leads to a score and materials; review can inspect every question and return to the result. The scenario links to the related quiz fixture.

Correct answers use the success tokens; answers needing review use `--color-review` and `--color-review-soft`, not danger red. Review overview tiles use the same neutral background, with `review-check.svg` and `review-x-cream.svg`. Keep the centered ring score, rounded arc ends, explicit zero-score handling, focus movement between steps and native radio semantics.

Both the activity layout switcher and library card picker are removed. The learning library uses the framed card design. Final files, video playback, per-topic recommendations and age-specific learning sequences must be connected during integration. See the [central handoff](developer-handoff.md) for ownership and launch requirements.

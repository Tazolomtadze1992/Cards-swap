# Learning flow · first slice · 10–13

Review-only entry: `/prototypes/learning/practice`. It is not linked from the child-facing learning library. The production child journey should enter a specific Scenario or Quiz from the relevant learning package.

The activity routes now offer two reviewer-selectable layouts: `ღია` (the original open reading surface) and `ჩარჩოში` (the same flow inside a bordered surface). The choice stays in component memory while moving through questions and reviews, so reviewers can switch without losing their selected answers. The variant control is for design review, not part of the intended child journey.

## Source and scope

Source: `Child_Safety_Digital_Hub_Learning_Content_Package_draft.docx`, age 10–13 section.

| Route suffix | Source | Coverage |
| --- | --- | --- |
| `/quiz` | SW-QUIZ-07, question 1 | Normal question, three answers |
| `/long-quiz` | PSY-1013-QUIZ-04, questions 1–2 | Long question; paragraph-length answer; long final recommendation |
| `/scenario` | SW-SCN-07, Giorgi’s trusted teacher | Two story beats with separate decisions |

Questions, answers, stories and final recommendations use the supplied draft. Obvious typos and split words were repaired. Per-question explanations condense the relevant source recommendation. No fabricated questions or mixed-age content. The long example is a real stress fixture, not a claim that every possible CMS length has been tested.

## Behavior

Shared LearningShell, AnswerCards and feedback presentation. Native radio groups allow arrow-key selection. Continue requires an answer; the next item starts unselected. Completion shows an encouraging result, a score ring, the source safety message, and the existing article-style video/document cards. Skipping shows materials and the safety message without a score or personal answer assessment. Following the updated review brief, correct answers remain available after skipping.

The numbered review overview opens individual questions with correct answers and explanations. Completed activities also identify the child's selections. Review returns to the ending. The scenario proceeds to the related normal quiz (SW-SCN-07 → SW-QUIZ-07); quizzes return to the learning page. The article prototype now proceeds to the scenario fixture. The close control returns to learning.

Material cards currently reuse the article/catalogue's sample video and document. They are visual fixtures, not an editorial recommendation for this topic. Native modal previews explicitly indicate that final video/files are pending, and preserve the result state on close. Real CMS associations and media remain outside this slice.

Answer state is in component memory and resets on reload or leaving the activity. No CMS, analytics, persistence, branching engine, or complete learning-package orchestration is included.

## Design system and Better UI check

| Before | After |
| --- | --- |
| Learning library had no practice entry | Existing Button links to three focused examples |
| No implemented Scenario/Quiz surface | Shared header, reading-width shell, Icon, Separator and Button |
| Open reading surface only | Added a contained variant with existing surface, border and radius tokens; retained the open version |
| Practice shell started 40px below the header | Reviewer pills sit under the logo; content uses the 120px desktop / 64px mobile offset and 64px bottom clearance |
| Redundant age/type labels, activity title, answer hint and repeated help prompt | Question, answers and progress remain in the learning surface; existing site navigation provides support access |
| No answer controls | Full-width native radio cards, existing surface/spacing/radius tokens, whole-card targets and focus rings |
| No semantic success role | Success aliases reuse existing green primitives; incorrect states reuse danger tokens |
| No long-content layout | Natural document height, wrapping text, no clamping or nested scrolling; stacked mobile actions preserve DOM order |
| No flow feedback | Recommendation first, then supportive review with icons and text; primary action keeps its standard appearance |
| No step focus handling | Focus moves to the new heading; scrolling includes the preceding story; no initial auto-scroll |

Body and question typography use FiraGO and existing body/H3 roles for long Georgian text. Recommendation and entry headings use the established display family. No new font, palette, animation, or button treatment. Existing prototype typography controls remain available.

## Validation

- Production build, TypeScript, scoped ESLint and both existing label-text tests passed.
- Browser: native arrow-key selection; disabled unanswered CTA; incorrect-answer review; correct scenario review; selected answers retained between story steps and review; recommendation before review; skip suppresses score and personal grading while allowing correct-answer review.
- Visual: desktop normal/review states; long questions at 320px; scenario story/answers at 375px. No horizontal overflow in the measured mobile viewports.
- Shared design tuner must be collapsed during small-screen inspection to avoid its existing overlay covering the preview.

## Design-system alignment · 15 September

| Before | After |
| --- | --- |
| Progress ran directly into question content | Shared Separator below the topbar; 32px desktop / 24px mobile on both sides of top and CTA dividers |
| Independent question, story and footer spacing | Local flow spacing roles use the existing scale; answer rows use 16px gaps and established surface insets |
| Narrow ending cards and smaller safety copy | Shared RecommendedMaterials component with the article's 906px two-card layout, heading/grid spacing, responsive stacking and onward CTA; safety copy uses body typography |
| Review footer had a full-width desktop button and unbalanced gap | Divider and centered existing Button with the same footer spacing; explicit focus and hover for numbered choices |
| Extra bottom padding accumulated inside/outside shell | 32px desktop / 24px mobile internal footer clearance, plus the existing 64px page-bottom clearance |
| Preview depended on browser-default heading margins | Existing dialog width, surface, shadow, H3 and text-spacing tokens |
| Step changes scrolled past progress | Focus stays on the heading; scrolling includes the shell topbar, dividers and story |

TypeScript, scoped ESLint and diff whitespace checks pass. Browser verification for this alignment pass was blocked by the in-app tab timing out and a fresh tab closing during initialization; earlier flow behavior checks are listed above, not evidence of this latest visual layout.

## Unified section spacing

The follow-up spacing review replaces mixed 32/64/120px content boundaries with one existing token: `--flow-section-gap: var(--space-13)` (120px). It applies from the top divider to question/result/review content, from that content to the next divider, from the result divider to recommendations, from the recommendation heading to cards, and from cards to ending actions. It remains consistent on mobile. Compact controls, text groups and card interiors keep their existing internal spacing; article pages retain their established responsive layout.

Browser verification recovered for the unified-spacing follow-up: measured 120px above and below scenario content, above/below the result content, from result divider to materials, and above/below review content. Review screenshot confirmed the equal gaps. TypeScript and scoped ESLint passed.

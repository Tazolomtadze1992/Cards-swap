# Learning flow · first slice · 10–13

Entry: `/prototypes/learning/practice`, also linked from the 10–13 learning library.

## Source and scope

Source: `Child_Safety_Digital_Hub_Learning_Content_Package_draft.docx`, age 10–13 section.

| Route suffix | Source | Coverage |
| --- | --- | --- |
| `/quiz` | SW-QUIZ-07, question 1 | Normal question, three answers |
| `/long-quiz` | PSY-1013-QUIZ-04, questions 1–2 | Long question; paragraph-length answer; long final recommendation |
| `/scenario` | SW-SCN-07, Giorgi’s trusted teacher | Two story beats with separate decisions |

Questions, answers, stories and final recommendations use the supplied draft. Obvious typos and split words were repaired. Per-question explanations condense the relevant source recommendation. No fabricated questions or mixed-age content. The long example is a real stress fixture, not a claim that every possible CMS length has been tested.

## Behavior

Shared LearningShell, AnswerCards and feedback presentation. Native radio groups allow arrow-key selection. Continue requires an answer; the next item starts unselected. For both activity types, completion shows the safety recommendation before the optional answer review. Review locks choices, identifies the child's selection and correct answer using text and icons, and supports previous/next. Skip goes straight to the recommendation without scores or review, including mid-activity skips. Help links use the existing FAQ page; a dedicated support-service destination is outside this slice.

Answer state is in component memory and resets on reload or leaving the activity. No CMS, analytics, persistence, branching engine, or complete learning-package orchestration is included.

## Design system and Better UI check

| Before | After |
| --- | --- |
| Learning library had no practice entry | Existing Button links to three focused examples |
| No implemented Scenario/Quiz surface | Shared header, reading-width shell, Badge, Icon, Separator and Button |
| No answer controls | Full-width native radio cards, existing surface/spacing/radius tokens, whole-card targets and focus rings |
| No semantic success role | Success aliases reuse existing green primitives; incorrect states reuse danger tokens |
| No long-content layout | Natural document height, wrapping text, no clamping or nested scrolling; stacked mobile actions preserve DOM order |
| No flow feedback | Recommendation first, then supportive review with icons and text; primary action keeps its standard appearance |
| No step focus handling | Focus moves to the new heading; scrolling includes the preceding story; no initial auto-scroll |

Body and question typography use FiraGO and existing body/H3 roles for long Georgian text. Recommendation and entry headings use the established display family. No new font, palette, animation, or button treatment. Existing prototype typography controls remain available.

## Validation

- Production build, TypeScript, scoped ESLint and both existing label-text tests passed.
- Browser: native arrow-key selection; disabled unanswered CTA; incorrect-answer review; correct scenario review; selected answers retained between story steps and review; recommendation before review; mid-quiz skip suppresses review.
- Visual: desktop normal/review states; long questions at 320px; scenario story/answers at 375px. No horizontal overflow in the measured mobile viewports.
- Shared design tuner must be collapsed during small-screen inspection to avoid its existing overlay covering the preview.

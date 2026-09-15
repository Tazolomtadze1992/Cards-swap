# Badge

Shared ui/Badge adapts shadcn Badge's noninteractive span, with a single appearance based on the resource-card age badge. Both age and video duration now use its dark 10% overlay, existing pill radius, 4px/12px padding, ink color and label typography tokens. Removed the light video variant and ResourceBadge wrapper. No usage-level styling overrides or new interactions are exposed. Labels retain the Georgian typography transformation; missing duration renders no empty badge.

The shared ResourceCard propagates this change to catalogue and recommendation contexts. Browser checks at 1280px and 390px verified all 27 catalogue badges share the same age styling and labels fit. TypeScript, lint and whitespace checks passed.

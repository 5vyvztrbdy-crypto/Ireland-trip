# Decision Register

## Confirmed source

The canonical Project Brief, Version 1.0, Blocks 1 and 2, is the initial confirmed decision set. It establishes product identity, founding principles, Journey Perspective, the Reservation Engine, Story System, Storied Album, Living Album, business direction, Joyce Journey, delivery persistence, and Sprint Reviews.

## Recording future decisions

Each consequential decision should record:

- date and decision owner;
- status: proposed, confirmed, superseded, or rejected;
- context and options considered;
- decision and consequences;
- affected requirements, architecture, tests, and rollout;
- superseding decision, if any.

Architecture decisions belong in `docs/07-architecture/architecture-decisions/`. Product and business decisions can be added here or in narrowly scoped records. No decision is implied merely because a prototype implements it.

## Product decisions

### 2026-08-08 — Exploration controls for Sprint 2

- **Owner:** Product
- **Status:** Confirmed
- **Context:** The prototype's random “Surprise Me” interaction does not express the intended route-aware, time-aware exploration experience. Exploration also needs a clear relationship to Journey Perspective, the Opportunity Meter, reservations, and the story system.
- **Decision:** Retire “Surprise” as the primary exploration concept. Sprint 2 should use an exploration action provisionally described as “Explore Nearby” or “What's Nearby?”; final traveler-facing wording remains to be selected. This is more than a conventional Near Me search. Recommendations should eventually consider current location, next destination, route, protected reservation anchors, available time, traveler preferences, reasonable detour, and Journey Perspective / Opportunity Meter context.
- **Unexpected Joy:** “Unexpected Joy” is not the exploration button. It describes a worthwhile discovery that the traveler chooses to preserve after experiencing it. A preserved Unexpected Joy can become a Story Moment, a Campfire memory, media or story material, and potential Storied Album content.
- **Slowing down:** Preserve the Pause concept while evaluating “Take Your Time” as potentially better traveler-facing language. It means the traveler intentionally wants to slow down, and Storied Journey should reconsider the flexible parts of the day's plan without making the traveler feel late or behind.
- **Placement:** Exploration belongs primarily in Today / Journey Perspective. Reservations remain focused on trusted journey anchors; Explore Nearby and Pause / Take Your Time should not be prominently placed on the Reservations screen.
- **Consequences:** Sprint 2 planning must separate the exploration action, the intentional-slowdown action, and the post-experience act of preserving an Unexpected Joy. Recommendation logic and final interface wording remain follow-on design work. Production UI changes are explicitly out of scope for this decision-recording update.
- **Affected documentation:** `docs/02-journey/opportunity-meter-and-unexpected-joys.md`, `docs/02-journey/journey-perspective.md`, `docs/02-journey/reservation-engine.md`, and `docs/09-delivery/roadmap.md`.

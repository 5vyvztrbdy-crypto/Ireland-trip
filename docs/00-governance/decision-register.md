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

### 2026-08-08 — Journey Perspective entry point for Sprint 2

- **Owner:** Product
- **Status:** Confirmed
- **Context:** Entering the current day's travel experience needs to establish geographic and schedule orientation. Opening another itinerary list or the Reservations screen would not express the intended role of Journey Perspective.
- **Decision:** “Start Today’s Adventure” is the primary action that launches Journey Perspective and represents the transition from planning mode into active travel mode. Journey Perspective is the main current-day, in-journey experience and should be map-led, establishing orientation before dense chronology or text.
- **Traveler understanding:** The experience should immediately communicate where the traveler is in today's journey, where they are going next, which stops are protected reservation anchors, which are flexible or optional, how the route fits together geographically, and what opportunities exist around the route and schedule.
- **Reservation relationship:** Reservations remain the trusted source of fixed anchors. Journey Perspective consumes those anchors and explains how the day fits around them; it is not a replacement source of reservation truth.
- **Capability home:** Journey Perspective should eventually be the natural home for Explore Nearby / What's Nearby?, Take Your Time / Pause, Opportunity Meter context, Unexpected Joy recommendations, the next protected reservation, and route-aware timing and detour context.
- **Open decisions:** Exact visual design, layout, map provider, zoom behavior, and interaction model remain **TBD**.
- **Consequences:** Sprint 2 planning should treat the entry action, map-led orientation, anchor consumption, and current-day capability grouping as one coherent active-travel experience. Production UI changes are explicitly out of scope for this decision-recording update.
- **Affected documentation:** `docs/02-journey/journey-perspective.md`, `docs/09-delivery/roadmap.md`, and `docs/01-product/product-requirements.md`.

### 2026-08-08 — Daily story architecture and reusable publishing sources

- **Owner:** Product
- **Status:** Confirmed, with explicitly exploratory extensions
- **Context:** Journey Perspective, travel memories, and publishing outputs need a shared story architecture so the in-trip experience can flow naturally into a Storied Album without making an Album page the owner of the underlying memory.
- **Confirmed direction:** Each Storied Album day should eventually open with a Journey Perspective page or spread establishing the date, geography, route, destinations, significant stops, relevant protected anchors, and overall shape of the day. Following pages should use a **Perspective → Place → People → Memory** storytelling rhythm.
- **Journey texture:** The daily opening is a natural place for secondary scenery and travel-context photographs that establish the feeling and geography of moving through the destination without requiring dedicated story pages.
- **People principle:** Photo selection and composition should intentionally preserve travelers and other meaningful people: “The scenery shows where we traveled. The people show why we remember it.”
- **Media connection:** Important stops may combine photographs, people, Story Moments, Campfire reflections, captions, reviews or experiences, video, audio, and other meaningful media. Living Album markers may connect a printed photograph or Story Moment to the exact associated digital memory.
- **Architecture:** Journey Perspective should produce a reusable daily representation for the in-trip experience, physical and digital Storied Albums, and other publishing products. The journey/story model owns durable memories; Albums and other outputs are presentations composed from reusable journey, day, place, people, Story Moment, memory, media, and Journey Perspective objects.
- **Exploratory, not committed:** A souvenir calendar may reuse the same source model as a future publishing product. It is not a committed product or Sprint 2 requirement.
- **Open decisions:** Exact printed page layouts and visual treatment remain **TBD**.
- **Consequences:** Future story, selection, composition, and domain architecture should preserve publishing-format independence and source provenance. This decision does not authorize application implementation.
- **Affected documentation:** `docs/02-journey/journey-perspective.md`, `docs/03-story/story-engine.md`, `docs/04-album/storied-album-vision.md`, `docs/04-album/album-composition-model.md`, `docs/04-album/living-album.md`, `docs/07-architecture/domain-model.md`, `docs/09-delivery/roadmap.md`, and `docs/00-governance/open-questions.md`.

### 2026-08-08 — Prepare Your Story pre-departure guidance

- **Owner:** Product
- **Status:** Confirmed direction; naming and implementation details remain open
- **Context:** Travelers benefit from preparation that supports both a better journey and better memories, but a broad destination-guide product would dilute Storied Journey's purpose and risk overwhelming them.
- **Decision:** Add a concise pre-departure experience, working name “Prepare Your Story,” that helps travelers prepare for the trip and intentionally preserve meaningful story material. The final customer-facing name remains **TBD**.
- **Product boundary:** Include guidance only when knowing it before departure can meaningfully improve the journey, prevent a problem, or help preserve the story. Do not become a Frommer's/Lonely Planet-style destination encyclopedia.
- **Story preparation:** Encourage intentional photographs of people and travelers, candid interaction, meaningful stops, transitions and small details, plus short personal video and natural sound. Encourage Story Moments and Campfire when something genuinely matters. The goal is better media, not more media.
- **People principle:** Reinforce “The scenery shows where we traveled. The people show why we remember it.”
- **Journey-specific guidance:** When relevant, provide selective practical preparation and concise cultural or etiquette guidance. The tone should be practical and respectful: be a traveler participating in the place, not an observer collecting people and locations.
- **Personalization:** Near departure, a short Story Prep may suggest five to seven worthwhile captures using itinerary, reservation, destination, prompt, visual-opportunity, people, or heritage context. Exact recommendation logic remains **TBD**.
- **Media and publishing:** Treat short personal video as durable memory that can later connect to Living Album pages. Position improved Album source material as a consequence of helping the traveler experience and remember the trip, never as an upsell to take more photos or buy a book.
- **Open decisions:** Final name, visual interface, timing, recommendation engine, and whether the experience is a page, checklist, cards, or progressive onboarding remain **TBD**.
- **Consequences:** Future lifecycle, Story Engine, prompt, readiness-content, and publishing planning should include this capability. This decision does not authorize production UI implementation.
- **Affected documentation:** `docs/01-product/experience-lifecycle.md`, `docs/01-product/product-requirements.md`, `docs/03-story/prompts-and-intentional-capture.md`, `docs/03-story/story-engine.md`, `docs/04-album/storied-album-vision.md`, `docs/09-delivery/roadmap.md`, and `docs/00-governance/open-questions.md`.

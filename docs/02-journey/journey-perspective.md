# Journey Perspective

## Confirmed

Maps are not merely navigation. Journey Perspective helps travelers understand geographic and time relationships among destinations and feel grounded in an unfamiliar country.

“Start Today’s Adventure” is the primary entry point to Journey Perspective. It represents the transition from planning mode into active travel mode, and Journey Perspective is the main in-journey experience for the current day. The action should not merely open another itinerary list or the Reservations screen.

Journey Perspective should be map-led. The map should establish orientation before dense chronology or text so the traveler can immediately understand:

- where they are in today's journey;
- where they are going next;
- which stops are protected reservation anchors;
- which stops are flexible or optional;
- how the route fits together geographically;
- what opportunities exist around the route and schedule.

It should:

- make route outliers obvious when itinerary text does not;
- evaluate reservation times and changes using before/after and geographic relationships;
- show how places relate to the natural A-to-B journey;
- complement Google Maps or other navigation with higher-level journey understanding;
- support explainable opportunities near the route.

Today / Journey Perspective is the primary home for exploration and intentional-slowdown controls. The exploration action, with final wording still **TBD**, should use journey context rather than behave as a conventional Near Me search. Pause / Take Your Time should trigger reconsideration of flexible plans while protecting trusted reservation anchors and using positive framing.

Journey Perspective should eventually be the natural home for Explore Nearby / What's Nearby?, Take Your Time / Pause, Opportunity Meter context, Unexpected Joy recommendations, the next protected reservation, and route-aware timing and detour context.

Reservations remain the trusted source of fixed anchors. Journey Perspective consumes those anchors and shows how the day's route, flexible stops, schedule, and opportunities fit around them.

## Current implementation

The prototype offers hard-coded daily stop lists and Google Maps search links. It does not render an integrated journey map or compute route, time, or change relationships.

## Planned architecture

A Journey Perspective service would consume canonical destinations, events, reservations, route segments, travel constraints, and confirmed timing. Its outputs would be projections rather than separate itinerary facts.

Journey Perspective should eventually generate a reusable representation of each day's travel rather than exist only as a transient in-trip screen. That representation should capture the date, geography, route traveled, important destinations, significant stops, protected anchors where appropriate, and the overall shape of the day. It can then support the in-trip experience, physical Storied Album daily openings, digital Storied Albums, and other publishing products.

For publishing, the daily Journey Perspective is the opening context before the story moves closer through **Perspective → Place → People → Memory**. It can incorporate secondary scenery and travel-context photographs that convey the texture of moving through the destination without requiring each image to become a dedicated story page.

The exact visual design, layout, map provider, zoom behavior, interaction model, algorithms, and offline map behavior are **TBD**.

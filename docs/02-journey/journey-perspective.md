# Journey Perspective

## Confirmed

Maps are not merely navigation. Journey Perspective helps travelers understand geographic and time relationships among destinations and feel grounded in an unfamiliar country.

It should:

- make route outliers obvious when itinerary text does not;
- evaluate reservation times and changes using before/after and geographic relationships;
- show how places relate to the natural A-to-B journey;
- complement Google Maps or other navigation with higher-level journey understanding;
- support explainable opportunities near the route.

## Current implementation

The prototype offers hard-coded daily stop lists and Google Maps search links. It does not render an integrated journey map or compute route, time, or change relationships.

## Planned architecture

A Journey Perspective service would consume canonical destinations, events, reservations, route segments, travel constraints, and confirmed timing. Its outputs would be projections rather than separate itinerary facts.

Provider choice, algorithms, offline map behavior, and interface design are **TBD**.

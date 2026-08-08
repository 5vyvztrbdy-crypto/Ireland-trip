# Domain Model

## Planned architecture

Candidate canonical entities are Traveler, Journey, Destination, Route Segment, Itinerary Event, Reservation, Reservation Source, Media Asset, Story Moment, Campfire Entry, Story Prompt, Unexpected Joy, Review, Album, Album Edition, Album Placement, and Living Media Link.

Important proposed relationships:

- a Journey contains ordered events and route relationships;
- a Reservation is supported by sources and projects into multiple experiences;
- Story Moments connect journey context, media, and reflection;
- Albums reference sources without taking ownership away from travelers;
- Living Media Links bind a specific Album placement to specific media.

Fields, identity rules, multi-traveler ownership, versioning, and deletion semantics are **TBD**. This candidate model does not itself approve those decisions.

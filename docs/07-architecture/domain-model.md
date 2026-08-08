# Domain Model

## Planned architecture

Candidate canonical entities are Traveler, Journey, Journey Day, Place or Destination, Person, Route Segment, Itinerary Event, Reservation, Reservation Source, Media Asset, Memory, Story Moment, Campfire Entry, Story Prompt, Unexpected Joy, Review, Journey Perspective, Album, Album Edition, Album Placement, and Living Media Link.

Important proposed relationships:

- a Journey contains ordered events and route relationships;
- a Reservation is supported by sources and projects into multiple experiences;
- Story Moments connect journey context, media, and reflection;
- a reusable daily Journey Perspective represents the day's geography, route, destinations, significant stops, and relevant protected anchors for both travel and publishing experiences;
- the journey/story model owns memories and media relationships;
- Albums and other publishing products compose canonical sources without owning or mutating them;
- Living Media Links bind a specific Album placement to specific media.

The model must not make Album pages the canonical container for memories. Physical Albums, digital Albums, an exploratory souvenir calendar, and potential future products are presentation models over durable journey/story sources. Their compositions may arrange the same journey, day, place, people, Story Moment, memory, media, and Journey Perspective objects differently.

Fields, identity rules, multi-traveler ownership, versioning, and deletion semantics are **TBD**. This candidate model does not itself approve those decisions.

# Album Composition Model

## Planned architecture

The internal Album representation should remain independent of a specific publisher so multiple partners can be supported. A proposed model would describe editions, pages, layouts, text, maps, media references, Story Moment references, print assets, and Living Album markers.

Publisher adapters would transform an approved composition into partner-specific manufacturing inputs without making the partner format the canonical Album.

Composition should support a daily Journey Perspective opening followed by a **Perspective → Place → People → Memory** narrative rhythm. Important stops may combine photographs, people, Story Moments, Campfire reflections, captions, reviews or experiences, short videos, audio, and other meaningful media.

Album composition and photo-selection logic should intentionally preserve photographs of travelers and other meaningful people while using secondary scenery and travel-context images as texture around the day's route.

Publishing compositions must reference durable journey/story source objects rather than own them. This boundary allows the same sources and a reusable daily Journey Perspective to support physical Albums, digital Albums, and potential future publishing formats.

## Confirmed constraints

- Preserve traveler edits and authorship.
- Resolve content to canonical source records.
- Support digital, standard physical, and premium physical outcomes.
- Allow exact page-to-media Living Album associations.
- Preserve source-object identity independently of page layout or publishing format.

Exact daily page layouts and visual treatment, schema, renderer, interchange format, and partner APIs are **TBD**.

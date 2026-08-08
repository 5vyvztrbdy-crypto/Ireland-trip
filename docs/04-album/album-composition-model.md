# Album Composition Model

## Planned architecture

The internal Album representation should remain independent of a specific publisher so multiple partners can be supported. A proposed model would describe editions, pages, layouts, text, maps, media references, Story Moment references, print assets, and Living Album markers.

Publisher adapters would transform an approved composition into partner-specific manufacturing inputs without making the partner format the canonical Album.

## Confirmed constraints

- Preserve traveler edits and authorship.
- Resolve content to canonical source records.
- Support digital, standard physical, and premium physical outcomes.
- Allow exact page-to-media Living Album associations.

Schema, renderer, interchange format, and partner APIs are **TBD**.

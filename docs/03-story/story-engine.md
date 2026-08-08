# Story Engine

## Confirmed

The Story Engine connects the lived journey to the eventual Storied Album. It brings together Story Moments, Campfire reflections, prompts, reviews, media, GPS/travel context, reservations, and Unexpected Joys.

It should help organize and draft without replacing the traveler’s memories or voice. AI-created text must remain editable and cannot present invented trip facts as truth.

The journey/story model owns durable memories; no publishing product owns them. Reusable source objects such as journey, day, place, people, Story Moment, memory, media, and Journey Perspective should remain independent of any Album page or other output format.

People are a deliberate part of the story model and future selection logic. The system should preserve photographs containing travelers and other meaningful people, not optimize only for attractive scenery: “The scenery shows where we traveled. The people show why we remember it.”

The Story Engine should support concise pre-departure preparation that improves intentional capture without encouraging indiscriminate documentation. Future personalized Story Prep may draw from itinerary context, reservations, destinations, Story Prompts, visual opportunities, and meaningful people or heritage context. Guidance should help travelers preserve useful photographs, short personal video, natural sound, candid interaction, transitions, and small details while keeping the journey itself primary.

## Current implementation

The prototype records ratings, short memories, a favorite moment, an unexpected-joy flag, and a selected-photo count in browser storage. It does not retain media or build an integrated story.

## Planned architecture

Story records would reference canonical journey events, people, memories, and media without mutating their sources. Provenance should distinguish traveler words, source facts, and AI drafts. Exact AI and data architecture is **TBD**.

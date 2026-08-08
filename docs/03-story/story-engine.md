# Story Engine

## Confirmed

The Story Engine connects the lived journey to the eventual Storied Album. It brings together Story Moments, Campfire reflections, prompts, reviews, media, GPS/travel context, reservations, and Unexpected Joys.

It should help organize and draft without replacing the traveler’s memories or voice. AI-created text must remain editable and cannot present invented trip facts as truth.

## Current implementation

The prototype records ratings, short memories, a favorite moment, an unexpected-joy flag, and a selected-photo count in browser storage. It does not retain media or build an integrated story.

## Planned architecture

Story records would reference canonical journey events and media without mutating their sources. Provenance should distinguish traveler words, source facts, and AI drafts. Exact AI and data architecture is **TBD**.

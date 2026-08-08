# Public and Private Journey Data Boundary

## Sprint 1 decision

The GitHub repository and GitHub Pages deployment are public systems. They may contain only the public journey projection. Booking references, confirmation numbers, itinerary numbers, reservation source files, sensitive notes, identity details, and payment details must never be committed or deployed.

`data/joyce-journey.json` is the canonical public Joyce Journey dataset. Its reservation records contain safe itinerary facts such as provider or experience title, date, time, public location, route relationship, anchor status, confirmation status, and non-sensitive notes.

`data/private-reservation.schema.json` defines a future local-only extension without containing private values. A private record relates to its public reservation by stable reservation ID, but the public record does not point back to private storage or disclose whether private source material exists.

## Local-only handling

Sprint 1 creates no private data file. The prototype’s private-notes field remains browser `localStorage` data entered by the traveler. It is not seeded from the repository, fetched by the application, or included in the canonical journey export.

If file-based local storage is introduced later, instances must be kept under an ignored path such as `data/private/` and must pass a pre-deployment privacy review. Ignoring a file is a guardrail, not a security boundary or backup strategy.

## Projection rules

- Public journey views read only the canonical public dataset.
- Canonical reservation records drive fixed and protected anchors shown in itinerary projections.
- Private values must not appear in HTML, JavaScript, public JSON, comments, logs, tests, fixtures, documentation examples, or source maps.
- Confirmation status may be public; confirmation evidence and identifiers are private.
- Traveler-verified public facts override obsolete prototype evidence.
- Future private persistence, encryption, export, deletion, and multi-device synchronization require a separate architecture decision.

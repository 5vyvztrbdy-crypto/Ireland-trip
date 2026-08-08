# Reservation Engine

## Confirmed

Reservations are trusted journey anchors. A single canonical reservation record drives the timeline, reservation views, map, navigation, and later story and Album context.

Required ingestion paths:

- screenshots and images;
- PDFs and other documents;
- manual entry as fallback;
- email import or forwarding in the future.

AI/OCR may perform one-time structured extraction. Travel-critical fields require traveler confirmation before they become authoritative. The original source should be retainable and viewable. Corrections must update downstream projections rather than create independent copies.

## Current implementation

Reservations are hard-coded separately from itinerary stops. There is no source document, extraction, confirmation state, provenance, or canonical shared record.

## Planned architecture

The proposed pipeline is source capture → immutable source retention → one-time extraction → structured draft → field-level review → traveler confirmation → canonical reservation → downstream projections. Provider and storage choices are **TBD**.

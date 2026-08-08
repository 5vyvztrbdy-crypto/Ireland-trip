# Offline Travel Experience

## Confirmed

Core itinerary, reservations, memory capture, and essential trip information must remain useful without signal.

## Current implementation

Some notes and journal text persist in browser `localStorage`, but the application shell, maps, reservation sources, media, and broader journey data have no documented offline guarantee or synchronization behavior.

## Planned architecture

- Cache the application shell and sample Album.
- Maintain a local canonical journey projection for active travel.
- Queue offline captures and edits safely.
- expose synchronization and conflict state rather than silently discarding edits;
- make required reservation sources available for offline viewing where permitted.

Local database, cache limits, sync protocol, conflict rules, and offline map scope are **TBD**.

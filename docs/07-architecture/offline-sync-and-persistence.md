# Offline Sync and Persistence

## Confirmed constraints

Active itinerary, reservations, memory capture, and essential information remain useful offline. Source ownership and important edits must be protected.

## Planned architecture

A local-first active-journey store would support offline reads and queued writes, with explicit synchronization status and conflict handling. Cached assets should include the sample Album and traveler-selected essential journey materials.

Database, sync protocol, conflict-resolution policy, storage quotas, media caching, and recovery are **TBD**.

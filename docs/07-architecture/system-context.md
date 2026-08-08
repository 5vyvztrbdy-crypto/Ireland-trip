# System Context

## Planned architecture

This architecture is proposed, not a confirmed technology selection.

```text
Traveler and journey sources
          ↓
Canonical journey store
   ├─ Journey Perspective and travel experience
   ├─ Reservation Engine
   └─ Story Engine
          ↓
Publisher-independent Album composition
   ├─ digital publishing
   ├─ partner manufacturing adapters
   └─ exact Living Album media links
```

Cross-cutting concerns are offline operation, synchronization, user ownership/export, provenance, confirmation, privacy, explainable AI, tests, deployment, and observability.

## Current implementation

The system is one static `index.html` file with embedded CSS, JavaScript, hard-coded journey content, browser storage, and external Google Maps links. There is no backend, build system, test suite, structured store, or deployment configuration in the repository.

# Storied Journey

Storied Journey is a travel companion that helps people plan extraordinary journeys and preserve the stories they will treasure forever.

> Every journey deserves an epic plan and an unforgettable story.

This repository is the durable record for product decisions, architecture, delivery, and the Joyce Journey acceptance dataset. The canonical Storied Journey Project Brief, Version 1.0, Blocks 1 and 2 (August 8, 2026), is authoritative over assumptions inferred from the early prototype.

## Status labels

- **Confirmed** — explicitly established by the canonical brief.
- **Current implementation** — directly observed in `index.html`; evidence, not product authority.
- **Planned architecture** — a proposed implementation direction requiring validation through delivery and architecture decisions.
- **Exploratory assumption** — useful for scenarios but not approved as a fact, forecast, or price.
- **TBD** — unresolved and not safe to infer.

## Documentation map

- [Governance](docs/00-governance/authority-and-source-policy.md)
- [Product](docs/01-product/product-vision.md)
- [Journey](docs/02-journey/journey-perspective.md)
- [Story](docs/03-story/story-engine.md)
- [Storied Album](docs/04-album/storied-album-vision.md)
- [Trust and data](docs/05-trust-data/user-ownership-and-export.md)
- [Business](docs/06-business/business-model.md)
- [Architecture](docs/07-architecture/system-context.md)
- [Joyce Journey](docs/08-joyce-journey/acceptance-dataset.md)
- [Delivery](docs/09-delivery/roadmap.md)
- [Legacy prototype](docs/10-legacy/prototype-inventory.md)

`index.html` began as the preserved early prototype. Sprint 1 authorized its migration to render the Joyce Journey from a canonical public dataset. Sprint 2's first authorized implementation slice adds a date-aware Home and a reusable next-reservation foundation while preserving that dataset as the source of truth. RavensCircle Product Bible v0.3 is the product authority for Sprint 2.

## Local development

Sprint 1 keeps the application framework-free and compatible with GitHub Pages. Because the canonical journey is fetched from JSON, serve the repository over HTTP instead of opening `index.html` directly:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Run the dependency-free validation harness with:

```sh
npm test
```

Only public journey facts belong in `data/joyce-journey.json`. See [Public and Private Journey Data Boundary](docs/07-architecture/private-data-boundary.md) before adding reservation data.

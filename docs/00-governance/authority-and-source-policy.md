# Authority and Source Policy

## Authority order

1. Confirmed decisions in the canonical Storied Journey Project Brief, Version 1.0, Blocks 1 and 2.
2. Later explicit CEO decisions recorded in the repository.
3. Approved architecture and product decision records.
4. Current implementation and tests as evidence of behavior.
5. Exploratory assumptions and proposals.

The prototype cannot override the canonical brief. If implementation and confirmed direction conflict, preserve the implementation until migration is authorized, document the difference, and follow the brief for future direction.

## Evidence rules

- Do not promote a prototype string, travel suggestion, reservation detail, price, conversion rate, or technical approach into a confirmed decision without an authoritative source.
- Travel-critical facts require source provenance and traveler confirmation before becoming authoritative.
- Distinguish what is known, observed, proposed, assumed, and unresolved.
- Important decisions must be stored in Git history rather than existing only in conversations.

## Change flow

Product decisions → repository documentation → code → tests → Git commit → GitHub → automated deployment.

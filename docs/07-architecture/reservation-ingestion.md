# Reservation Ingestion

## Planned architecture

```text
Screenshot / image / PDF / manual entry / future email
                         ↓
                  retained source
                         ↓
                one-time extraction
                         ↓
              structured unconfirmed draft
                         ↓
                  traveler review
                         ↓
                canonical reservation
                         ↓
      timeline / maps / navigation / story / Album
```

This flow implements confirmed product constraints. OCR service, document formats, validation rules, deduplication, secure storage, and email architecture are **TBD**.

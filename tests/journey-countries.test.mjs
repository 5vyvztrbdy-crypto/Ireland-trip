import assert from "node:assert/strict";
import { countryFlag, countryFlagSvg, journeyCountrySequence } from "../js/journey-countries.mjs";

const journey = {
  locations: [
    { id: "home", country: "United States", countryCode: "US" },
    { id: "first", country: "Iceland", countryCode: "IS" },
    { id: "second", country: "Ireland", countryCode: "IE" }
  ],
  reservations: [
    { date: "2026-08-01", startTime: "20:00", originLocationId: "home", destinationLocationId: "first" },
    { date: "2026-08-02", originLocationId: "first", destinationLocationId: "second" },
    { date: "2026-08-08", originLocationId: "second", destinationLocationId: "home" }
  ],
  days: []
};

assert.equal(countryFlag("IS"), "🇮🇸");
assert.equal(countryFlag("ie"), "🇮🇪");
assert.equal(countryFlag("Ireland"), "");
assert.match(countryFlagSvg("IS"), /Iceland flag/);
assert.match(countryFlagSvg("ie"), /Ireland flag/);
assert.equal(countryFlagSvg("US"), "");
assert.deepEqual(journeyCountrySequence(journey), {
  destinations: [{ name: "Iceland", code: "IS" }, { name: "Ireland", code: "IE" }],
  home: { name: "United States", code: "US" }
});

console.log("Canonical journey country sequence passed.");

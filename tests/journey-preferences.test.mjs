import assert from "node:assert/strict";
import {
  JOURNEY_PREFERENCES_KEY,
  readJourneyPreferences,
  setJourneyDetour,
  surpriseInterest,
  toggleJourneyInterest,
  writeJourneyPreferences
} from "../js/journey-preferences.mjs";

const values = new Map();
const storage = {
  getItem: (key) => values.get(key) || null,
  setItem: (key, value) => values.set(key, value)
};

let preferences = readJourneyPreferences(storage);
assert.deepEqual(preferences, { interests: [], detour: "10-min" });

preferences = toggleJourneyInterest(preferences, "coffee");
preferences = toggleJourneyInterest(preferences, "coast");
assert.deepEqual(preferences.interests, ["coffee", "coast"], "Multiple interests may be selected");
preferences = toggleJourneyInterest(preferences, "coffee");
assert.deepEqual(preferences.interests, ["coast"], "An active interest may be removed independently");

preferences = setJourneyDetour(preferences, "worth-it");
assert.equal(preferences.detour, "worth-it", "Exactly one detour value is stored");
writeJourneyPreferences(preferences, storage);
assert.deepEqual(readJourneyPreferences(storage), preferences, "Preferences survive storage round trips");
assert(values.has(JOURNEY_PREFERENCES_KEY));

assert.equal(surpriseInterest({ interests: ["coast"], detour: "10-min" }, () => 0).id, "coast", "Surprise uses selected interests");
assert.equal(surpriseInterest({ interests: ["coffee", "pubs"], detour: "10-min" }, () => 0.99).id, "pubs");

console.log("Reusable local journey preferences passed.");

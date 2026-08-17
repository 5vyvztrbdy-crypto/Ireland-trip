"use strict";

export const JOURNEY_PREFERENCES_KEY = "ravenscircleJourneyPreferences";

export const INTEREST_OPTIONS = [
  { id: "coffee", label: "Coffee", mapQuery: "coffee" },
  { id: "pubs", label: "Pubs", mapQuery: "pubs" },
  { id: "food", label: "Food", mapQuery: "local food" },
  { id: "ruins-history", label: "Ruins & History", mapQuery: "historic ruins" },
  { id: "overlooks", label: "Overlooks", mapQuery: "scenic overlooks" },
  { id: "local-life", label: "Local Life", mapQuery: "local attractions" },
  { id: "coast", label: "Coast", mapQuery: "coastal viewpoints" },
  { id: "shops", label: "Shops", mapQuery: "local shops" },
  { id: "restrooms", label: "Restrooms", mapQuery: "public restrooms" }
];

export const DETOUR_OPTIONS = [
  { id: "10-min", label: "10 min" },
  { id: "30-min", label: "30 min" },
  { id: "worth-it", label: "Worth a Detour" }
];

const interestIds = new Set(INTEREST_OPTIONS.map(({ id }) => id));
const detourIds = new Set(DETOUR_OPTIONS.map(({ id }) => id));

export function normalizeJourneyPreferences(value = {}) {
  const interests = Array.isArray(value.interests) ? [...new Set(value.interests.filter((id) => interestIds.has(id)))] : [];
  return { interests, detour: detourIds.has(value.detour) ? value.detour : "10-min" };
}

export function readJourneyPreferences(storage = globalThis.localStorage) {
  try {
    return normalizeJourneyPreferences(JSON.parse(storage.getItem(JOURNEY_PREFERENCES_KEY) || "{}"));
  } catch {
    return normalizeJourneyPreferences();
  }
}

export function writeJourneyPreferences(preferences, storage = globalThis.localStorage) {
  const normalized = normalizeJourneyPreferences(preferences);
  storage.setItem(JOURNEY_PREFERENCES_KEY, JSON.stringify(normalized));
  return normalized;
}

export function toggleJourneyInterest(preferences, interestId) {
  const normalized = normalizeJourneyPreferences(preferences);
  if (!interestIds.has(interestId)) return normalized;
  const interests = normalized.interests.includes(interestId)
    ? normalized.interests.filter((id) => id !== interestId)
    : [...normalized.interests, interestId];
  return { ...normalized, interests };
}

export function setJourneyDetour(preferences, detour) {
  return normalizeJourneyPreferences({ ...preferences, detour });
}

export function surpriseInterest(preferences, random = Math.random) {
  const normalized = normalizeJourneyPreferences(preferences);
  const selected = INTEREST_OPTIONS.filter(({ id }) => normalized.interests.includes(id));
  const candidates = selected.length ? selected : INTEREST_OPTIONS;
  return candidates[Math.floor(random() * candidates.length)];
}

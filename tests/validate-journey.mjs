import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFile(path.join(root, file), "utf8");
const dataText = await read("data/joyce-journey.json");
const journey = JSON.parse(dataText);
const index = await read("index.html");
const app = await read("js/app.js");

const ids = (records, label) => {
  const values = records.map((record) => record.id);
  assert.equal(new Set(values).size, values.length, `${label} IDs must be unique`);
  return new Set(values);
};
const travelers = ids(journey.travelers, "Traveler");
const locations = ids(journey.locations, "Location");
const reservations = ids(journey.reservations, "Reservation");
ids(journey.days, "Day");

const privateFields = ["bookingReference", "confirmationNumber", "itineraryNumber", "sourceDocuments", "sensitiveNotes", "identityDetails", "paymentDetails"];
for (const field of privateFields) assert(!Object.hasOwn(journey, field) && !dataText.includes(`\"${field}\"`), `Public data must exclude ${field}`);

for (const travelerId of journey.travelerIds) assert(travelers.has(travelerId), `Unknown traveler ${travelerId}`);
for (const reservation of journey.reservations) {
  assert(["protected", "fixed", "flexible", "optional"].includes(reservation.anchorStatus), `Invalid anchor status on ${reservation.id}`);
  assert(["confirmed", "needs-verification"].includes(reservation.confirmationStatus), `Invalid confirmation status on ${reservation.id}`);
  for (const key of ["locationId", "originLocationId", "destinationLocationId"]) if (reservation[key]) assert(locations.has(reservation[key]), `Unknown location on ${reservation.id}`);
}
for (const day of journey.days) {
  if (day.baseLocationId) assert(locations.has(day.baseLocationId), `Unknown base on ${day.id}`);
  for (const reservationId of day.reservationIds) assert(reservations.has(reservationId), `Unknown reservation ${reservationId} on ${day.id}`);
  for (const stop of day.stops) if (stop.reservationId) {
    assert(reservations.has(stop.reservationId), `Unknown stop reservation ${stop.reservationId}`);
    assert(day.reservationIds.includes(stop.reservationId), `${stop.reservationId} must be projected by ${day.id}`);
    const reservation = journey.reservations.find((item) => item.id === stop.reservationId);
    if (["fixed", "protected"].includes(reservation.anchorStatus)) {
      assert(!Object.hasOwn(stop, "title"), `${stop.id} must derive title from ${reservation.id}`);
      assert(!Object.hasOwn(stop, "time"), `${stop.id} must derive date/time from ${reservation.id}`);
      assert(!Object.hasOwn(stop, "flexibilityStatus"), `${stop.id} must derive anchor state from ${reservation.id}`);
      if (stop.reservationMoment === "end") assert(reservation.endDate || reservation.endTime, `${stop.id} requires an end value on ${reservation.id}`);
    }
  }
}

const expectedDates = ["2026-08-29", "2026-08-30", "2026-08-31", "2026-09-01", "2026-09-02", "2026-09-03", "2026-09-04"];
assert.deepEqual(journey.days.map((day) => day.date), expectedDates, "No original journey day may disappear or be reordered");
const byReservation = Object.fromEntries(journey.reservations.map((reservation) => [reservation.id, reservation]));
const byDay = Object.fromEntries(journey.days.map((day) => [day.date, day]));

const byLocation = Object.fromEntries(journey.locations.map((location) => [location.id, location]));
assert.equal(byReservation["res-keflavik-lodging"].title, "Hafnargata lodging");
assert.equal(byReservation["res-keflavik-lodging"].date, "2026-08-29");
const icelandStops = new Set(byDay["2026-08-29"].stops.map((stop) => stop.id));
assert(icelandStops.has("bridge-continents"), "Bridge Between Continents must remain represented");
assert(icelandStops.has("gunnuhver"), "Gunnuhver must remain represented");
assert(icelandStops.has("reykjanesviti"), "Reykjanesviti / Valahnúkamöl must remain represented");
assert(icelandStops.has("lagoon"), "Blue Lagoon or geothermal alternative must remain represented");
assert.equal(byReservation["res-galway-lodging"].title, "Leonardo Hotel Galway");
assert.equal(byReservation["res-galway-lodging"].confirmationStatus, "confirmed");
assert.equal(byLocation[byReservation["res-galway-lodging"].locationId].address, "Quay Street, Galway, H91 E8D7");
assert(byDay["2026-08-30"].reservationIds.includes("res-galway-lodging"), "Galway lodging must be in Ireland arrival sequence");
assert.equal(byReservation["res-cong-lodging"].title, "Ryan’s River Lodge");
assert.equal(byReservation["res-cong-lodging"].confirmationStatus, "needs-verification");
assert.equal(byReservation["res-sheepdogs"].title, "Joyce Country Sheepdogs");
assert.equal(byDay["2026-09-02"].baseLocationId, "athlone");
assert.equal(byReservation["res-athlone-lodging"].date, "2026-09-02");
assert.equal(byReservation["res-athlone-lodging"].startTime, "15:00");
assert.equal(byReservation["res-newgrange"].date, "2026-09-03");
assert.equal(byReservation["res-newgrange"].startTime, "12:00");
assert.equal(byReservation["res-newgrange"].anchorStatus, "protected");
assert.equal(byReservation["res-newgrange"].confirmationStatus, "confirmed");
assert.equal(byReservation["res-king-sitric-dinner"].startTime, "18:00");
assert.equal(byReservation["res-king-sitric-dinner"].anchorStatus, "protected");
assert.equal(byReservation["res-howth-lodging"].date, "2026-09-03");
assert.equal(byDay["2026-09-03"].baseLocationId, "howth");
assert(["res-fi824", "res-fi416"].every((id) => byReservation[id]), "Iceland flights must remain represented");
for (const id of ["res-jetblue-354", "res-jetblue-507"]) {
  assert(byReservation[id], `Return flight ${id} must remain represented`);
  assert.equal(byReservation[id].confirmationStatus, "needs-verification");
}
assert(!dataText.includes("9:15 AM"), "Obsolete Newgrange timing must be absent");
assert(!dataText.includes("much earlier return") && !dataText.includes("critical conflict"), "Obsolete Budget conflict must be absent");

for (const reservation of journey.reservations.filter((item) => ["fixed", "protected"].includes(item.anchorStatus))) {
  assert(journey.days.some((day) => day.reservationIds.includes(reservation.id)), `Anchor ${reservation.id} must project into a day`);
}

assert(index.includes('<script type="module" src="js/app.js"></script>'), "index.html must load the external renderer");
assert(!index.includes("const days="), "index.html must not embed itinerary data");
assert(app.includes('fetch("data/joyce-journey.json")'), "Renderer must fetch canonical JSON");
assert(app.includes("projectedStop(day, stop)"), "Renderer must project linked stops from reservations");
assert(app.includes("journeyDateState(journey)"), "Home must derive its state from journey dates");
assert(!app.includes("journey.days[0]"), "Home must not hard-code the first journey day");
assert(app.includes("nextUpcomingReservation(journey.reservations)"), "Home must derive the next reservation from canonical data");
assert(!index.includes("sourceMappingURL") && !app.includes("sourceMappingURL"), "Deployable code must not reference source maps");

console.log(`Validated ${journey.title}: ${journey.days.length} days, ${journey.reservations.length} reservations, ${journey.locations.length} locations.`);
console.log("Acceptance anchors, public/private boundary, references, and static entrypoint passed.");

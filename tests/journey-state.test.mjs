import assert from "node:assert/strict";
import { journeyDateState, nextUpcomingReservation } from "../js/journey-state.mjs";

const journey = {
  days: [
    { id: "middle", date: "2026-08-30" },
    { id: "first", date: "2026-08-29" },
    { id: "last", date: "2026-09-04" }
  ]
};

let state = journeyDateState(journey, new Date(2026, 7, 28, 23, 59));
assert.equal(state.phase, "before");
assert.equal(state.day.id, "first");
assert.equal(state.dayIndex, 1, "Day index must refer to the canonical, unsorted array");

state = journeyDateState(journey, new Date(2026, 7, 30, 12));
assert.equal(state.phase, "during");
assert.equal(state.day.id, "middle");
assert.equal(state.dayIndex, 0);

state = journeyDateState(journey, new Date(2026, 8, 5, 0));
assert.equal(state.phase, "after");
assert.equal(state.day.id, "last");

const reservationData = [
  { id: "past-day", date: "2026-08-29", startTime: "12:00" },
  { id: "past-time", date: "2026-08-30", startTime: "09:00" },
  { id: "next-time", date: "2026-08-30", startTime: "11:00" },
  { id: "untimed-today", date: "2026-08-30" },
  { id: "tomorrow", date: "2026-08-31", startTime: "08:00" }
];

assert.equal(nextUpcomingReservation(reservationData, new Date(2026, 7, 30, 10)).id, "next-time");
assert.equal(nextUpcomingReservation(reservationData, new Date(2026, 7, 30, 12)).id, "untimed-today", "An untimed reservation remains eligible for its whole date");
assert.equal(nextUpcomingReservation(reservationData, new Date(2026, 7, 31, 9)), null, "Past reservations must be excluded");
assert.equal(nextUpcomingReservation([], new Date(2026, 7, 30)), null);

console.log("Date-aware journey state and next-reservation selection passed.");

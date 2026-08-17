"use strict";

function localDateKey(value) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function localDateTime(date, time = "23:59:59") {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute, second = 0] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute, second);
}

export function journeyDateState(journey, now = new Date()) {
  const days = [...journey.days].sort((a, b) => a.date.localeCompare(b.date));
  if (!days.length) return { phase: "empty", day: null, dayIndex: -1 };

  const today = localDateKey(now);
  const day = days.find((candidate) => candidate.date === today);
  if (day) return { phase: "during", day, dayIndex: journey.days.indexOf(day) };
  if (today < days[0].date) return { phase: "before", day: days[0], dayIndex: journey.days.indexOf(days[0]) };
  return { phase: "after", day: days.at(-1), dayIndex: journey.days.indexOf(days.at(-1)) };
}

export function nextUpcomingReservation(reservations, now = new Date()) {
  return reservations
    .map((reservation, index) => ({
      reservation,
      index,
      moment: localDateTime(reservation.date, reservation.startTime)
    }))
    .filter(({ moment }) => moment >= now)
    .sort((left, right) => left.moment - right.moment || left.index - right.index)[0]?.reservation || null;
}

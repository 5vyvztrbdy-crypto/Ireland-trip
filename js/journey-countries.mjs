"use strict";

export function countryFlag(countryCode) {
  const code = String(countryCode || "").toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return "";
  return [...code].map((letter) => String.fromCodePoint(127397 + letter.charCodeAt(0))).join("");
}

export function countryFlagSvg(countryCode) {
  const code = String(countryCode || "").toUpperCase();
  const flags = {
    IS: '<svg viewBox="0 0 25 18" role="img" aria-label="Iceland flag"><rect width="25" height="18" rx="1" fill="#02529c"/><path d="M0 7h7V0h4v7h14v4H11v7H7v-7H0z" fill="#fff"/><path d="M0 8h8V0h2v8h15v2H10v8H8v-8H0z" fill="#dc1e35"/></svg>',
    IE: '<svg viewBox="0 0 24 18" role="img" aria-label="Ireland flag"><rect width="24" height="18" rx="1" fill="#fff"/><path d="M0 1a1 1 0 0 1 1-1h7v18H1a1 1 0 0 1-1-1z" fill="#169b62"/><path d="M16 0h7a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-7z" fill="#ff883e"/></svg>'
  };
  return flags[code] || "";
}

export function journeyCountrySequence(journey) {
  const locations = new Map(journey.locations.map((location) => [location.id, location]));
  const route = [];
  const append = (locationId) => {
    const location = locations.get(locationId);
    if (!location?.country || !location?.countryCode) return;
    const country = { name: location.country, code: location.countryCode.toUpperCase() };
    if (route.at(-1)?.code !== country.code) route.push(country);
  };

  journey.reservations
    .map((reservation, index) => ({ reservation, index }))
    .sort((left, right) => left.reservation.date.localeCompare(right.reservation.date)
      || (left.reservation.startTime || "").localeCompare(right.reservation.startTime || "")
      || left.index - right.index)
    .forEach(({ reservation }) => {
      append(reservation.originLocationId);
      append(reservation.locationId);
      append(reservation.destinationLocationId);
    });

  if (!route.length) journey.days.forEach((day) => append(day.baseLocationId));
  const returnsHome = route.length > 2 && route[0].code === route.at(-1).code;
  const home = returnsHome ? route[0] : null;
  const countries = returnsHome ? route.slice(1, -1) : route;
  const destinations = countries.filter((country, index) => countries.findIndex(({ code }) => code === country.code) === index);
  return { destinations, home };
}

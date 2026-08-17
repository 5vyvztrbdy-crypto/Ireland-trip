"use strict";

import { journeyDateState, nextUpcomingReservation } from "./journey-state.mjs";
import { countryFlag, countryFlagSvg, journeyCountrySequence } from "./journey-countries.mjs";
import {
  DETOUR_OPTIONS,
  INTEREST_OPTIONS,
  readJourneyPreferences,
  setJourneyDetour,
  surpriseInterest,
  toggleJourneyInterest,
  writeJourneyPreferences
} from "./journey-preferences.mjs";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const h = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;"
})[character]);
const maps = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

let journey;
let locations;
let reservations;

function formatTime(value, qualifier) {
  if (!value) return "";
  const [hour, minute] = value.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${qualifier ? `${qualifier} ` : ""}${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function locationName(id) {
  return locations.get(id)?.name || id || "Location needs verification";
}

function baseName(day) {
  return day.baseLabel || locationName(day.baseLocationId);
}

function projectedStop(day, stop) {
  if (!stop.reservationId) {
    return { title: stop.title, schedule: stop.time, anchorStatus: stop.flexibilityStatus, confirmationStatus: null };
  }
  const reservation = reservations.get(stop.reservationId);
  if (!reservation) throw new Error(`Missing reservation ${stop.reservationId}`);
  const usesEnd = stop.reservationMoment === "end" || (reservation.endDate === day.date && reservation.date !== day.date);
  const date = usesEnd ? (reservation.endDate || reservation.date) : reservation.date;
  const time = usesEnd ? reservation.endTime : reservation.startTime;
  const qualifier = usesEnd ? reservation.endTimeQualifier : null;
  return {
    title: reservation.title,
    schedule: `${date}${time ? ` · ${formatTime(time, qualifier)}` : ""}`,
    anchorStatus: reservation.anchorStatus,
    confirmationStatus: reservation.confirmationStatus
  };
}

function hero(eyebrow, title, description) {
  return `<div class="hero"><div class="eyebrow">${h(eyebrow)}</div><h2>${h(title)}</h2><p>${h(description)}</p></div>`;
}

function renderNotices() {
  const node = $("#notices");
  node.replaceChildren();
  journey.notices.forEach((notice) => {
    const label = document.createElement("b");
    label.textContent = `${notice.title}: `;
    node.append(label, document.createTextNode(notice.message));
  });
}

function renderJourneyFlags() {
  const { destinations, home } = journeyCountrySequence(journey);
  const flag = (code) => countryFlagSvg(code) || `<span class="flag-emoji">${countryFlag(code)}</span>`;
  const destinationFlags = destinations.map(({ name, code }) => `<span class="journey-flag"><span class="flag" aria-hidden="true">${flag(code)}</span><span class="journey-flag-label">${h(name)}</span></span>`);
  const homeStop = home ? `<span class="journey-flag journey-home"><span class="flag home-icon" aria-hidden="true">🏠</span><span class="journey-flag-label">Home</span></span>` : "";
  const markup = [...destinationFlags, homeStop].filter(Boolean).join('<span class="journey-arrow" aria-hidden="true">→</span>');
  $("#splashJourneyFlags").innerHTML = markup;
  $("#headerJourneyFlags").innerHTML = markup;
  $("#splashJourneyFlags").setAttribute("aria-label", `${destinations.map(({ name }) => name).join(", ")}${home ? `; returning home to ${home.name}` : ""}`);
}

function renderToday() {
  const state = journeyDateState(journey);
  const preferences = readJourneyPreferences();
  const paths = `<div class="home-paths" aria-label="Primary journey paths"><button class="home-path" data-view="journey"><div class="eyebrow">HUGINN · THOUGHT</div><strong>Plan &amp; Journey</strong><span>Find your way forward</span></button><button class="home-path memory" data-view="journal"><div class="eyebrow">MUNINN · MEMORY</div><strong>Memories</strong><span>Return to your story</span></button></div>`;
  const interestChips = INTEREST_OPTIONS.map(({ id, label }) => `<button class="preference-chip" data-interest="${h(id)}" aria-pressed="${preferences.interests.includes(id)}">${h(label)}</button>`).join("");
  const detourChips = DETOUR_OPTIONS.map(({ id, label }) => `<button class="preference-chip" data-detour="${h(id)}" aria-pressed="${preferences.detour === id}">${h(label)}</button>`).join("");
  let lead;
  if (state.phase === "before") {
    lead = `<div class="hero home-context"><div class="eyebrow">YOUR JOURNEY AWAITS</div><h2>${h(journey.title)}</h2><p>Your first chapter begins ${h(state.day.displayDate)}.</p><button class="primary" data-open-day="${state.dayIndex}">Preview the Journey</button></div>`;
  } else if (state.phase === "after") {
    lead = `<div class="hero home-context"><div class="eyebrow">JOURNEY COMPLETE</div><h2>Your story continues</h2><p>Your ${h(journey.subtitle)} journey is complete. Return to the moments you saved along the way.</p><button class="primary" data-view="journal">Visit Your Memories</button></div>`;
  } else {
    lead = `<div class="hero home-context"><div class="eyebrow">TODAY’S CHAPTER</div><h2>${h(state.day.title)}</h2><p>${h(state.day.displayDate)} · ${h(baseName(state.day))}</p><button class="primary" data-open-day="${state.dayIndex}">Start Today’s Adventure</button></div>`;
  }
  $("#today").innerHTML = paths + lead + `
  <div class="card home-secondary"><h3>Built for your pace</h3><span class="preference-label">WHAT INTERESTS YOU?</span><div class="preference-chips" aria-label="Journey interests">${interestChips}</div><span class="preference-label">DETOUR TOLERANCE</span><div class="preference-chips detour-chips" aria-label="Detour tolerance">${detourChips}</div></div>`;
}

function reservationMapQuery(reservation) {
  const locationId = reservation.locationId || reservation.destinationLocationId || reservation.originLocationId;
  return locations.get(locationId)?.mapQuery || null;
}

function renderNextReservation() {
  const reservation = nextUpcomingReservation(journey.reservations);
  const node = $("#nextReservation");
  if (!reservation) {
    node.classList.remove("visible");
    node.replaceChildren();
    return;
  }
  const query = reservationMapQuery(reservation);
  node.classList.add("visible");
  const schedule = [reservation.date, formatTime(reservation.startTime)].filter(Boolean).join(" · ");
  node.innerHTML = `<div class="eyebrow">NEXT RESERVATION</div><strong>${h(schedule)}</strong><span>${h(reservation.title)}</span>${query ? `<a href="${h(maps(query))}" target="_blank" rel="noopener noreferrer">Navigate in Google Maps</a>` : ""}`;
}

function renderJourney() {
  $("#journey").innerHTML = hero("YOUR COMPLETE ROUTE", journey.subtitle, "Seven chapters, designed around nature, history, heritage and room for unexpected joy.") +
    `<div class="card"><h3>Your journey details</h3><p class="muted">Review every protected booking and flexible reservation in one place.</p><button class="secondary" data-view="reservations">View All Reservations</button></div>` +
    journey.days.map((day, index) => `<button class="day-btn" data-open-day="${index}"><strong>${h(day.displayDate)} — ${h(day.title)}</strong><span>${day.stops.length} planned moments · Evening in ${h(baseName(day))}</span></button>`).join("");
}

function openDay(index) {
  const day = journey.days[index];
  const stops = day.stops.map((stop, stopIndex) => {
    const projection = projectedStop(day, stop);
    const state = [projection.anchorStatus, projection.confirmationStatus].filter(Boolean).map((item) => `<span class="chip">${h(item)}</span>`).join("");
    return `<div class="card stop"><div class="num">${stopIndex + 1}</div><div><small>${h(projection.schedule)}</small><h3>${h(projection.title)}</h3><p>${h(stop.description)}</p><div class="chips"><span class="chip">🚻 ${h(stop.note)}</span>${state}</div><div class="actions"><a class="primary" href="${h(maps(stop.mapQuery))}" target="_blank" rel="noopener noreferrer">Google Maps</a><button class="secondary" data-journal-stop="${h(stop.id)}">Complete Stop</button></div></div></div>`;
  }).join("");
  const food = day.food.map((item, foodIndex) => `<div class="restaurant"><b>${foodIndex + 1}. ${h(item.name)}</b><span>${h(item.description)}</span><div class="actions"><a class="ghost" href="${h(maps(`${item.name} ${baseName(day)}`))}" target="_blank" rel="noopener noreferrer">Google Maps</a></div></div>`).join("");
  const foodCard = day.food.length ? `<div class="card"><h3>Dinner choices</h3>${food}</div>` : "";
  $("#dlgBody").innerHTML = `<div class="eyebrow">${h(day.displayDate)}</div><h2>${h(day.title)}</h2><p class="muted">Evening base: ${h(baseName(day))}</p>${stops}${foodCard}`;
  $("#dlg").showModal();
}

function reservationDetails(reservation) {
  const details = [];
  if (reservation.startTime) details.push(formatTime(reservation.startTime));
  if (reservation.endDate) details.push(`through ${reservation.endDate}`);
  if (reservation.endTime) details.push(formatTime(reservation.endTime, reservation.endTimeQualifier));
  if (reservation.locationId) details.push(locationName(reservation.locationId));
  if (reservation.originLocationId && reservation.destinationLocationId) details.push(`${locationName(reservation.originLocationId)} → ${locationName(reservation.destinationLocationId)}`);
  if (reservation.partySize) details.push(`${reservation.partySize} travelers`);
  return details;
}

function renderReservations() {
  const cards = journey.reservations.map((reservation) => {
    const details = reservationDetails(reservation);
    return `<div class="card"><div class="eyebrow">${h(reservation.type)} · ${h(reservation.confirmationStatus)}</div><h3>${h(reservation.title)}</h3><p>${h(reservation.date)}${details.length ? ` · ${details.map(h).join(" · ")}` : ""}</p><p>${h(reservation.publicNote)}</p></div>`;
  }).join("");
  $("#reservations").innerHTML = hero("PLAN & JOURNEY", "Reservations", "Public journey details are shown below. Save private confirmation numbers only on this device.") + `<button class="ghost" data-view="journey">← Back to Journey</button>` + cards +
    `<div class="card"><h3>Private confirmation notes</h3><p class="muted">Stored only in this browser on this phone and never loaded from the public journey dataset. Do not erase browser website data without exporting your notes first.</p><textarea id="privateNotes" rows="8" placeholder="Confirmation numbers, contact names, addresses..."></textarea><button id="savePrivate" class="primary">Save privately</button></div>`;
  $("#privateNotes").value = localStorage.getItem("jjPrivate") || "";
}

function savePrivate() {
  localStorage.setItem("jjPrivate", $("#privateNotes").value);
  alert("Saved privately on this device.");
}

function readJournal() {
  try {
    const value = JSON.parse(localStorage.getItem("jjJournal") || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function journalPrompt(stopTitle) {
  $("#dlgBody").innerHTML = `<div class="eyebrow">CAPTURE THE MOMENT</div><h2>${h(stopTitle)}</h2>
  <label>Rating</label><select id="jr"><option>5 — Unforgettable</option><option>4 — Excellent</option><option>3 — Good</option><option>2 — Not for us</option><option>1 — Disappointing</option></select>
  <label>What do you want to remember?</label><textarea id="jm" rows="4"></textarea>
  <label>Favorite moment</label><input id="jf">
  <label><input id="js" type="checkbox" style="width:auto"> ✨ This made the journey — an unexpected joy</label>
  <label>Add photos</label><input id="jp" type="file" accept="image/*" multiple>
  <button id="saveJournal" class="primary">Add to My Story</button>`;
  $("#saveJournal").addEventListener("click", () => saveJournal(stopTitle));
  $("#dlg").showModal();
}

function saveJournal(stop) {
  const entries = readJournal();
  entries.push({ stop, date: new Date().toLocaleString(), rating: $("#jr").value, memory: $("#jm").value, favorite: $("#jf").value, surprise: $("#js").checked, photoCount: $("#jp").files.length });
  localStorage.setItem("jjJournal", JSON.stringify(entries));
  $("#dlg").close();
  renderJournal();
  alert("Added to Your Story. Photo count is recorded; selected photos remain in your Photos library.");
}

function renderJournal() {
  const entries = readJournal();
  const content = entries.length ? entries.map((entry) => `<div class="card"><div class="eyebrow">${h(entry.date)}</div><h3>${h(entry.stop)}</h3><p><b>${h(entry.rating)}</b></p><p>${h(entry.memory)}</p><p><i>${h(entry.favorite)}</i></p>${entry.surprise ? "<p>✨ <b>This made the journey</b></p>" : ""}<small>${Number(entry.photoCount) || 0} photo(s) selected</small></div>`).join("") : `<div class="card"><h3>Your story begins here</h3><p>Complete a stop or add a memory. At the end of the journey, these reflections will become the raw material for “Your Story Is Ready.”</p></div>`;
  $("#journal").innerHTML = hero("MUNINN · MEMORY", "Memories", "The collection of moments, reflections and meaning you bring home. Campfire captures from the journey live here and will eventually help shape your Storied Album.") + `<div class="card"><button id="addMemory" class="primary">Add a Memory</button> <button id="exportJournal" class="secondary">Download Backup</button></div>${content}`;
}

function exportJournal() {
  const blob = new Blob([localStorage.getItem("jjJournal") || "[]"], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "joyce-journey-journal-backup.json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 0);
}

function pauseTrip() {
  $("#dlgBody").innerHTML = `<div class="mark">⏸</div><h2>The best journeys aren’t rushed.</h2><p>Take your time. The itinerary serves you—not the other way around.</p><p>When you are ready, continue from the next meaningful moment rather than worrying about being “late.”</p><button id="continueTrip" class="primary">Continue when ready</button>`;
  $("#continueTrip").addEventListener("click", () => $("#dlg").close());
  $("#dlg").showModal();
}

function surprise() {
  const preferences = readJourneyPreferences();
  const pick = surpriseInterest(preferences);
  const detour = DETOUR_OPTIONS.find(({ id }) => id === preferences.detour);
  $("#dlgBody").innerHTML = `<div class="mark">✦</div><h2>Surprise Me</h2><p>Look nearby for: <b>${h(pick.label)}</b>.</p><p class="muted">Based on your journey interests · Detour tolerance: ${h(detour.label)}. This preview does not search live businesses yet.</p><a class="primary" href="${h(maps(`${pick.mapQuery} near me`))}" target="_blank" rel="noopener noreferrer">Explore in Google Maps</a>`;
  $("#dlg").showModal();
}

function campfireCapture() {
  journalPrompt("A campfire capture");
}

function switchView(viewName) {
  $$('nav button').forEach((button) => button.classList.toggle("active", button.dataset.v === viewName));
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === viewName));
}

function bindEvents() {
  $("#startApp").addEventListener("click", () => { localStorage.setItem("jjStarted", "1"); $("#splash").classList.add("hide"); });
  $("#closeDialog").addEventListener("click", () => $("#dlg").close());
  $("#pauseButton").addEventListener("click", pauseTrip);
  $("#surpriseButton").addEventListener("click", surprise);
  $("#campfireButton").addEventListener("click", campfireCapture);
  $("#nav").addEventListener("click", (event) => {
    if (!event.target.dataset.v) return;
    switchView(event.target.dataset.v);
  });
  document.addEventListener("click", (event) => {
    const interestButton = event.target.closest("[data-interest]");
    if (interestButton) {
      writeJourneyPreferences(toggleJourneyInterest(readJourneyPreferences(), interestButton.dataset.interest));
      renderToday();
      return;
    }
    const detourButton = event.target.closest("[data-detour]");
    if (detourButton) {
      writeJourneyPreferences(setJourneyDetour(readJourneyPreferences(), detourButton.dataset.detour));
      renderToday();
      return;
    }
    const dayButton = event.target.closest("[data-open-day]");
    if (dayButton) openDay(Number(dayButton.dataset.openDay));
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) switchView(viewButton.dataset.view);
    const journalButton = event.target.closest("[data-journal-stop]");
    if (journalButton) {
      for (const day of journey.days) {
        const stop = day.stops.find((item) => item.id === journalButton.dataset.journalStop);
        if (stop) { journalPrompt(projectedStop(day, stop).title); break; }
      }
    }
    if (event.target.id === "savePrivate") savePrivate();
    if (event.target.id === "addMemory") journalPrompt("A moment from today");
    if (event.target.id === "exportJournal") exportJournal();
  });
}

async function initialize() {
  bindEvents();
  if (localStorage.getItem("jjStarted")) $("#splash").classList.add("hide");
  try {
    const response = await fetch("data/joyce-journey.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    journey = await response.json();
    locations = new Map(journey.locations.map((location) => [location.id, location]));
    reservations = new Map(journey.reservations.map((reservation) => [reservation.id, reservation]));
    renderJourneyFlags();
    renderNotices();
    renderNextReservation();
    renderToday();
    renderJourney();
    renderReservations();
    renderJournal();
  } catch (error) {
    $("#today").innerHTML = `<div class="card"><h3>Journey unavailable</h3><p class="danger">The canonical journey data could not be loaded. Serve this site over HTTP and try again.</p><small>${h(error.message)}</small></div>`;
  }
}

initialize();

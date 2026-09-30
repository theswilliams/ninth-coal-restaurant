# Ninth Coal

> **Fictional concept project.** Ninth Coal is an invented restaurant. The address, phone number, email, hours, menu and prices are made-up placeholders. The reservation form sends and stores nothing. No real client, customer or metric is implied.

Project 02 of a five-site web design portfolio series. Brief: a restaurant site with a real menu, reservations and location information.

## Project

A four-page site for **Ninth Coal**, an imaginary wood-fire kitchen that opens at 10pm and cooks until 2am, Wednesday to Sunday, with dark nights on Monday and Tuesday. Pages: Home, Menu, Reserve and Visit. Built as a portfolio piece to show art direction, multi-page information design and front-end craft.

## Challenge

A restaurant that only exists after midnight has to be found by people who are already out, hungry and unsure anything is still open. The site needs to say "yes, tonight, this door" in one glance, then deliver the practical pieces (menu, booking, directions, access) without ceremony.

## Design Direction

**The view from a dark street of the one lit window, then stepping inside.** The home page opens on a cold midnight-blue street and a single arched window. Through it: a warm char interior, gilt lettering, and a live dithered fire, the brightest thing on the page. Colour is held to cold street, warm char, gilt, coal red, with amber reserved for flame. Art is flat, code-drawn silhouettes with arched frames; there are no photographs. Type is Young Serif for lettering and Hanken Grotesk for reading.

## UX Approach

- The open/closed state is computed from the clock and shown everywhere (rail, top bar, hero), along with the time until the kitchen opens. The fire's intensity follows it.
- Real separate pages, each with one job; the nav is three words.
- Menu: sticky dietary filters, dot-leader dish lines, plain-language descriptions.
- Reserve: nights, party size, seating and time are chips and a stepper; a paper booking slip fills in live beside the form. Validation is inline and specific. Times less than half an hour away are not offered, and party size adjusts the seating options.
- Visit: a sketch map, today's hours marked, walk-in policy, access notes and an FAQ in native `details`.

## Technology

Vite + vanilla TypeScript, multi-page static output, no framework. Shared nav and footer are injected at build time by a small Vite plugin (`partials/`). Two self-hosted font packages (`@fontsource/young-serif`, `@fontsource-variable/hanken-grotesk`). The fire is a canvas doom-fire effect (`src/fire.ts`). Menu, hours and slots live in `src/data.ts`; open/closed logic is in `src/service.ts`.

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build to dist/
```

## Key Features

- **Live fire canvas** inside the window, tied to service hours (full when open, banked embers when closed).
- **Left vertical-text rail** on desktop that becomes a top bar plus bottom dock on phones.
- **Dot-leader menu** with dietary filters.
- **Reservation slip**: a paper slip that fills as you choose; a labelled "nothing was sent" confirmation.
- **Page transitions** via the View Transitions API where supported.
- Scroll-driven reveals for the night timeline and a snap carousel for the room cards on mobile.

## Responsive Design

Recomposed, not reflowed. At 1024px and up the nav is a fixed left rail with vertical labels and the hero pairs the arched window with the headline. Below that, the rail becomes a slim top bar with an open/closed pill and a bottom dock with Reserve as the primary action; the room cards become a scroll-snap carousel and the reservation slip moves under the form. Tested at 1440x900 and 390x844 with no horizontal scroll and no console errors.

## Accessibility

Skip link, visible focus states, native form controls with labels and `aria-describedby` errors, `aria-pressed` on chips, `aria-current` on navigation and today's hours, live regions for the slip and party size, and `prefers-reduced-motion` fallbacks (static fire frame, no scroll animation, no page transition). The art carries text alternatives.

## Status

Complete as a concept for human review. Not deployed. Project 03 has not been started.

Screenshots are in [`screenshots/`](screenshots/). Design system notes are in `DESIGN.md`. The cross-project comparison is in [`docs/DIFFERENTIATION-MATRIX.md`](docs/DIFFERENTIATION-MATRIX.md).

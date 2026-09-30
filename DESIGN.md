---
name: Ninth Coal
description: A fictional wood-fire kitchen open 10pm to 2am, seen as the one lit window on a cold midnight street.
colors:
  street: "#0B1014"
  street-2: "#111A21"
  street-3: "#1A252E"
  char: "#160D09"
  char-2: "#21130D"
  char-3: "#2E1A11"
  gilt: "#DDAE4E"
  gilt-dim: "#B28A3A"
  coal: "#BF341B"
  coal-hi: "#A92B14"
  flame: "#FF9A2E"
  bone: "#F0E4D0"
  ash: "#BBAA93"
  slip-paper: "#EFE3CC"
  slip-ink: "#2A1A0C"
  error-edge: "#FF7A66"
  error-text: "#FF9A88"
typography:
  display:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "clamp(2.5rem, 5.2vw + 1rem, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "normal"
  headline:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "clamp(1.75rem, 2.4vw + 1rem, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.08
  title:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.08
  body:
    fontFamily: "Hanken Grotesk Variable, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Hanken Grotesk Variable, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  xs: "4px"
  sm: "8px"
  lg: "18px"
  pill: "99px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "28px"
  lg: "44px"
  section: "clamp(64px, 9vw, 120px)"
  gutter: "clamp(20px, 5vw, 72px)"
  rail: "96px"
components:
  button-primary:
    backgroundColor: "{colors.coal}"
    textColor: "{colors.bone}"
    rounded: "{rounded.lg}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.coal-hi}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.gilt}"
    rounded: "{rounded.lg}"
    padding: "0 28px"
    height: "52px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.gilt}"
    textColor: "#1A1008"
  field:
    backgroundColor: "{colors.char-2}"
    textColor: "{colors.bone}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
    height: "50px"
  booking-slip:
    backgroundColor: "{colors.slip-paper}"
    textColor: "{colors.slip-ink}"
    rounded: "{rounded.xs}"
    padding: "26px"
  nav-rail:
    backgroundColor: "{colors.street}"
    textColor: "{colors.ash}"
    width: "{spacing.rail}"
---

# Design System: Ninth Coal

## Overview

**Creative North Star: "The Lit Window"**

The system is a cold midnight street with one warm aperture in it. Street surfaces are blue-black; interior surfaces are char brown-black; light, and therefore colour, exists only where the fire is. Gilt is flat signwriter's gold leaf for lettering and rules, coal red is the fire and the one action, and amber appears only inside flame and live status. Everything else is tinted bone and ash on dark.

Density is moderate and unhurried: generous section padding, hairline gilt rules between list rows, and a menu set like a painted price board with dotted leaders. The two faces split the work: a sturdy old-style serif for names, prices and headings, a warm humanist sans for reading and controls. All art is authored (inline SVG and one canvas fire); no rasters ship.

The build departs from the direction contract in one place: the contract asks for "gilt caps" on the glass, and the shipped window lettering uses the serif with wide tracking rather than a separate capital face. Uppercase appears only in the desktop rail, label text and slip row names.

**Key Characteristics:**
- Two grounds: cold street (`street` family) for entry, home hero, footer and visit; warm char (`char` family) for interior content.
- Coal red is reserved for the primary action and fire; gilt carries everything typographic and structural.
- Flat planes, hairline gilt rules (`rgba(221,174,78,.22)`), no decorative gradients beyond the street-to-char handoff and the window's spill of warm light.
- Dotted leaders tie names to prices and days to hours.
- One live dithered fire is the brightest thing on the page.

## Colors

A two-temperature palette: a cold blue-black street, a warm brown-black room, and a small set of fire-derived accents.

### Primary
- **Coal Red** (`colors.coal`): the primary action, the current-page mark on the rail and dock action, list bullets in access lists, scrollbar thumb. Hover and pressed shift to **Banked Coal** (`colors.coal-hi`).

### Secondary
- **Gilt** (`colors.gilt`): wordmark, prices, times, ghost button and link colour, selected chip fill, hairline accents. **Dim Gilt** (`colors.gilt-dim`) is for diet-marker outlines and quiet map labels.

### Tertiary
- **Flame** (`colors.flame`): focus ring, caret, open-status dot and glow, dish wait times, "today" marker. Never a fill for large areas.

### Neutral
- **Street Black / Street 2 / Street 3** (`colors.street`, `street-2`, `street-3`): cold grounds; page for home and visit, rail, bars, footer; street-3 marks today's row in hours.
- **Char / Char 2 / Char 3** (`colors.char`, `char-2`, `char-3`): warm interior grounds; char is the default body ground, char-2 for the room section, bands and inputs.
- **Bone** (`colors.bone`): primary text on dark.
- **Ash** (`colors.ash`): secondary text, descriptions, inactive nav.
- **Slip Paper / Slip Ink** (`colors.slip-paper`, `slip-ink`): the only light surface, used only for the booking slip.
- **Error Edge / Error Text** (`colors.error-edge`, `error-text`): invalid field border and message.
- Fire ramp (canvas only, in `src/fire.ts`): `#721D0F`, `#C2371F`, `#FF7A1F`, `#FFC24A`, `#FFF0C0`.

### Named Rules
**The Only-Where-The-Fire-Is Rule.** Warm light and saturated colour appear only at the fire, the window, the primary action and live status. Surrounding surfaces stay dark and low-chroma.

**The Flat Gold Rule.** Gilt is a flat fill or a hairline, never a gradient or metallic effect.

## Typography

**Display Font:** Young Serif (with Georgia, serif)
**Body Font:** Hanken Grotesk Variable (with system-ui, sans-serif)

**Character:** A sturdy, slightly old-fashioned serif for things that are named or priced, against a warm, plain sans for everything you read or press. Both self-hosted via Fontsource.

### Hierarchy
- **Display** (400, clamp 2.5rem to 4.25rem, 1.08): page h1 in bands; capped at 14ch.
- **Headline** (400, clamp 1.75rem to 2.75rem, 1.08): section h2; capped at 16ch on home.
- **Title** (400, 1.25rem, 1.08): h3, form legends and field labels, FAQ summaries (1.125rem), dish names (1.1875rem).
- **Body** (400, 1.0625rem, 1.6): running text, max 62ch; secondary copy in Ash at .875 to .9375rem; lede 1.1875rem at 46ch.
- **Label** (600, .875rem, .08em, uppercase): definition terms, diet markers (.6875rem, 700), slip row names, desktop rail links (serif, .9375rem, .14em).
- **Numerals:** prices and times use the serif with tabular figures (times at 2rem, prices at 1.125rem).

### Named Rules
**The Serif-Names-And-Numbers Rule.** Anything the visitor reads as a name, a heading, a time or a price is serif; anything they read as a sentence or press is sans.

## Layout

Fixed chrome, scrolling content. Desktop (1024px and up) uses a 96px left rail with vertical serif nav and open/closed status, and content is offset by the rail width. Below that, a 56px top bar (wordmark plus status pill) and a bottom dock (Menu, Reserve, Visit; Reserve takes the wider middle cell) replace it, so the way in is always one thumb away.

Horizontal gutter is fluid (`clamp(20px, 5vw, 72px)`); sections pad vertically `clamp(64px, 9vw, 120px)`. Content columns cap at 560px for forms, 820 to 1100px for lists and menu. The home hero is a two-column grid (window, then copy) at full viewport height on desktop and a stacked single column on mobile. The menu uses a 15rem sticky group-heading column beside the dishes at 900px and up; reserve pairs a 560px form with a 360px sticky slip. Rhythm steps are roughly 8, 16, 28, 44 px between related items, groups, blocks and sections. Breakpoints are 900px and 1024px.

## Elevation & Depth

Mostly flat and tonal: depth comes from ground changes (street to char), hairline gilt rules, and the warm glow around the lit window (a soft drop-shadow tied to fire intensity). Translucent bars (top bar, dock, sticky filters) use a 10px backdrop blur over near-opaque ground.

### Shadow Vocabulary
- **Button lift** (`box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 8px 18px rgba(0,0,0,.4)`): primary button at rest; lifts to 12px/24px on hover, settles on press.
- **Open glow** (`box-shadow: 0 0 10px 1px rgba(255,154,46,.7)`): the open-status dot only.
- **Field focus ring** (`0 0 0 3px rgba(221,174,78,.25)`): focused text inputs, with a gilt border.
- **Window glow** (`filter: drop-shadow(0 0 40px rgba(255,130,40,.25 x fire))`): the lit window only.

### Named Rules
**The Light-Is-Earned Rule.** A glow is allowed only around something that is literally lit (window, open dot, focused field). No ambient glows on cards or headings.

## Shapes

Mostly square-ish and quiet, with two distinctive forms. Primary and ghost buttons are a doorway: 18px top corners, 4px bottom corners; the desktop rail action inverts this (4px top, 18px bottom). Chips, status pill and diet markers are full pills. Inputs are 8px, map frame and slip 4px. The window is an arched aperture with flat silhouettes inside. The slip has a torn zigzag bottom edge via clip-path. Hairlines are 1px gilt at 22% alpha; interactive outlines are 1.5px.

## Components

### Buttons
- **Shape:** doorway (18px / 18px / 4px / 4px), 52px tall, 28px side padding, 600 weight sans, .02em tracking.
- **Primary:** Coal Red fill, Bone text, top inner highlight. Hover to Banked Coal and lifts 2px; press sinks 1px.
- **Ghost:** transparent, 1.5px gilt border and text; hover tints gilt 12%.
- **Text link ("go"):** gilt, 600, hairline underline, trailing arrow glyph drawn as inline SVG that nudges 5px right on hover.

### Chips
- **Style:** 44px pills, 1.5px hairline border, Bone text. Hover borders in gilt.
- **State:** selected (aria-pressed or checked radio) fills gilt with near-black text; disabled is 40% opacity and struck through (chips) so state never depends on colour alone. Used for menu filters and reserve night, seat and time choices.

### Cards / Containers
There are no cards. Content sits directly on grounds, separated by hairline top rules (list rows, facts, FAQ). Vignettes in the room section are bare SVG with captions, staggered vertically at 900px and up.

### Inputs / Fields
- **Style:** Char 2 fill, 1.5px hairline border, 8px radius, 50px min-height, serif 1.25rem label above.
- **Focus:** border to gilt plus 3px gilt halo; flame caret.
- **Error:** border Error Edge, message in Error Text below.

### Navigation
Desktop rail: vertical serif caps rotated to read bottom-to-top, Ash by default, Bone on hover, Gilt with a 2px coal edge when current; the Reserve link is a coal-filled inverted doorway. Mobile: top bar (gilt wordmark, status pill) and a 3-cell dock with 22px line icons (1.6 stroke), current in gilt, Reserve as a coal doorway. Skip link appears on focus.

### Status
A 9px dot plus text. Open: flame dot with glow; dark: gilt dot; else Ash.

### Booking Slip (signature)
A cream receipt with a torn bottom edge, dashed header rule, tabular serif values and small-caps row names. It mirrors the form live and is the only light surface in the system.

### Menu Row (signature)
Serif dish name, dotted gilt leader, serif gilt price, Ash description beneath, outlined diet markers with letters, flame wait time.

### Fire
A 2D canvas dithered fire (Bayer-quantised five-step ember ramp, about 24fps, paused offscreen). Reacts to pointer and a keyboard "stoke" control; under reduced motion it renders one static frame.

## Do's and Don'ts

### Do:
- **Do** keep two grounds: `street` for entry, hero, footer and visit; `char` for interior content, meeting with a `linear-gradient` handoff.
- **Do** reserve Coal Red for the primary action and fire; use Gilt for type, prices and rules.
- **Do** set names, headings, times and prices in Young Serif and everything else in Hanken Grotesk.
- **Do** separate rows with 1px gilt hairlines at 22% alpha rather than boxes.
- **Do** use the 2px Flame focus ring with 3px offset on every interactive element, and a static-fire reduced-motion fallback.
- **Do** keep touch targets at least 44px (chips), 48px (stepper), 52px (buttons, dock).
- **Do** pair any state colour with a second signal (strike-through, letter marker, text, aria state).

### Don't:
- **Don't** add photography or raster art; authored SVG, CSS and canvas only.
- **Don't** use Flame or glows on surfaces that are not lit.
- **Don't** put gradients on gilt or use gilt as a large fill other than the selected chip.
- **Don't** introduce a third typeface or a capitals display face.
- **Don't** wrap content in rounded card boxes.

### Not canonized
The booking slip's hard offset shadow (`6px 8px 0`) is a craft-floor defect the build carries. It is not a system shadow and must not be reused.

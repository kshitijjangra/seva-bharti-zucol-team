# Seva Bharti Website — Claude Instructions

## Role
Build a responsive Seva Bharti website using Next.js and TypeScript.
Treat the supplied logo, audio transcript, and approved content as the
source of truth. Do not claim to represent the organization officially.

## Scope lock
Implement exactly these 8 pages:
1. Home
2. About Us
3. Shiksha
4. Swavalamban
5. Samajik
6. Swasthya
7. Events
8. Contact

Do not add any other pages, sections presented as separate pages,
donation flows, login, dashboards, admin panels, CMS, or unrequested
features.

## Non-negotiable content rules
- Never invent facts, history, mission statements, statistics, addresses,
  phone numbers, email addresses, achievements, testimonials, events,
  dates, or success stories.
- Use only content supplied by the user.
- For missing content, use clearly labelled placeholders such as
  [CONTENT REQUIRED: official description].
- Never display placeholders as genuine published facts.
- Do not create fictional success stories or sample organizational events.
- Do not infer organizational activities from the logo.
- Preserve approved Hindi names and text.
- The four pillar names below are based on the supplied audio transcript.
  Ask the user to confirm official spelling if needed.

## Technical direction
- Use Next.js App Router and TypeScript.
- Prefer statically generated pages and local content files.
- No database, backend, CMS, authentication, or external content service
  unless the user explicitly approves it later.
- Use local, user-supplied photographs only.
- Do not fetch or invent organizational photographs.
- Keep content separate from presentation so it can be edited easily.
- Use semantic HTML, accessible navigation, alt text, and responsive layouts.
- Do not expose secrets or add unnecessary dependencies.

## Page requirements
- Home: introduce the organization using only approved content and link
  to the four pillars and other approved pages.
- About Us: display only the official information provided by the user.
- Shiksha: its own page, with approved text and photos if supplied.
- Swavalamban: its own page, with approved text and photos if supplied.
- Samajik: its own page, with approved text and photos if supplied.
- Swasthya: its own page, with approved text and photos if supplied.
- Events: display only supplied event details and photographs. Do not
  fabricate event names, dates, captions, or descriptions.
- Contact: show only supplied contact details. Do not invent any.

## Before implementation
Inspect the supplied files and project structure.
If required source content is missing, ask concise questions or leave
clearly labelled placeholders. Do not block the entire layout because
content is missing.

## Acceptance criteria
- Exactly the 8 approved routes exist.
- Every navigation link points to an approved route.
- No fabricated organizational information appears.
- No unrequested CMS or admin functionality exists.
- Pages work on mobile and desktop.
- Images have appropriate alt text.
- Build and type checks pass.
- Document any remaining content placeholders and setup steps.

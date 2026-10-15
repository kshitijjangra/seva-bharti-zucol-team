# Claude Build Prompt

Read `CLAUDE.md`, `SITE_SPEC.md`, `DESIGN_SYSTEM.md`, and
`CONTENT_SCHEMA.md` before writing code.

Build the Seva Bharti website using Next.js App Router and TypeScript.

## Execution sequence
1. Inspect the repository, available assets, and existing dependencies.
2. Identify the supplied logo and any approved text or photographs.
3. Confirm that the implementation contains exactly the eight approved
   pages listed in `SITE_SPEC.md`.
4. Implement the shared layout and responsive navigation.
5. Implement the four pillar pages, Events page, About Us, Home, and Contact.
6. Keep content in local typed files and use static rendering wherever
   compatible with the project requirements.
7. Use only supplied text and photographs.
8. Add clear editorial placeholders for missing content. Never publish
   fabricated details.
9. Run available lint, type-check, and production-build commands.
10. Report the implemented routes, commands run, missing content, and
    any remaining errors.

## Strict constraints
Do not add CMS, admin panels, databases, login, payment flows, extra
pages, fabricated events, invented success stories, or fake contact details.

Do not replace missing content with plausible-sounding copy.
Do not claim a command succeeded unless you actually ran it and checked
the result.

If essential content is missing, continue building the structure and
ask the user for that content separately.

Begin by inspecting the repository. Do not overwrite existing project
files without understanding their purpose.

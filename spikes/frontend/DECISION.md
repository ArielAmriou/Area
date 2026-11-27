# [Spike][Front] Web client stack selection — Decision

> This spike settles **the whole front-end stack** (every layer) and ends with **a decision**, not production code. The POC is limited to **2 hours**.
> Each evaluated technology has its own sheet, made from [TEMPLATE.md](TEMPLATE.md), in `technos/`.
> This document feeds the Milestone 1 deliverable: the front-end *technology selection document* (several technologies evaluated against relevant criteria **including security**, documented comparison, concise and justified final choice, practical evidence such as exploratory code).

---

## 0. Metadata

| Field            | Value                                               |
| ---------------- | --------------------------------------------------- |
| Owner            | @...                                                |
| POC timebox      | **2h**                                              |
| Date             | `YYYY-MM-DD`, from `HH:MM` to `HH:MM`               |
| Status           | To do / In progress / Done (keep the right one)     |
| Issue / ticket   | #...                                                |

---

## 1. Question

**Which technical stack should we use for the AREA web client, layer by layer?**

---

## 2. Context

### 2.1 Specifications requirements that constrain the web front-end

> Source: `docs/specifications/area-project.pdf`. Check the ones the choice must specifically address.

- [ ] **Presentation only**: business logic and rules live on the server; the client only displays and interacts.
- [ ] **OpenAPI contract**: the server serves an OpenAPI description of its API (with a browsable interface), which is the contract between clients and server, error responses included.
- [ ] **Full-stack frameworks strongly discouraged**: a single codebase blurs the client / server boundary and makes splitting work between members harder.
- [ ] **Common browsers** supported.
- [ ] **WCAG level AA** + a committed **accessibility audit report** (what was measured, with which tool, on which screens, what was fixed or left unfixed and why).
- [ ] **At least 2 languages** on the whole main flow, from sign-up to the creation of an AREA.
- [ ] **Responsive, visually consistent, intuitive** (expected at Final).
- [ ] **Authentication**: local account (username / password) with account confirmation, sign-in through an external provider using **OIDC**, subscription to third-party services through their authorization mechanism (commonly **OAuth 2.0**).
- [ ] **Web-only workflow builder**: editing nodes (trigger, condition with 2 branches, at least 4 reactions) and data mapping between nodes (`{{ trigger.subject }}`, `{{ node_2.file_id }}`). Free form but **justified**: canvas, list of steps, wizard…
- [ ] **Service discovery**: the catalogue (services, actions, reactions, parameters) is read from a server endpoint, **never hard-coded** in the client.
- [ ] **Docker Compose**: the whole product builds and runs reproducibly; the web client must be reachable locally (container layout is up to the group).
- [ ] **CI**: lint, tests and build on every contribution, with failures visible on the contribution.

### 2.2 Selected additional features that affect the web client

> Keep only the ones selected by the group.

- [ ] AI-REVIEW: list of pending reviews and approve / reject from the web
- [ ] ENG-ADMIN: administration area
- [ ] ENG-TEMPLATES: export / import of AREAs from the web
- [ ] SEC-AUTH: authentication hardening (replayed callbacks, etc.)
- [ ] SEC-DEPS: dependency scanning of both clients
- [ ] SEC-GDPR: user data export from the web
- [ ] SYS-OBS: execution / metrics views in the web client
- [ ] Other: ...

### 2.3 Team

- **Technologies already known:** ...
- **What we don't know:** ...

---

## 3. Out of scope

- Actual feature implementation
- Design / mock-ups
- Mobile client (separate template)
- ...

---

## 4. Layers and evaluation level

> We don't test everything in the 2-hour POC:
> - **POC**: 2-3 structuring layers, hard to change later or specific to these specifications. One sheet per candidate, with exploratory code.
> - **Docs**: secondary layers, compared from documentation. One short sheet per candidate, or just the row below.
> - **Default**: tooling, default choice without comparison, simply justified.

| Layer                          | Candidates (suggested)                                                    | Level  | Sheets | Selected | Why (1 sentence) | Why not the others |
| ------------------------------ | ------------------------------------------------------------------------- | ------ | ------ | -------- | ---------------- | ------------------ |
| UI framework + language        | React, Vue, Svelte, Angular (TypeScript)                                  | POC    |        |          |                  |                    |
| Workflow builder               | React Flow / Vue Flow / Svelte Flow (canvas), hand-made list of steps, wizard | POC |       |          |                  |                    |
| API client (from OpenAPI)      | openapi-typescript + openapi-fetch, Orval, OpenAPI Generator              | POC / Docs |    |          |                  |                    |
| Build / dev server             | Vite (SPA), Angular CLI — warning: Next.js / Nuxt / SvelteKit = full-stack, discouraged | Docs |  |      |                  |                    |
| Auth (OIDC + OAuth2 services)  | Server-driven flow + httpOnly cookie, oidc-client-ts on the client        | Docs   |        |          |                  |                    |
| UI kit / CSS                   | Tailwind + shadcn/ui (Radix), MUI, Mantine, Chakra                        | Docs   |        |          |                  |                    |
| Dynamic forms                  | React Hook Form, TanStack Form, JSON Forms + Zod / Yup                    | Docs   |        |          |                  |                    |
| Data fetching / cache          | TanStack Query, SWR, hand-made `fetch`                                    | Docs   |        |          |                  |                    |
| Routing                        | React Router, TanStack Router, Vue Router                                 | Docs   |        |          |                  |                    |
| Global state                   | Context, Zustand, Redux Toolkit, Pinia, none                              | Docs   |        |          |                  |                    |
| i18n                           | react-i18next, FormatJS, Lingui, vue-i18n                                 | Docs   |        |          |                  |                    |
| Accessibility audit            | axe-core, Lighthouse, Pa11y                                               | Default |       |          |                  |                    |
| Tests                          | Vitest + Testing Library, Playwright                                      | Default |       |          |                  |                    |
| Lint / format                  | ESLint + Prettier, Biome                                                  | Default |       |          |                  |                    |
| Dependency scanning            | npm audit, Dependabot, OSV-Scanner                                        | Default |       |          |                  |                    |
| Production server (Docker)     | nginx, Caddy                                                              | Default |       |          |                  |                    |

---

## 5. Comparison

### 5.1 Criteria weights

> The specifications require relevant criteria **including security**. Weights from 1 to 3, used in the sheets.

| Criterion                       | Weight |
| ------------------------------- | ------ |
| Security                        |        |
| Client / server separation      |        |
| Accessibility                   |        |
| i18n                            |        |
| Fit for the builder             |        |
| OpenAPI contract                |        |
| Team familiarity                |        |
| Docker build                    |        |
| Maturity / community / docs     |        |

### 5.2 Grid for structuring layers

> One grid per "POC" layer. Copy the scores from the sheets × weights.

**Layer: ...**

| Criterion (weight) | Candidate A | Candidate B | Candidate C |
| ------------------ | ----------- | ----------- | ----------- |
| Security ( )       |             |             |             |
| ...                |             |             |             |
| **Total**          |             |             |             |

---

## 6. Acceptance criteria

- [ ] Every layer in §4 has a selected technology (or "none", justified)
- [ ] "POC" layers have one sheet per candidate and a grid (§5.2)
- [ ] Security is one of the criteria in every sheet
- [ ] At least one POC proves the risky points in practice
- [ ] Remaining risks and unknowns are listed
- [ ] Follow-up tickets are created and linked
- [ ] Results shared with the team (daily / meeting / PR of this file)

---

## 7. Log

> Write as you go, **including dead ends** (material for the post-mortem).

| Time | What was tried | Result / dead end |
| ---- | -------------- | ----------------- |
|      |                |                   |

---

## 8. Results

### 8.1 Summary (3-5 lines)

...

### 8.2 Selected stack

| Layer | Technology | Version |
| ----- | ---------- | ------- |
|       |            |         |

### 8.3 Remaining risks and unknowns

- ...

### 8.4 Decision

> **Approved by:** @... on `YYYY-MM-DD`

A decision can be revised later if evidence invalidates it: document the change, its reason and its consequences.

### 8.5 Next steps

- [ ] Write / update the front-end technology selection document (Milestone 1)
- [ ] Initialise the web client with the selected stack (config, lint, Dockerfile, CI)
- [ ] Create the implementation tickets
- [ ] Delete or archive the POC code

---

## Reminders

- **2-hour POC, no more.**
- **No gold-plating**: the POC is throwaway, the decision is the deliverable.
- **No decision = failed spike.**
- **Everything must be demonstrable**: the evaluator can ask to prove any claim live.

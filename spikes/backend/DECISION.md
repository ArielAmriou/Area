# [Spike][Back] Application server stack selection — Decision

> This spike settles **the back-end stack** (language + framework and the layers around it) and ends with **a decision**, not production code. The POC is limited to **2 hours** per candidate.
> Each evaluated technology has its own sheet, made from [TEMPLATE.md](TEMPLATE.md), in `spikes/backend/<technology>/SPIKE.md`.
> This document feeds the Milestone 1 deliverable: the back-end *technology selection document* (several technologies evaluated against relevant criteria **including security**, documented comparison, concise and justified final choice, practical evidence such as exploratory code).

---

## 0. Metadata

| Field            | Value                                               |
| ---------------- | --------------------------------------------------- |
| Owner            | @...                                                |
| POC timebox      | **2h** per candidate                                |
| Date             | `YYYY-MM-DD`, from `HH:MM` to `HH:MM`               |
| Status           | To do / In progress / Done (keep the right one)     |
| Issue / ticket   | #...                                                |

---

## 1. Question

**Which language and framework should we use for the AREA application server?**

---

## 2. POC objectives

Every candidate implements the **same three things**, so the comparison is fair:

| # | Objective                  | What it must do                                                                                     |
| - | -------------------------- | --------------------------------------------------------------------------------------------------- |
| 1 | **Health route**           | `GET /health` returns a 200 with a small JSON body.                                                 |
| 2 | **External API call**      | A route calls a public third-party API (e.g. Open-Meteo), and returns part of its response.         |
| 3 | **Login (no database)**    | Username / password checked against an in-memory user list, returns a token; a protected route reads it. |

Out of the POC: database, real OAuth2 / OIDC providers, workflow engine, Docker.

---

## 3. Context

### 3.1 Specifications requirements that constrain the server

> Source: `docs/specifications/area-project.pdf`. Check the ones the choice must specifically address.

- [ ] **Business logic on the server**: clients only handle presentation; rules live in the application server.
- [ ] **OpenAPI contract**: the server serves an OpenAPI description of its HTTP API **with a browsable interface**; it is the contract between clients and server. Tests must prove the description matches the implementation.
- [ ] **Authentication**: local account (username / password) with account confirmation, sign-in through an external provider using **OIDC**.
- [ ] **Delegated access**: subscription to third-party services through their authorization mechanism (commonly **OAuth 2.0**), with stored credentials for unattended actions.
- [ ] **Workflow engine**: trigger node, optional condition with 2 branches, reactions (at least 4 in the demo); structural validity checked on save; **hooks run autonomously**.
- [ ] **Service discovery**: a machine-readable endpoint describing Services, Actions and REActions (ids, descriptions, parameters), documented and versionable.
- [ ] **Many outbound HTTP calls** to third-party services (polling, webhooks, reactions).
- [ ] **Docker Compose**: the whole product builds and runs reproducibly.
- [ ] **CI**: lint, tests and build on every contribution, deploy without manual steps.
- [ ] **Tests**: unit and functional tests on important success and failure paths.

### 3.2 Selected additional features that affect the server

> Keep only the ones selected by the group.

- [ ] SYS-HEALTH: health checks
- [ ] ENG-ASYNC: asynchronous execution
- [ ] ENG-RETRY: retries and idempotency
- [ ] ENG-EXT: extensible connectors
- [ ] SEC-AUTH: authentication hardening
- [ ] SEC-SSRF: SSRF protection
- [ ] SEC-CRYPTO: encryption at rest
- [ ] SEC-DEPS: dependency scanning
- [ ] SYS-OBS: observability
- [ ] Other: ...

### 3.3 Team

- **Technologies already known:** ...
- **What we don't know:** ...

---

## 4. Layers and evaluation level

> - **POC**: language + framework, evaluated with the three objectives of §2. One sheet per candidate.
> - **Docs**: secondary layers, compared from documentation.
> - **Default**: tooling, default choice without comparison, simply justified.

| Layer                          | Candidates (suggested)                                         | Level   | Sheets | Selected | Why (1 sentence) | Why not the others |
| ------------------------------ | -------------------------------------------------------------- | ------- | ------ | -------- | ---------------- | ------------------ |
| Language + web framework       | Python / FastAPI, Node / NestJS, Node / Express, Go / Gin, ... | POC     |  |  |       |                    |
| OpenAPI generation             | Built-in (FastAPI), decorators (NestJS), swaggo, hand-written  | POC     |        |          |                  |                    |
| Auth (local + OIDC + OAuth2)   | Framework security utils, Authlib, Passport, ...               | POC / Docs |     |          |                  |                    |
| HTTP client (external APIs)    | httpx, axios / fetch, net/http                                 | POC     |        |          |                  |                    |
| Background jobs / scheduler    | Celery, ARQ, APScheduler, BullMQ, ...                          | Docs    |        |          |                  |                    |
| Validation / schemas           | Pydantic, Zod, class-validator, ...                            | Docs    |        |          |                  |                    |
| Tests                          | pytest, Jest / Vitest, go test                                 | Default |        |          |                  |                    |
| Lint / format                  | Ruff, ESLint + Prettier, golangci-lint                         | Default |        |          |                  |                    |
| Dependency scanning            | pip-audit, npm audit, Dependabot, OSV-Scanner                  | Default |        |          |                  |                    |
| Production server (Docker)     | Uvicorn / Gunicorn, Node, static binary                        | Default |        |          |                  |                    |

---

## 5. Comparison

### 5.1 Criteria weights

> The specifications require relevant criteria **including security**. Weights from 1 to 3, used in the sheets.

| Criterion                       | Weight |
| ------------------------------- | ------ |
| Security                        |        |
| OpenAPI / Swagger support       |        |
| Authentication support          |        |
| External API calls (async)      |        |
| Ease of writing routes          |        |
| Team familiarity                |        |

### 5.2 Grid

> Copy the scores from the sheets × weights.

**Layer: Language + web framework**

| Criterion (weight)            | Candidate A | Candidate B | Candidate C |
| ----------------------------- | ------- | ----------- | ----------- |
| Security ( )                  |         |             |             |
| OpenAPI / Swagger support ( ) |         |             |             |
| ...                           |         |             |             |
| **Total**                     |         |             |             |

---

## 6. Acceptance criteria

- [ ] Every candidate implements the three objectives of §2 (health, external API call, login without DB)
- [ ] Every layer in §5 has a selected technology (or "none", justified)
- [ ] One sheet per POC candidate and a filled grid (§6.2)
- [ ] Security is one of the criteria in every sheet
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

- [ ] Write / update the back-end technology selection document (Milestone 1)
- [ ] Initialise the server with the selected stack (config, lint, Dockerfile, CI)
- [ ] Create the implementation tickets
- [ ] Delete or archive the POC code

---

## Reminders

- **2-hour POC per candidate, no more.**
- **No gold-plating**: the POC is throwaway, the decision is the deliverable.
- **No decision = failed spike.**
- **Everything must be demonstrable**: the evaluator can ask to prove any claim live.

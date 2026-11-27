# <Technology> — Back-end spike

> Recap sheet for **one** technology evaluated during the back-end spike.
> Copy this file to `spikes/backend/<technology>/SPIKE.md` (e.g. `fastApi/SPIKE.md`), next to the POC code, one sheet per candidate.
> The comparison and final choice are made in [DECISION.md](DECISION.md).

---

## Identity

| Field               | Value                                        |
| ------------------- | -------------------------------------------- |
| Technology          | (e.g. FastAPI, NestJS, Gin…)                 |
| Language            | (e.g. Python, TypeScript, Go…)               |
| Evaluated by        | @...                                         |
| Date                | `YYYY-MM-DD`                                 |
| Time spent          | 2h                                           |

---

## Overview

> What it is, and why we are considering it for AREA.

...

---

## POC objectives

> The three objectives defined in [DECISION.md](DECISION.md#2-poc-objectives).
> Result: keep only one word among **OK** (done easily), **With effort** (done, but required extra work) or **Blocking** (could not be done).

### 1. Health route

- **Goal:** `GET /health` returns a 200 with a small JSON body.
- **How it was done:** ...
- **Result:** OK / With effort / Blocking

### 2. External API call

- **Goal:** a route calls a public third-party API and returns part of its response.
- **How it was done:** (HTTP client used, sync / async, error handling…)
- **Result:** OK / With effort / Blocking

### 3. Login (no database)

- **Goal:** username / password checked against an in-memory user list, returns a token; a protected route reads it.
- **How it was done:** (built-in security utils or external library, token format…)
- **Result:** OK / With effort / Blocking

---

## Fit with the specifications

> Remove the points that do not apply. Same result scale as above.

### 1. OpenAPI description + browsable interface

- **Specifications:** the server serves an OpenAPI description of its HTTP API with a browsable interface; it is the contract with the clients.
- **Question:** is the description generated from the code, and is a Swagger / Redoc UI available out of the box?
- **Answer:** ...  **Result:** OK / With effort / Blocking

### 2. Authentication (local, OIDC) and delegated access (OAuth2)

- **Specifications:** local accounts with confirmation, sign-in with an external OIDC provider, OAuth2 access to third-party services.
- **Question:** what does the framework provide, and what library would we add?
- **Answer:** ...  **Result:** OK / With effort / Blocking

### 3. Outbound calls to third-party services

- **Specifications:** the engine calls many external APIs (actions, reactions).
- **Question:** is there a good (async) HTTP client, and is concurrency handled well?
- **Answer:** ...  **Result:** OK / With effort / Blocking

---

## Security

> Mandatory (criterion explicitly required by the specifications).

- Input validation by default:
- Auth / token handling (hashing, JWT, expiry):
- Known vulnerabilities (CVE, `pip-audit` / `npm audit`), patch responsiveness:
- Added attack surface (transitive dependencies):

---

## Scores

> From 1 to 5. Weights are defined in [DECISION.md](DECISION.md).

| Criterion                       | Score | Comment |
| ------------------------------- | ----- | ------- |
| Security                        |       |         |
| OpenAPI / Swagger support       |       |         |
| Authentication support          |       |         |
| External API calls (async)      |       |         |
| Ease of writing routes          |       |         |
| Team familiarity                |       |         |
| Docker build                    |       |         |
| Tests / CI tooling              |       |         |
| Maturity / community / docs     |       |         |

---

## Strengths / weaknesses

| Strengths | Weaknesses |
| --------- | ---------- |
|           |            |

---

## POC

- **Code:** `spikes/backend/<technology>/`
- **How to run:**
- **Dead ends encountered:**

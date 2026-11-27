# FastAPI — Back-end spike

> Recap sheet for FastAPI, made from [TEMPLATE.md](../TEMPLATE.md).
> The comparison and final choice are made in [DECISION.md](../DECISION.md).

---

## Identity

| Field               | Value                                        |
| ------------------- | -------------------------------------------- |
| Technology          | FastAPI (+ Uvicorn, httpx)                   |
| Language            | Python                                       |
| Evaluated by        | Pierrick Simon |
| Date                | `2026-11-27`                                 |
| Time spent          | 1h30                                         |

---

## Overview

FastAPI is a Python web framework for building HTTP APIs, built on Starlette and Pydantic. It is async, uses Python type hints for validation, and generates the OpenAPI description from the code. We are considering it for AREA because the specifications require a served OpenAPI description with a browsable interface, and FastAPI gives us that out of the box.

**The documentation is good.** The official docs are tutorial-style, with runnable examples for each feature (routes, dependencies, security). The login part of this POC follows the docs almost line by line.

---

## POC objectives

### 1. Health route

- **Goal:** `GET /health` returns a 200 with a small JSON body.
- **How it was done:** one `@app.get("/health")` function returning a dict, which FastAPI serialises to JSON ([health.py](src/health.py)).
- **Result:** OK

### 2. External API call

- **Goal:** a route calls a public third-party API and returns part of its response.
- **How it was done:** `GET /weather/{latitude}-{longitude}` calls the Open-Meteo API with `httpx.AsyncClient` and returns the `current` field ([externalapi.py](src/externalapi.py)). The route is `async`, so the server is not blocked while it waits for the external API.
- **Result:** OK

### 3. Login (no database)

- **Goal:** username / password checked against an in-memory user list, returns a token; a protected route reads it.
- **How it was done:** FastAPI handles bearer authentication itself, so no external library is needed ([login.py](src/login.py)):
  - `POST /token` reads the form with `OAuth2PasswordRequestForm`, checks it against a fake in-memory user dict and returns `{"access_token", "token_type": "bearer"}`;
  - `OAuth2PasswordBearer` extracts the bearer token from the `Authorization` header;
  - `GET /users/me` is protected with `Depends(get_current_active_user)` and returns 401 without a valid token, 400 for a disabled user.
- **Result:** OK

---

## Fit with the specifications

### 1. OpenAPI description + browsable interface

- **Specifications:** the server serves an OpenAPI description of its HTTP API with a browsable interface; it is the contract with the clients.
- **Question:** is the description generated from the code, and is a Swagger / Redoc UI available out of the box?
- **Answer:** yes. FastAPI serves `/openapi.json`, a Swagger UI at `/docs` and Redoc at `/redoc` with no configuration. Every route is documented automatically from its signature, which makes the routes easy to read and try for a user or a dev. The Swagger UI also has an "Authorize" button that works with the bearer login. **Result:** OK

### 2. Authentication (local, OIDC) and delegated access (OAuth2)

- **Specifications:** local accounts with confirmation, sign-in with an external OIDC provider, OAuth2 access to third-party services.
- **Question:** what does the framework provide, and what library would we add?
- **Answer:** local login with a bearer token is built in (`fastapi.security`), so it is easy to handle connections without an external library. OIDC sign-in and OAuth2 access to third-party services are not provided; we would need a library such as Authlib. **Result:** OK for local login, With effort for OIDC / OAuth2

### 3. Outbound calls to third-party services

- **Specifications:** the engine calls many external APIs (actions, reactions).
- **Question:** is there a good (async) HTTP client, and is concurrency handled well?
- **Answer:** yes. `httpx` has an async client that fits FastAPI's async routes. **Result:** OK

---

## Security

- **Input validation by default:** Pydantic validates typed parameters and bodies and returns 422 on invalid input. In the POC, the `/weather` parameters are not typed, so they are not validated yet.
- **Auth / token handling:** bearer extraction and 401 responses are built in. **The POC token is the username itself and passwords are stored in plain text**: this is only acceptable without a database. Production needs hashed passwords (e.g. Argon2 / bcrypt) and signed JWTs with an expiry, as shown in the FastAPI docs.
- **Known vulnerabilities:** to check with `pip-audit` on the selected versions.
- **Added attack surface:** small: `fastapi`, `uvicorn`, `httpx`, `python-multipart` and their dependencies (Starlette, Pydantic).

---

## Scores

> From 1 to 5. Weights are defined in [DECISION.md](../DECISION.md).

| Criterion                       | Score | Comment |
| ------------------------------- | ----- | ------- |
| Security                        | 4 | Validation by default; hashing / JWT to add ourselves |
| OpenAPI / Swagger support       | 5 | Generated from the code, Swagger UI at `/docs` built in |
| Authentication support          | 3 | Bearer built in; OIDC / OAuth2 need a library |
| External API calls (async)      | 5 | Async routes + httpx |
| Ease of writing routes          | 4 | One decorator per route; every route file must be imported |
| Team familiarity                | 2 | One out the four dev had already used it |

---

## Strengths / weaknesses

| Strengths | Weaknesses |
| --------- | ---------- |
| Well documented, with examples for each feature | Every route file must be imported in `main.py`, or its routes are not registered |
| Bearer authentication handled by FastAPI, no external library | No built-in OIDC / OAuth2 client for third-party services |
| Swagger UI and OpenAPI generated automatically, easy to read for users and devs | No built-in scheduler for autonomous hooks |
| Writing code is easy: create an `app`, then one `@app.get` / `@app.post` per route | |
| Async routes and async HTTP client (httpx) | |

---

## POC

- **Code:** `spikes/backend/fastApi/`
- **How to run:**

  ```sh
  cd spikes/backend/fastApi

  # build
  python -m venv .venv
  source .venv/bin/activate
  pip install -r requirements.txt
  
  # run
  .venv/bin/python src/main.py
  ```

  Then open <http://127.0.0.1:8000/docs> for the Swagger UI.
- **Routes:** `GET /health`, `GET /weather/{latitude}-{longitude}`, `POST /token`, `GET /users/me`.
- **Dead ends encountered:** routes declared in a file are not registered unless that file is imported. `main.py` imports `health`, `externalapi` and `login` only for this side effect. For the real project, FastAPI's `APIRouter` + `app.include_router()` makes this explicit.

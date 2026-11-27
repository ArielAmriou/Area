# <Technology> — <Layer>

> Recap sheet for **one** technology evaluated during the front-end spike.
> Copy this file to `spikes/frontend/technos/<layer>-<technology>.md` (e.g. `framework-react.md`), one sheet per candidate.
> The comparison and final choice are made in [DECISION.md](DECISION.md).

---

## Identity

| Field               | Value                                        |
| ------------------- | -------------------------------------------- |
| Technology          | (e.g. UI framework, Builder, API client…)    |
| Evaluated by        | @...                                         |
| Date                | `YYYY-MM-DD`                                 |
| Time spent          | 2h                                           |

---

## Overview

> What it is, and why we are considering it for AREA.

...

---

## Fit with the specifications

> For each point: what the specifications require, the question to ask about the technology, and your answer.
> Remove the points that do not apply to this technology (e.g. the builder for an i18n library).
> Result: keep only one word among **OK** (the technology helps meet the need), **With effort** (doable, but requires extra work) or **Blocking** (the technology prevents meeting the need).

### 1. No business logic in the front-end

- **Specifications:** the web client only displays data and sends requests; all business logic lives on the server. "Full-stack" frameworks (front-end and back-end in the same project, like Next.js) are strongly discouraged.
- **Question:** can the technology be used as a pure client, without pushing us to write server code in the front-end?
- **Answer:** ...  **Result:** OK / With effort / Blocking

### 2. Server calls through the OpenAPI description

- **Specifications:** the server publishes an OpenAPI description of its API. It is the contract between the front-end and the back-end.
- **Question:** can API calls be generated or typed automatically from this description?
- **Answer:** ...  **Result:** OK / With effort / Blocking

### 3. Service list received from the server

- **Specifications:** the server provides the list of services, actions, reactions and their parameters. Nothing must be hard-coded in the front-end.
- **Question:** is it easy to display forms generated from JSON received from the server?
- **Answer:** ...  **Result:** OK / With effort / Blocking

### 4. Workflow editor (the "builder")

- **Specifications:** on the web only, the user assembles a workflow: a trigger, optionally a condition with 2 branches, then reactions (at least 4 in the demo). They also pass data from one step to the next, for example `{{ trigger.subject }}`. The form is free (canvas, list of steps, wizard…) but must be justified.
- **Question:** can this editor be built with the technology, and with how much effort (existing library or hand-made)?
- **Answer:** ...  **Result:** OK / With effort / Blocking

### 5. Sign-in

- **Specifications:** three cases to handle on the front-end:
  - sign-up / sign-in with username and password, with account confirmation;
  - sign-in with an external account (e.g. "Sign in with Google", OIDC protocol);
  - granting the app permission to act on a third-party service (e.g. Gmail access, OAuth2 protocol).
- **Question:** how does the technology handle redirects to these providers and session storage?
- **Answer:** ...  **Result:** OK / With effort / Blocking

### 6. Accessibility

- **Specifications:** the site must meet WCAG level AA (contrast, keyboard navigation, screen readers…), and we must deliver an audit report (tool used, screens tested, what was fixed or not).
- **Question:** are components accessible by default, and are there tools to measure accessibility?
- **Answer:** ...  **Result:** OK / With effort / Blocking

### 7. Multiple languages

- **Specifications:** at least 2 languages, from sign-up to the creation of an AREA.
- **Question:** is there a simple, maintained translation solution?
- **Answer:** ...  **Result:** OK / With effort / Blocking

### 8. Browsers and screen sizes

- **Specifications:** the site works on common browsers and adapts to the screen size.
- **Question:** are there any browser compatibility or responsive limitations?
- **Answer:** ...  **Result:** OK / With effort / Blocking

### 9. Running with Docker

- **Specifications:** the whole product is built and run with Docker Compose, and the site must be reachable locally.
- **Question:** how do we build and serve the front-end in a container, and is it simple?
- **Answer:** ...  **Result:** OK / With effort / Blocking

### 10. Automated checks

- **Specifications:** on every contribution, lint, tests and build run automatically (CI).
- **Question:** are there good lint and test tools for this technology?
- **Answer:** ...  **Result:** OK / With effort / Blocking

---

## Security

> Mandatory (criterion explicitly required by the specifications).

- XSS protection by default / escaping:
- Token and cookie handling, CSP compatibility:
- Known vulnerabilities (CVE, `npm audit`), patch responsiveness:
- Added attack surface (transitive dependencies, tree size):

---

## Scores

> From 1 to 5. Weights are defined in [DECISION.md](DECISION.md).

| Criterion                       | Score | Comment |
| ------------------------------- | ----- | ------- |
| Security                        |       |         |
| Client / server separation      |       |         |
| Accessibility                   |       |         |
| i18n                            |       |         |
| Fit for the builder             |       |         |
| OpenAPI contract                |       |         |
| Team familiarity                |       |         |
| Docker build                    |       |         |
| Maturity / community / docs     |       |         |

---

## Strengths / weaknesses

| Strengths | Weaknesses |
| --------- | ---------- |
|           |            |

---

## POC

> Only if evaluated through a POC.

- **What was done:**
- **Code:** `spikes/frontend/poc/<layer>-<technology>/`
- **Measurements:** (bundle size, build time, Docker image size, axe / Lighthouse score…)
- **Dead ends encountered:**

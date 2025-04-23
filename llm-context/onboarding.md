# Onboarding

Welcome to the project! This guide will help you get started, understand the project context, and contribute effectively.

---

## Project Overview

This project aims to deliver a robust, user-friendly tourism platform for Mendoza. The codebase is managed collaboratively, with all planning, requirements, and decisions documented for transparency and traceability.

---

## Folder Structure

- `src/` — Main application source code.
- `public/` — Static assets.
- `llm-context/` — All planning, requirements, decisions, and traceability documentation.

---

## Setup

1. Clone the repository:  
   `git clone <repo-url>`
2. Navigate to the project directory:  
   `cd turisteando_mza`
3. Install dependencies:  
   `npm install`
4. Start the development server:  
   `npm run dev`

---

## Development Workflow

- **Branching:** Create a new branch for each feature or fix, named after the related Jira issue key (e.g., `SCRUM-31-register-view`).
- **Commits:** Reference Jira issue keys in commit messages for traceability.
- **Pull Requests:** Open a PR for review. Link to relevant requirements or decisions using their IDs.
- **Code Review:** All code is reviewed for standards, clarity, and requirement coverage.

---

## Documentation Integration

- **Requirements:** See `llm-context/requirements.md` for all functional and non-functional requirements, each with a unique ID (e.g., FR-1, NFR-2).
- **Decisions:** Major technical/process decisions are logged in `llm-context/decision-log.md`.
- **Risks:** Project risks and mitigations are tracked in `llm-context/risks.md`.
- **Traceability:** The matrix in `llm-context/traceability-matrix.md` maps requirements to code, tests, and Jira issues.
- **Jira Sync:** The latest Jira export (`JiraAllIssues_16-04-25.csv`) is the source of truth for current and planned work.

---

## Coding Standards

- Use functional React components and hooks.
- Follow ESLint rules in `eslint.config.js`.
- Write clear, maintainable, and well-documented code.
- Reference requirements and Jira keys in comments where relevant.

---

## Contribution Guide

1. Review open requirements and issues in Jira and `llm-context/requirements.md`.
2. Select a task or requirement to work on.
3. Follow the workflow above.
4. Update documentation as needed (e.g., if you clarify a requirement or make a new decision).
5. Suggest improvements to this onboarding or any documentation via PR.

---

## Continuous Improvement

- All contributors are encouraged to propose updates to documentation, requirements, or processes.
- Regular review cycles ensure docs and code remain in sync.

---

## Glossary

- **Requirement ID:** Unique identifier for each requirement (e.g., FR-1).
- **Jira Issue Key:** Unique key for each tracked issue (e.g., SCRUM-31).
- **Traceability Matrix:** Document mapping requirements to implementation and tests.

---

_Last updated: 16-Apr-2025_
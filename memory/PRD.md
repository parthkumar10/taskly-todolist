# Taskly — PRD

## Original Problem Statement
Build a clean personal task-management web app called Taskly. One person can quickly create, complete, filter, and delete everyday tasks. Version 1 is intentionally small. Local-only (no accounts, no cloud). Tasks persist across browser refresh via localStorage.

## Architecture
- Frontend-only React app (no backend, no MongoDB used for this feature).
- Single dashboard component: `/app/frontend/src/pages/TasklyApp.jsx`.
- Persistence: browser localStorage, key `taskly_tasks_v1`.
- UI: Tailwind, lucide-react icons, Sonner toasts. Font: Plus Jakarta Sans.

## User Persona
Individual who wants a lightweight personal to-do list without signing up.

## Core Requirements (static)
- Task = { id, title, priority (Low/Medium/High), completed, createdAt }.
- Add / complete / uncomplete / delete tasks; All/Active/Completed filters; active-task counter.
- Rules: no empty tasks, trim spaces, max 100 char title, delete removes from storage, completion persists, filters non-destructive.
- Empty states: no tasks / no active / no completed.
- Completed tasks: strikethrough + sorted to bottom.
- Mobile responsive, no overflow.

## Implemented (2026-06)
- Full task CRUD with localStorage persistence.
- Priority Low/Medium/High (default Medium) with color-coded badges (emerald/amber/rose).
- All/Active/Completed filter tabs (non-destructive).
- Remaining active-task counter + header total count.
- Three empty states.
- Completed strikethrough + auto sort to bottom; secondary sort by priority then recency.
- Sonner toasts on add/delete/empty-error.
- Verified end-to-end by testing agent (11/11 scenarios pass, desktop + mobile).

## Backlog (P1/P2, out of current scope)
- P1: Inline edit task title.
- P1: Persist last-selected priority for rapid entry.
- P2: Due dates, reordering (drag), clear-completed button.
- Explicitly excluded per scope: accounts, cloud sync, AI, collaboration, calendar, payments.

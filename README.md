# Sprint Board Lite – Frontend

A Kanban-style sprint board built with Next.js (App Router), featuring task CRUD, drag-and-drop, filtering, optimistic updates, and offline write queue.
A Kanban-style sprint board built with Next.js (App Router), featuring task CRUD, drag-and-drop, filtering, optimistic updates, and offline write queue..

## Setup

1) Install dependencies
```bash
npm install
```

2) Environment
- Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```
- Create `.env.production`
```bash
NEXT_PUBLIC_API_URL=https://sprint-board-lite-backend.onrender.com
```

3) Run the app
```bash
npm run dev
# http://localhost:3000
```

4) Backend (json-server)
- Backend runs separately
- Endpoints expected:
  - GET /tasks
  - POST /tasks
  - PATCH /tasks/:id
  - DELETE /tasks/:id

## Decisions Taken

- Next.js App Router with client-side pages for simplicity and fast UI iteration.
- API base URL via `NEXT_PUBLIC_API_URL` to cleanly switch dev/prod without code changes.
- Local state with a custom `useTasks` hook to centralize:
  - Fetching, filtering, add/edit/delete, status updates.
  - Optimistic UI updates for snappy UX.
  - Offline queue (persisted in localStorage) with auto-retry on reconnect.
- Drag-and-drop using `motion` for minimal dependencies and smooth interactions.
- Filtering lifted to board level to avoid duplicate hook instances and ensure board renders from `filteredTasks`.

## Variant

- UI/UX variant: “Sprint Board Lite”
  - 3 columns: `todo`, `progress`, `done`
  - Inline card actions: Edit description, Delete
  - Filter by text and priority (All/Low/Medium/High)
  - Queued badge displayed on cards when writes are pending (offline or failed)

## Time Spent

- Approximately 4 hours
  - Wiring task state, filtering, and modal
  - DnD interactions and hit testing for columns
  - CRUD integrations with json-server
  - Env configuration for separate backend deployments
  - Offline queue + optimistic updates + UI badges

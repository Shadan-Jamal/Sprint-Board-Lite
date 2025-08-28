# AI_PROMPTS

1) Create a regex expression to check email format
- ^[^\s@]+@[^\s@]+\.[^\s@]+$

2) How to make a card draggable using framer motion
- Use motion.div with the drag prop:
```tsx
<motion.div drag dragSnapToOrigin onDragEnd={handleDragEnd}>...</motion.div>
```

3) Backend configuration for my json-server db.json
- Install: json-server, cors, morgan; run a small server.js:
```bash
json-server db.json --port 8000
```
- Or custom server:
```js
server.use(cors()); server.use(jsonServer.bodyParser);
server.post("/tasks", (req,_,next)=>{ req.body.id ||= nanoid(); next(); });
server.use(router);
```

4) How do I implement a functionality to queue write operations when the device is offline or the network is interrupted?
- Optimistically update UI, push the write to a localStorage-backed queue, mark the item as “queued”, and replay the queue on window 'online' or manual retry; replace temp IDs on successful POSTs.

5) Data flow of the useTasks() hook
- fetch -> set tasks/filteredTasks
- filter(text, priority) -> update filteredTasks
- add/update/delete -> optimistic update -> try API -> on failure enqueue -> replay later
- status/description updates -> same optimistic + queue pattern

6) Pros and cons of using useState and useEffect in custom hooks
- Pros: simple, composable, local encapsulation, no external state required.
- Cons: harder to share across tabs, can re-run on every mount, tricky effects ordering, no server cache by default.
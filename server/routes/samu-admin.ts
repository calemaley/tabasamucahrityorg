import { Router } from "express";
import fs from "fs";
import path from "path";

// Simple in-memory event store with JSON file persistence
export type TrackedEvent = {
  id: string;
  type: string; // e.g., "contact_submit", "newsletter_subscribe", "volunteer_application", "sponsorship_application", "page_view"
  payload: any;
  ts: number; // epoch ms
};

class EventStore {
  private events: TrackedEvent[] = [];
  private filePath: string;
  private clients: Set<NodeJS.WritableStream> = new Set();

  constructor() {
    const dataDir = path.resolve(process.cwd(), "server/data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    this.filePath = path.join(dataDir, "events.json");
    this.load();
  }

  private load() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) this.events = parsed;
      }
    } catch (err) {
      console.error("Failed to load events store", err);
    }
  }

  private persist() {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(this.events, null, 2),
        "utf-8",
      );
    } catch (err) {
      console.error("Failed to persist events store", err);
    }
  }

  all() {
    return this.events.slice(-1000); // cap
  }

  add(
    evt: Omit<TrackedEvent, "id" | "ts"> & Partial<Pick<TrackedEvent, "ts">>,
  ) {
    const full: TrackedEvent = {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      ts: evt.ts ?? Date.now(),
      type: evt.type,
      payload: evt.payload,
    };
    this.events.push(full);
    this.persist();
    // notify SSE clients
    const data = `data: ${JSON.stringify(full)}\n\n`;
    for (const res of this.clients) {
      try {
        res.write(data);
      } catch {}
    }
    return full;
  }

  stats() {
    const counts: Record<string, number> = {};
    for (const e of this.events) counts[e.type] = (counts[e.type] || 0) + 1;
    return {
      total: this.events.length,
      counts,
      last10: this.events.slice(-10).reverse(),
    };
  }

  addClient(res: NodeJS.WritableStream) {
    this.clients.add(res);
  }

  removeClient(res: NodeJS.WritableStream) {
    this.clients.delete(res);
  }
}

const store = new EventStore();

export const adminRouter = Router();

// Track an event
adminRouter.post("/track", (req, res) => {
  const { type, payload } = req.body || {};
  if (!type) return res.status(400).json({ error: "type is required" });
  const saved = store.add({ type, payload });
  res.json({ ok: true, event: saved });
});

// List recent events
adminRouter.get("/events", (_req, res) => {
  res.json({ events: store.all() });
});

// Stats
adminRouter.get("/stats", (_req, res) => {
  res.json(store.stats());
});

// Server-Sent Events stream for realtime updates
adminRouter.get("/events/stream", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  store.addClient(res);
  // heartbeat
  const interval = setInterval(() => res.write(":\n\n"), 15000);
  req.on("close", () => {
    clearInterval(interval);
    store.removeClient(res);
  });
});

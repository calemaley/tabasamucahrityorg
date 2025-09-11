import { Router } from "express";
import { sqlite } from "../db";
import { randomUUID } from "crypto";
import { emitter, broadcastResource } from "../events";

export type TrackedEvent = {
  id: string;
  type: string; // e.g., "contact_submit", "newsletter_subscribe", "volunteer_application", "sponsorship_application", "page_view"
  payload: any;
  ts: number; // epoch ms
};

const adminRouter = Router();

// Require auth for all admin routes
import { requireAuth } from "./auth";
adminRouter.use((req, res, next) => {
  // allow GET /events/stream without header if token query provided; requireAuth will check both
  return requireAuth(req, res, next);
});

function safeJSONParse(s: string | null) {
  try {
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

// Generic helpers
function insertRow(table: string, obj: Record<string, any>) {
  const keys = Object.keys(obj);
  const placeholders = keys.map(() => "?").join(", ");
  const stmt = sqlite.prepare(`INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders})`);
  stmt.run(...keys.map((k) => obj[k]));
}

function updateRow(table: string, id: string, obj: Record<string, any>) {
  const keys = Object.keys(obj);
  const set = keys.map((k) => `${k} = ?`).join(", ");
  sqlite.prepare(`UPDATE ${table} SET ${set} WHERE id = ?`).run(...keys.map((k) => obj[k]), id);
}

// Track an event
adminRouter.post("/track", (req, res) => {
  const { type, payload } = req.body || {};
  if (!type) return res.status(400).json({ error: "type is required" });
  const id = randomUUID();
  const ts = Date.now();
  try {
    const stmt = sqlite.prepare(
      "INSERT INTO events (id, type, payload, ts) VALUES (?, ?, ?, ?)",
    );
    stmt.run(id, type, JSON.stringify(payload ?? {}), ts);
    const event = { id, type, payload, ts };
    // broadcast
    broadcastResource({ resource: "events", action: "create", data: event });
    res.json({ ok: true, event });
  } catch (err) {
    console.error("Failed to insert event", err);
    res.status(500).json({ error: "failed to save event" });
  }
});

// List recent events
adminRouter.get("/events", (_req, res) => {
  try {
    const rows = sqlite
      .prepare("SELECT id, type, payload, ts FROM events ORDER BY ts DESC LIMIT 1000")
      .all();
    const events = rows.map((r: any) => ({ ...r, payload: safeJSONParse(r.payload) }));
    res.json({ events });
  } catch (err) {
    console.error("Failed to read events", err);
    res.status(500).json({ events: [] });
  }
});

// Stats
adminRouter.get("/stats", (_req, res) => {
  try {
    const rows: { type: string; cnt: number }[] = sqlite
      .prepare("SELECT type, COUNT(*) as cnt FROM events GROUP BY type")
      .all();
    const counts: Record<string, number> = {};
    for (const r of rows) counts[r.type] = r.cnt;
    const totalRow: any = sqlite.prepare("SELECT COUNT(*) as total FROM events").get();
    const last10 = sqlite
      .prepare("SELECT id, type, payload, ts FROM events ORDER BY ts DESC LIMIT 10")
      .all()
      .map((r: any) => ({ ...r, payload: safeJSONParse(r.payload) }));
    res.json({ total: totalRow?.total ?? 0, counts, last10 });
  } catch (err) {
    console.error("Failed to compute stats", err);
    res.status(500).json({ total: 0, counts: {}, last10: [] });
  }
});

// SSE stream for realtime updates (emitter-driven)
adminRouter.get("/events/stream", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const onResource = (payload: any) => {
    try {
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
    } catch {}
  };

  // heartbeat
  const hb = setInterval(() => {
    try {
      res.write(":\n\n");
    } catch {}
  }, 15000);

  emitter.on("resource", onResource);

  // send initial snapshot: last 10 events
  try {
    const last10 = sqlite
      .prepare("SELECT id, type, payload, ts FROM events ORDER BY ts DESC LIMIT 10")
      .all()
      .map((r: any) => ({ ...r, payload: safeJSONParse(r.payload) }));
    res.write(`data: ${JSON.stringify({ type: "initial_events", data: last10 })}\n\n`);
  } catch {}

  req.on("close", () => {
    clearInterval(hb);
    emitter.off("resource", onResource);
    try {
      res.end();
    } catch {}
  });
});

// CRUD helpers for common resources
function listAll(table: string, orderBy: string = "ts") {
  return sqlite.prepare(`SELECT * FROM ${table} ORDER BY ${orderBy} DESC`).all();
}

// Contacts
adminRouter.get("/contacts", (_req, res) => {
  try {
    const rows = listAll("contacts");
    res.json({ contacts: rows.map((r: any) => ({ ...r, ts: r.ts })) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ contacts: [] });
  }
});

adminRouter.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;
  try {
    sqlite.prepare("DELETE FROM contacts WHERE id = ?").run(id);
    broadcastResource({ resource: "contacts", action: "delete", id });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "failed" });
  }
});

// Newsletter
adminRouter.get("/newsletter", (_req, res) => {
  try {
    const rows = listAll("newsletter_subscribers");
    res.json({ subscribers: rows });
  } catch (err) {
    res.status(500).json({ subscribers: [] });
  }
});

adminRouter.delete("/newsletter/:id", (req, res) => {
  const { id } = req.params;
  try {
    sqlite.prepare("DELETE FROM newsletter_subscribers WHERE id = ?").run(id);
    broadcastResource({ resource: "newsletter", action: "delete", id });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "failed" });
  }
});

// Volunteers
adminRouter.get("/volunteers", (_req, res) => {
  try {
    const rows = listAll("volunteers");
    res.json({ volunteers: rows });
  } catch (err) {
    res.status(500).json({ volunteers: [] });
  }
});
adminRouter.delete("/volunteers/:id", (req, res) => {
  const { id } = req.params;
  try {
    sqlite.prepare("DELETE FROM volunteers WHERE id = ?").run(id);
    broadcastResource({ resource: "volunteers", action: "delete", id });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "failed" });
  }
});

// Programs CRUD
adminRouter.get("/programs", (_req, res) => {
  try {
    const rows = listAll("programs");
    res.json({ programs: rows.map((r: any) => ({ ...r, payload: safeJSONParse(r.content) })) });
  } catch {
    res.status(500).json({ programs: [] });
  }
});

adminRouter.post("/programs", (req, res) => {
  const { title, slug, summary, content, image } = req.body || {};
  if (!title || !slug) return res.status(400).json({ error: "title and slug required" });
  const id = randomUUID();
  const ts = Date.now();
  try {
    sqlite
      .prepare("INSERT INTO programs (id, title, slug, summary, content, image, ts) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(id, title, slug, summary || "", content || "", image || "", ts);
    broadcastResource({ resource: "programs", action: "create", id });
    res.json({ ok: true, id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed" });
  }
});

adminRouter.put("/programs/:id", (req, res) => {
  const { id } = req.params;
  const { title, slug, summary, content, image } = req.body || {};
  try {
    sqlite
      .prepare("UPDATE programs SET title = ?, slug = ?, summary = ?, content = ?, image = ? WHERE id = ?")
      .run(title, slug, summary || "", content || "", image || "", id);
    broadcastResource({ resource: "programs", action: "update", id });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "failed" });
  }
});

adminRouter.delete("/programs/:id", (req, res) => {
  const { id } = req.params;
  try {
    sqlite.prepare("DELETE FROM programs WHERE id = ?").run(id);
    broadcastResource({ resource: "programs", action: "delete", id });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "failed" });
  }
});

// Blog CRUD
adminRouter.get("/blog", (_req, res) => {
  try {
    const rows = listAll("blog_posts");
    res.json({ posts: rows });
  } catch {
    res.status(500).json({ posts: [] });
  }
});
adminRouter.post("/blog", (req, res) => {
  const { title, slug, excerpt, content, cover } = req.body || {};
  if (!title || !slug) return res.status(400).json({ error: "title and slug required" });
  const id = randomUUID();
  const ts = Date.now();
  try {
    sqlite
      .prepare("INSERT INTO blog_posts (id, title, slug, excerpt, content, cover, ts) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(id, title, slug, excerpt || "", content || "", cover || "", ts);
    broadcastResource({ resource: "blog", action: "create", id });
    res.json({ ok: true, id });
  } catch (err) {
    res.status(500).json({ error: "failed" });
  }
});
adminRouter.put("/blog/:id", (req, res) => {
  const { id } = req.params;
  const { title, slug, excerpt, content, cover } = req.body || {};
  try {
    sqlite
      .prepare("UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, cover=? WHERE id = ?")
      .run(title, slug, excerpt || "", content || "", cover || "", id);
    broadcastResource({ resource: "blog", action: "update", id });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "failed" });
  }
});
adminRouter.delete("/blog/:id", (req, res) => {
  const { id } = req.params;
  try {
    sqlite.prepare("DELETE FROM blog_posts WHERE id = ?").run(id);
    broadcastResource({ resource: "blog", action: "delete", id });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "failed" });
  }
});

// Donations
adminRouter.get("/donations", (_req, res) => {
  try {
    const rows = listAll("donations");
    res.json({ donations: rows });
  } catch {
    res.status(500).json({ donations: [] });
  }
});
adminRouter.delete("/donations/:id", (req, res) => {
  const { id } = req.params;
  try {
    sqlite.prepare("DELETE FROM donations WHERE id = ?").run(id);
    broadcastResource({ resource: "donations", action: "delete", id });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "failed" });
  }
});

// Media
adminRouter.get("/media", (_req, res) => {
  try {
    const rows = listAll("media");
    res.json({ media: rows });
  } catch {
    res.status(500).json({ media: [] });
  }
});
adminRouter.post("/media", (req, res) => {
  const { name, url, meta } = req.body || {};
  const id = randomUUID();
  const ts = Date.now();
  try {
    sqlite.prepare("INSERT INTO media (id, name, url, meta, ts) VALUES (?, ?, ?, ?, ?)").run(id, name || "", url || "", JSON.stringify(meta || {}), ts);
    broadcastResource({ resource: "media", action: "create", id });
    res.json({ ok: true, id });
  } catch {
    res.status(500).json({ error: "failed" });
  }
});
adminRouter.delete("/media/:id", (req, res) => {
  const { id } = req.params;
  try {
    sqlite.prepare("DELETE FROM media WHERE id = ?").run(id);
    broadcastResource({ resource: "media", action: "delete", id });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "failed" });
  }
});

export { adminRouter };

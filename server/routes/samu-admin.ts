import { Router } from "express";
import { sqlite } from "../db";
import { EventEmitter } from "events";
import { randomUUID } from "crypto";

export type TrackedEvent = {
  id: string;
  type: string;
  payload: any;
  ts: number;
};

const adminRouter = Router();
const emitter = new EventEmitter();

function safeJSONParse(s: string | null) {
  try {
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

// Helpers
function listAll(table: string, orderBy = "ts") {
  return sqlite.prepare(`SELECT * FROM ${table} ORDER BY ${orderBy} DESC`).all();
}

// Track an event
adminRouter.post("/track", (req, res) => {
  const { type, payload } = req.body || {};
  if (!type) return res.status(400).json({ error: "type is required" });
  const id = randomUUID();
  const ts = Date.now();
  try {
    sqlite
      .prepare("INSERT INTO events (id, type, payload, ts) VALUES (?, ?, ?, ?)")
      .run(id, type, JSON.stringify(payload ?? {}), ts);
    const event = { id, type, payload: payload ?? {}, ts };
    emitter.emit("resource", { resource: "events", action: "create", data: event });
    res.json({ ok: true, event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to save event" });
  }
});

// List events
adminRouter.get("/events", (_req, res) => {
  try {
    const rows = sqlite.prepare("SELECT id, type, payload, ts FROM events ORDER BY ts DESC LIMIT 1000").all();
    const events = rows.map((r: any) => ({ ...r, payload: safeJSONParse(r.payload) }));
    res.json({ events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ events: [] });
  }
});

// Stats
adminRouter.get("/stats", (_req, res) => {
  try {
    const rows: { type: string; cnt: number }[] = sqlite.prepare("SELECT type, COUNT(*) as cnt FROM events GROUP BY type").all();
    const counts: Record<string, number> = {};
    for (const r of rows) counts[r.type] = r.cnt;
    const totalRow: any = sqlite.prepare("SELECT COUNT(*) as total FROM events").get();
    const last10 = sqlite
      .prepare("SELECT id, type, payload, ts FROM events ORDER BY ts DESC LIMIT 10")
      .all()
      .map((r: any) => ({ ...r, payload: safeJSONParse(r.payload) }));
    res.json({ total: totalRow?.total ?? 0, counts, last10 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ total: 0, counts: {}, last10: [] });
  }
});

// SSE stream
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

  // send initial last10
  try {
    const last10 = sqlite
      .prepare("SELECT id, type, payload, ts FROM events ORDER BY ts DESC LIMIT 10")
      .all()
      .map((r: any) => ({ ...r, payload: safeJSONParse(r.payload) }));
    res.write(`data: ${JSON.stringify({ type: "initial_events", data: last10 })}\n\n`);
  } catch {}

  emitter.on("resource", onResource);

  const hb = setInterval(() => {
    try {
      res.write(":\n\n");
    } catch {}
  }, 15000);

  req.on("close", () => {
    clearInterval(hb);
    emitter.off("resource", onResource);
    try {
      res.end();
    } catch {}
  });
});

// Contacts
adminRouter.get("/contacts", (_req, res) => {
  try {
    const rows = listAll("contacts");
    res.json({ contacts: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ contacts: [] });
  }
});

adminRouter.post("/contacts", (req, res) => {
  const { name, email, message } = req.body || {};
  const id = randomUUID();
  const ts = Date.now();
  try {
    sqlite.prepare("INSERT INTO contacts (id, name, email, message, ts) VALUES (?, ?, ?, ?, ?)").run(id, name || "", email || "", message || "", ts);
    emitter.emit("resource", { resource: "contacts", action: "create", data: { id, name, email, message, ts } });
    res.json({ ok: true, id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed" });
  }
});

adminRouter.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;
  try {
    sqlite.prepare("DELETE FROM contacts WHERE id = ?").run(id);
    emitter.emit("resource", { resource: "contacts", action: "delete", id });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed" });
  }
});

// Newsletter
adminRouter.get("/newsletter", (_req, res) => {
  try {
    const rows = listAll("newsletter_subscribers");
    res.json({ subscribers: rows });
  } catch {
    res.status(500).json({ subscribers: [] });
  }
});

adminRouter.post("/newsletter", (req, res) => {
  const { email, name } = req.body || {};
  const id = randomUUID();
  const ts = Date.now();
  try {
    sqlite.prepare("INSERT INTO newsletter_subscribers (id, email, name, ts) VALUES (?, ?, ?, ?)").run(id, email || "", name || "", ts);
    emitter.emit("resource", { resource: "newsletter", action: "create", data: { id, email, name, ts } });
    res.json({ ok: true, id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed" });
  }
});

adminRouter.delete("/newsletter/:id", (req, res) => {
  const { id } = req.params;
  try {
    sqlite.prepare("DELETE FROM newsletter_subscribers WHERE id = ?").run(id);
    emitter.emit("resource", { resource: "newsletter", action: "delete", id });
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
  } catch {
    res.status(500).json({ volunteers: [] });
  }
});

adminRouter.post("/volunteers", (req, res) => {
  const { name, email, details } = req.body || {};
  const id = randomUUID();
  const ts = Date.now();
  try {
    sqlite.prepare("INSERT INTO volunteers (id, name, email, details, ts) VALUES (?, ?, ?, ?, ?)").run(id, name || "", email || "", details || "", ts);
    emitter.emit("resource", { resource: "volunteers", action: "create", data: { id, name, email, details, ts } });
    res.json({ ok: true, id });
  } catch {
    res.status(500).json({ error: "failed" });
  }
});

adminRouter.delete("/volunteers/:id", (req, res) => {
  const { id } = req.params;
  try {
    sqlite.prepare("DELETE FROM volunteers WHERE id = ?").run(id);
    emitter.emit("resource", { resource: "volunteers", action: "delete", id });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "failed" });
  }
});

// Programs CRUD
adminRouter.get("/programs", (_req, res) => {
  try {
    const rows = listAll("programs");
    res.json({ programs: rows });
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
    emitter.emit("resource", { resource: "programs", action: "create", data: { id, title, slug, ts } });
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
    emitter.emit("resource", { resource: "programs", action: "update", id });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "failed" });
  }
});

adminRouter.delete("/programs/:id", (req, res) => {
  const { id } = req.params;
  try {
    sqlite.prepare("DELETE FROM programs WHERE id = ?").run(id);
    emitter.emit("resource", { resource: "programs", action: "delete", id });
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
    emitter.emit("resource", { resource: "blog", action: "create", id });
    res.json({ ok: true, id });
  } catch (err) {
    console.error(err);
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
    emitter.emit("resource", { resource: "blog", action: "update", id });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "failed" });
  }
});

adminRouter.delete("/blog/:id", (req, res) => {
  const { id } = req.params;
  try {
    sqlite.prepare("DELETE FROM blog_posts WHERE id = ?").run(id);
    emitter.emit("resource", { resource: "blog", action: "delete", id });
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

adminRouter.post("/donations", (req, res) => {
  const { donor_name, amount, currency, message } = req.body || {};
  const id = randomUUID();
  const ts = Date.now();
  try {
    sqlite.prepare("INSERT INTO donations (id, donor_name, amount, currency, message, ts) VALUES (?, ?, ?, ?, ?, ?)").run(id, donor_name || "", amount || 0, currency || "", message || "", ts);
    emitter.emit("resource", { resource: "donations", action: "create", id });
    res.json({ ok: true, id });
  } catch {
    res.status(500).json({ error: "failed" });
  }
});

adminRouter.delete("/donations/:id", (req, res) => {
  const { id } = req.params;
  try {
    sqlite.prepare("DELETE FROM donations WHERE id = ?").run(id);
    emitter.emit("resource", { resource: "donations", action: "delete", id });
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
    emitter.emit("resource", { resource: "media", action: "create", id });
    res.json({ ok: true, id });
  } catch {
    res.status(500).json({ error: "failed" });
  }
});

adminRouter.delete("/media/:id", (req, res) => {
  const { id } = req.params;
  try {
    sqlite.prepare("DELETE FROM media WHERE id = ?").run(id);
    emitter.emit("resource", { resource: "media", action: "delete", id });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "failed" });
  }
});

// DB backup endpoint
adminRouter.post('/db/backup', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const dataDir = path.resolve(process.cwd(), 'server/data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    const backupsDir = path.join(dataDir, 'backups');
    if (!fs.existsSync(backupsDir)) fs.mkdirSync(backupsDir, { recursive: true });
    const src = path.join(dataDir, 'db.sqlite');
    const ts = Date.now();
    const dst = path.join(backupsDir, `db-${ts}.sqlite`);
    fs.copyFileSync(src, dst);
    emitter.emit('resource', { resource: 'db', action: 'backup', file: `db-${ts}.sqlite`, ts });
    res.json({ ok: true, file: `db-${ts}.sqlite` });
  } catch (err) {
    console.error('backup failed', err);
    res.status(500).json({ error: 'backup failed' });
  }
});

export { adminRouter };

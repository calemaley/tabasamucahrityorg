import { Router } from "express";
import { sqlite } from "../db";
import { randomUUID } from "crypto";

export type TrackedEvent = {
  id: string;
  type: string; // e.g., "contact_submit", "newsletter_subscribe", "volunteer_application", "sponsorship_application", "page_view"
  payload: any;
  ts: number; // epoch ms
};

const adminRouter = Router();

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
    res.json({ ok: true, event: { id, type, payload, ts } });
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
    const events = rows.map((r: any) => ({ ...r, payload: JSON.parse(r.payload || "{}") }));
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
      .map((r: any) => ({ ...r, payload: JSON.parse(r.payload || "{}") }));
    res.json({ total: totalRow?.total ?? 0, counts, last10 });
  } catch (err) {
    console.error("Failed to compute stats", err);
    res.status(500).json({ total: 0, counts: {}, last10: [] });
  }
});

// Server-Sent Events stream for realtime updates
adminRouter.get("/events/stream", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  // Simple polling approach: stream last event id and keep client alive
  let lastId: string | null = null;
  const sendLatest = () => {
    try {
      const row: any = sqlite
        .prepare("SELECT id, type, payload, ts FROM events ORDER BY ts DESC LIMIT 1")
        .get();
      if (row && row.id !== lastId) {
        lastId = row.id;
        const data = `data: ${JSON.stringify({ ...row, payload: JSON.parse(row.payload || "{}") })}\n\n`;
        res.write(data);
      }
    } catch (err) {
      // ignore
    }
  };

  const interval = setInterval(() => {
    // heartbeat
    res.write(":\n\n");
    sendLatest();
  }, 1500);

  // send initial
  sendLatest();

  req.on("close", () => {
    clearInterval(interval);
    try {
      res.end();
    } catch {}
  });
});

export { adminRouter };

import { Router } from "express";
import { sqlite } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

const SECRET = process.env.JWT_SECRET || "dev-secret";
const REGISTER_SECRET = process.env.REGISTER_SECRET || "";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: "username and password required" });
  try {
    const row: any = sqlite.prepare("SELECT id, username, password_hash FROM admins WHERE username = ?").get(username);
    if (!row) return res.status(401).json({ error: "invalid credentials" });
    const match = bcrypt.compareSync(password, row.password_hash);
    if (!match) return res.status(401).json({ error: "invalid credentials" });
    const token = jwt.sign({ sub: row.id, username: row.username }, SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

// Reset or recreate the default admin user. This endpoint is intentionally permissive
// for local development. It requires either REGISTER_SECRET match, or the environment
// variable ALLOW_INSECURE_ADMIN_RESET=1, or non-production NODE_ENV.
router.post('/reset-default', (req, res) => {
  const { admin_secret } = req.body || {};
  const allowInsecure = process.env.ALLOW_INSECURE_ADMIN_RESET === '1' || process.env.NODE_ENV !== 'production';
  if (REGISTER_SECRET && REGISTER_SECRET !== '' && REGISTER_SECRET === admin_secret) {
    // allowed
  } else if (!allowInsecure) {
    return res.status(403).json({ error: 'forbidden' });
  }

  const DEFAULT_ADMIN = process.env.DEFAULT_ADMIN || 'teamtabasamu';
  const DEFAULT_PASS = process.env.DEFAULT_ADMIN_PASS || 'teamtabasamu908Q@2025';
  try {
    const existing: any = sqlite.prepare('SELECT id FROM admins WHERE username = ?').get(DEFAULT_ADMIN);
    const hash = bcrypt.hashSync(DEFAULT_PASS, 10);
    if (existing) {
      sqlite.prepare('UPDATE admins SET password_hash = ?, created_at = ? WHERE id = ?').run(hash, Date.now(), existing.id);
    } else {
      const id = randomUUID();
      sqlite.prepare('INSERT INTO admins (id, username, password_hash, created_at) VALUES (?, ?, ?, ?)').run(id, DEFAULT_ADMIN, hash, Date.now());
    }
    res.json({ ok: true, username: DEFAULT_ADMIN, password: DEFAULT_PASS });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

router.post("/register", (req, res) => {
  const { username, password, admin_secret } = req.body || {};
  if (REGISTER_SECRET && REGISTER_SECRET !== admin_secret) return res.status(403).json({ error: "forbidden" });
  if (!username || !password) return res.status(400).json({ error: "username and password required" });
  try {
    const id = randomUUID();
    const hash = bcrypt.hashSync(password, 10);
    sqlite.prepare("INSERT INTO admins (id, username, password_hash, created_at) VALUES (?, ?, ?, ?)").run(id, username, hash, Date.now());
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed" });
  }
});

export function requireAuth(req: any, res: any, next: any) {
  const auth = req.headers["authorization"] as string | undefined;
  let token: string | undefined;
  if (auth && auth.startsWith("Bearer ")) token = auth.slice(7);
  if (!token) token = req.query?.token;
  if (!token) return res.status(401).json({ error: "unauthorized" });
  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "invalid token" });
  }
}

export default router;

import { Router } from "express";
import { sqlite } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

const SECRET = process.env.JWT_SECRET || "dev-secret";
const authRouter = Router();

// Login route
authRouter.post("/login", (req, res) => {
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

// Simple middleware to verify token from header or query param
export function requireAuth(req: any, res: any, next: any) {
  const auth = req.headers["authorization"] as string | undefined;
  let token: string | undefined;
  if (auth && auth.startsWith("Bearer ")) token = auth.slice(7);
  if (!token) token = req.query?.token;
  if (!token) return res.status(401).json({ error: "unauthorized" });
  try {
    const payload = jwt.verify(token, SECRET);
    // attach
    (req as any).user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "invalid token" });
  }
}

// Register route (one-off) - protected via a secret env var
authRouter.post("/register", (req, res) => {
  const { username, password, admin_secret } = req.body || {};
  const REGISTER_SECRET = process.env.REGISTER_SECRET || "";
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

export default authRouter;

import path from "path";
import Database from "better-sqlite3";

// Initialize SQLite database file inside server/data
const dataDir = path.resolve(process.cwd(), "server/data");
import fs from "fs";
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbFile = path.join(dataDir, "db.sqlite");
const sqlite = new Database(dbFile);

// Create tables if they don't exist
sqlite.exec(`
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  payload TEXT,
  ts INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS admins (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  message TEXT,
  ts INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  ts INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS volunteers (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  details TEXT,
  ts INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS programs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  content TEXT,
  image TEXT,
  ts INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS children (
  id TEXT PRIMARY KEY,
  name TEXT,
  age INTEGER,
  details TEXT,
  photo TEXT,
  ts INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover TEXT,
  ts INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS donations (
  id TEXT PRIMARY KEY,
  donor_name TEXT,
  amount INTEGER,
  currency TEXT,
  message TEXT,
  ts INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  name TEXT,
  url TEXT,
  meta TEXT,
  ts INTEGER NOT NULL
);
`);

// Seed default admin if none exists
import bcrypt from "bcrypt";
const DEFAULT_ADMIN = process.env.DEFAULT_ADMIN || "teamtabasamu";
const DEFAULT_PASS = process.env.DEFAULT_ADMIN_PASS || "teamtabasamu908Q@2025";
try {
  const row: any = sqlite.prepare("SELECT id FROM admins WHERE username = ?").get(DEFAULT_ADMIN);
  if (!row) {
    const id = require("crypto").randomUUID();
    const hash = bcrypt.hashSync(DEFAULT_PASS, 10);
    sqlite.prepare("INSERT INTO admins (id, username, password_hash, created_at) VALUES (?, ?, ?, ?)").run(id, DEFAULT_ADMIN, hash, Date.now());
    console.log("Seeded default admin user", DEFAULT_ADMIN);
  }
} catch (err) {
  console.error("Failed to seed admin", err);
}

export { sqlite };

import path from "path";
import Database from "better-sqlite3";

// Initialize SQLite database file inside server/data
const dataDir = path.resolve(process.cwd(), "server/data");
import fs from "fs";
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbFile = path.join(dataDir, "db.sqlite");
const sqlite = new Database(dbFile);

// Create minimal tables if they don't exist
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
`);

export { sqlite };

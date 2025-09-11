import path from "path";
import Database from "better-sqlite3";

// Initialize SQLite database file inside server/data
const dataDir = path.resolve(process.cwd(), "server/data");
import fs from "fs";
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbFile = path.join(dataDir, "db.sqlite");
const sqlite = new Database(dbFile);

// Run SQL migrations if present
import { runMigrations } from "../migrate";

(async () => {
  try {
    await runMigrations(sqlite);
  } catch (err) {
    console.error("Migration error:", err);
    process.exit(1);
  }
})();

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

import fs from "fs";
import path from "path";

export async function runMigrations(db: any) {
  const migrationsDir = path.resolve(process.cwd(), "server/migrations");
  if (!fs.existsSync(migrationsDir)) return;

  // ensure schema_versions table exists
  db.prepare(
    "CREATE TABLE IF NOT EXISTS schema_versions (id TEXT PRIMARY KEY, name TEXT NOT NULL, applied_at INTEGER NOT NULL)",
  ).run();

  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();
  for (const file of files) {
    const id = file;
    const already = db
      .prepare("SELECT id FROM schema_versions WHERE id = ?")
      .get(id);
    if (already) continue;
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
    try {
      const txn = db.transaction(() => {
        db.exec(sql);
        db.prepare(
          "INSERT INTO schema_versions (id, name, applied_at) VALUES (?, ?, ?)",
        ).run(id, file, Date.now());
      });
      txn();
      console.log(`Applied migration: ${file}`);
    } catch (err) {
      console.error(`Failed to apply migration ${file}:`, err);
      throw err;
    }
  }
}

import { db } from "./db";

export async function exportAll(): Promise<string> {
  return JSON.stringify({
    version: 1,
    expotedAt: Date.now(),
    players: await db.players.toArray(),
    courses: await db.courses.toArray(),
    rounds: await db.rounds.toArray(),
  });
}

export function downloadBackup(json: string) {
  const url = URL.createObjectURL(
    new Blob([json], { type: "application/json" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = `discgolf-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importAll(json: string) {
  const d = JSON.parse(json);
  if (d.version !== 1) throw new Error("Unown backup version");
  await db.transaction("rw", db.players, db.courses, db.rounds, async () => {
    await Promise.all([
      db.players.clear(),
      db.courses.clear(),
      db.rounds.clear(),
    ]);
    await db.players.bulkAdd(d.players);
    await db.courses.bulkAdd(d.courses);
    await db.rounds.bulkAdd(d.rounds);
  });
}

import Dexie, { type EntityTable } from "dexie";
import type { Player, Course, Round } from "../types";

export const db = new Dexie("discgolf") as Dexie & {
  players: EntityTable<Player, "id">;
  courses: EntityTable<Course, "id">;
  rounds: EntityTable<Round, "id">;
};

db.version(1).stores({
  players: "id, name",
  courses: "id, name",
  rounds: "id, date, status, courseId, layoutId",
});

export const newId = () => crypto.randomUUID();

export async function requestPersistence() {
  try {
    await navigator.storage?.persist?.();
  } catch {
    /* ignore */
  }
}

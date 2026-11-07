import { db } from "./data/db";
import type { Player, Course, Round } from "./types";

/* ------------------------------------------------------------------ */
/* PLAYERS (TPM = throws per kilometer, Olle has 0 = no data)          */
/* ------------------------------------------------------------------ */
const testPlayers: Player[] = [
  { id: "player-anna", name: "Anna", color: "#e63946", startTPM: 32 },
  { id: "player-erik", name: "Erik", color: "#457b9d", startTPM: 27 },
  { id: "player-maja", name: "Maja", color: "#2a9d8f", startTPM: 36 },
  { id: "player-olle", name: "Olle", color: "#f4a261", startTPM: 0 },
];

/* ------------------------------------------------------------------ */
/* COURSES (fake names, coordinates near Karlstad)                     */
/* ------------------------------------------------------------------ */
const testCourses: Course[] = [
  {
    id: "course-forest",
    name: "Forest Course",
    location: { latitude: 59.3793, longitude: 13.5036 },
    holes: [
      { id: "forest-hole-1", length: 78 },
      { id: "forest-hole-2", length: 112 },
      { id: "forest-hole-3", length: 64 },
      { id: "forest-hole-4", length: 135 },
      { id: "forest-hole-5", length: 91 },
      { id: "forest-hole-6", length: 57 },
      { id: "forest-hole-7", length: 120 },
      { id: "forest-hole-8", length: 102 },
      { id: "forest-hole-9", length: 84 },
    ],
    layouts: [
      {
        id: "layout-forest-full",
        name: "Full 9",
        holeIds: [
          "forest-hole-1",
          "forest-hole-2",
          "forest-hole-3",
          "forest-hole-4",
          "forest-hole-5",
          "forest-hole-6",
          "forest-hole-7",
          "forest-hole-8",
          "forest-hole-9",
        ],
      },
      {
        id: "layout-forest-short",
        name: "Short 5",
        holeIds: [
          "forest-hole-1",
          "forest-hole-3",
          "forest-hole-5",
          "forest-hole-7",
          "forest-hole-9",
        ],
      },
    ],
  },
  {
    id: "course-park",
    name: "Park Course",
    location: { latitude: 59.4021, longitude: 13.4788 },
    holes: [
      { id: "park-hole-1", length: 55 },
      { id: "park-hole-2", length: 88 },
      { id: "park-hole-3", length: 70 },
      { id: "park-hole-4", length: 96 },
      { id: "park-hole-5", length: 63 },
      { id: "park-hole-6", length: 110 },
    ],
    layouts: [
      {
        id: "layout-park-all",
        name: "All 6",
        holeIds: [
          "park-hole-1",
          "park-hole-2",
          "park-hole-3",
          "park-hole-4",
          "park-hole-5",
          "park-hole-6",
        ],
      },
      {
        id: "layout-park-back",
        name: "Back 3",
        holeIds: ["park-hole-4", "park-hole-5", "park-hole-6"],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* ROUNDS (10 finished rounds, oldest first)                           */
/* tpmUsed / extraThrows are placeholders, real values come later.     */
/* ------------------------------------------------------------------ */
const testRounds: Round[] = [
  {
    id: "round-1",
    date: new Date("2025-05-11T14:00:00").getTime(),
    duration: 38 * 60 * 1000, // 38 minutes in milliseconds
    courseId: "course-forest",
    layoutId: "layout-forest-full",
    courseName: "Forest Course",
    layoutName: "Full 9",
    holes: [
      { holeId: "forest-hole-1", length: 78 },
      { holeId: "forest-hole-2", length: 112 },
      { holeId: "forest-hole-3", length: 64 },
      { holeId: "forest-hole-4", length: 135 },
      { holeId: "forest-hole-5", length: 91 },
      { holeId: "forest-hole-6", length: 57 },
      { holeId: "forest-hole-7", length: 120 },
      { holeId: "forest-hole-8", length: 102 },
      { holeId: "forest-hole-9", length: 84 },
    ],
    currentHole: 8,
    status: "done",
    settings: { mode: "standard", secret: false, length: "short" },
    players: [
      {
        id: "player-anna",
        name: "Anna",
        color: "#e63946",
        tpmUsed: 32,
        extraThrows: 0,
      },
      {
        id: "player-erik",
        name: "Erik",
        color: "#457b9d",
        tpmUsed: 27,
        extraThrows: 0,
      },
    ],
    scores: {
      "player-anna": [3, 3, 1, 4, 2, 1, 3, 4, 2],
      "player-erik": [1, 2, 1, 4, 3, 1, 2, 3, 2],
    },
  },
  {
    id: "round-2",
    date: new Date("2025-06-01T14:00:00").getTime(),
    duration: 29 * 60 * 1000, // 29 minutes in milliseconds
    courseId: "course-park",
    layoutId: "layout-park-all",
    courseName: "Park Course",
    layoutName: "All 6",
    holes: [
      { holeId: "park-hole-1", length: 55 },
      { holeId: "park-hole-2", length: 88 },
      { holeId: "park-hole-3", length: 70 },
      { holeId: "park-hole-4", length: 96 },
      { holeId: "park-hole-5", length: 63 },
      { holeId: "park-hole-6", length: 110 },
    ],
    currentHole: 5,
    status: "done",
    settings: { mode: "handicap", secret: false, length: "short" },
    players: [
      {
        id: "player-anna",
        name: "Anna",
        color: "#e63946",
        tpmUsed: 32,
        extraThrows: 0,
      },
      {
        id: "player-erik",
        name: "Erik",
        color: "#457b9d",
        tpmUsed: 27,
        extraThrows: 0,
      },
      {
        id: "player-maja",
        name: "Maja",
        color: "#2a9d8f",
        tpmUsed: 36,
        extraThrows: 0,
      },
    ],
    scores: {
      "player-anna": [1, 3, 2, 3, 2, 5],
      "player-erik": [2, 1, 2, 2, 3, 4],
      "player-maja": [2, 4, 3, 4, 2, 5],
    },
  },
  {
    id: "round-3",
    date: new Date("2025-07-13T14:00:00").getTime(),
    duration: 24 * 60 * 1000, // 24 minutes in milliseconds
    courseId: "course-forest",
    layoutId: "layout-forest-short",
    courseName: "Forest Course",
    layoutName: "Short 5",
    holes: [
      { holeId: "forest-hole-1", length: 78 },
      { holeId: "forest-hole-3", length: 64 },
      { holeId: "forest-hole-5", length: 91 },
      { holeId: "forest-hole-7", length: 120 },
      { holeId: "forest-hole-9", length: 84 },
    ],
    currentHole: 4,
    status: "done",
    settings: { mode: "handicap", secret: true, length: "short" },
    players: [
      {
        id: "player-erik",
        name: "Erik",
        color: "#457b9d",
        tpmUsed: 27,
        extraThrows: 0,
      },
      {
        id: "player-maja",
        name: "Maja",
        color: "#2a9d8f",
        tpmUsed: 36,
        extraThrows: 0,
      },
      {
        id: "player-olle",
        name: "Olle",
        color: "#f4a261",
        tpmUsed: 0,
        extraThrows: 0,
      },
    ],
    scores: {
      "player-erik": [1, 1, 2, 1, 2],
      "player-maja": [2, 2, 3, 6, 3],
      "player-olle": [3, 4, 2, 4, 4],
    },
  },
  {
    id: "round-4",
    date: new Date("2025-08-24T14:00:00").getTime(),
    duration: 37 * 60 * 1000, // 37 minutes in milliseconds
    courseId: "course-forest",
    layoutId: "layout-forest-full",
    courseName: "Forest Course",
    layoutName: "Full 9",
    holes: [
      { holeId: "forest-hole-1", length: 78 },
      { holeId: "forest-hole-2", length: 112 },
      { holeId: "forest-hole-3", length: 64 },
      { holeId: "forest-hole-4", length: 135 },
      { holeId: "forest-hole-5", length: 91 },
      { holeId: "forest-hole-6", length: 57 },
      { holeId: "forest-hole-7", length: 120 },
      { holeId: "forest-hole-8", length: 102 },
      { holeId: "forest-hole-9", length: 84 },
    ],
    currentHole: 8,
    status: "done",
    settings: { mode: "handicap", secret: false, length: "short" },
    players: [
      {
        id: "player-anna",
        name: "Anna",
        color: "#e63946",
        tpmUsed: 32,
        extraThrows: 0,
      },
      {
        id: "player-erik",
        name: "Erik",
        color: "#457b9d",
        tpmUsed: 27,
        extraThrows: 0,
      },
      {
        id: "player-maja",
        name: "Maja",
        color: "#2a9d8f",
        tpmUsed: 36,
        extraThrows: 0,
      },
      {
        id: "player-olle",
        name: "Olle",
        color: "#f4a261",
        tpmUsed: 0,
        extraThrows: 0,
      },
    ],
    scores: {
      "player-anna": [1, 4, 1, 6, 4, 2, 5, 3, 2],
      "player-erik": [1, 4, 1, 3, 3, 1, 2, 4, 2],
      "player-maja": [2, 5, 1, 6, 4, 2, 5, 5, 3],
      "player-olle": [3, 5, 3, 5, 4, 3, 5, 4, 4],
    },
  },
  {
    id: "round-5",
    date: new Date("2026-09-14T14:00:00").getTime(),
    duration: 16 * 60 * 1000, // 16 minutes in milliseconds
    courseId: "course-park",
    layoutId: "layout-park-back",
    courseName: "Park Course",
    layoutName: "Back 3",
    holes: [
      { holeId: "park-hole-4", length: 96 },
      { holeId: "park-hole-5", length: 63 },
      { holeId: "park-hole-6", length: 110 },
    ],
    currentHole: 2,
    status: "done",
    settings: { mode: "personalBest", secret: false, length: "short" },
    players: [
      {
        id: "player-anna",
        name: "Anna",
        color: "#e63946",
        tpmUsed: 32,
        extraThrows: 0,
      },
      {
        id: "player-maja",
        name: "Maja",
        color: "#2a9d8f",
        tpmUsed: 36,
        extraThrows: 0,
      },
    ],
    scores: {
      "player-anna": [2, 1, 3],
      "player-maja": [4, 4, 5],
    },
  },
  {
    id: "round-6",
    date: new Date("2026-05-03T14:00:00").getTime(),
    duration: 24 * 60 * 1000, // 24 minutes in milliseconds
    courseId: "course-park",
    layoutId: "layout-park-all",
    courseName: "Park Course",
    layoutName: "All 6",
    holes: [
      { holeId: "park-hole-1", length: 55 },
      { holeId: "park-hole-2", length: 88 },
      { holeId: "park-hole-3", length: 70 },
      { holeId: "park-hole-4", length: 96 },
      { holeId: "park-hole-5", length: 63 },
      { holeId: "park-hole-6", length: 110 },
    ],
    currentHole: 5,
    status: "done",
    settings: { mode: "handicap", secret: false, length: "short" },
    players: [
      {
        id: "player-anna",
        name: "Anna",
        color: "#e63946",
        tpmUsed: 32,
        extraThrows: 0,
      },
      {
        id: "player-erik",
        name: "Erik",
        color: "#457b9d",
        tpmUsed: 27,
        extraThrows: 0,
      },
      {
        id: "player-olle",
        name: "Olle",
        color: "#f4a261",
        tpmUsed: 0,
        extraThrows: 0,
      },
    ],
    scores: {
      "player-anna": [1, 2, 3, 3, 2, 3],
      "player-erik": [2, 2, 2, 3, 2, 3],
      "player-olle": [3, 3, 3, 4, 3, 4],
    },
  },
  {
    id: "round-7",
    date: new Date("2026-05-24T14:00:00").getTime(),
    duration: 33 * 60 * 1000, // 33 minutes in milliseconds
    courseId: "course-forest",
    layoutId: "layout-forest-full",
    courseName: "Forest Course",
    layoutName: "Full 9",
    holes: [
      { holeId: "forest-hole-1", length: 78 },
      { holeId: "forest-hole-2", length: 112 },
      { holeId: "forest-hole-3", length: 64 },
      { holeId: "forest-hole-4", length: 135 },
      { holeId: "forest-hole-5", length: 91 },
      { holeId: "forest-hole-6", length: 57 },
      { holeId: "forest-hole-7", length: 120 },
      { holeId: "forest-hole-8", length: 102 },
      { holeId: "forest-hole-9", length: 84 },
    ],
    currentHole: 8,
    status: "done",
    settings: { mode: "bestPossible", secret: false, length: "short" },
    players: [
      {
        id: "player-anna",
        name: "Anna",
        color: "#e63946",
        tpmUsed: 32,
        extraThrows: 0,
      },
      {
        id: "player-erik",
        name: "Erik",
        color: "#457b9d",
        tpmUsed: 27,
        extraThrows: 0,
      },
      {
        id: "player-maja",
        name: "Maja",
        color: "#2a9d8f",
        tpmUsed: 36,
        extraThrows: 0,
      },
    ],
    scores: {
      "player-anna": [2, 4, 3, 6, 2, 1, 3, 2, 3],
      "player-erik": [2, 4, 3, 4, 1, 1, 3, 3, 2],
      "player-maja": [3, 4, 2, 5, 4, 3, 5, 4, 3],
    },
  },
  {
    id: "round-8",
    date: new Date("2026-06-21T14:00:00").getTime(),
    duration: 25 * 60 * 1000, // 25 minutes in milliseconds
    courseId: "course-forest",
    layoutId: "layout-forest-short",
    courseName: "Forest Course",
    layoutName: "Short 5",
    holes: [
      { holeId: "forest-hole-1", length: 78 },
      { holeId: "forest-hole-3", length: 64 },
      { holeId: "forest-hole-5", length: 91 },
      { holeId: "forest-hole-7", length: 120 },
      { holeId: "forest-hole-9", length: 84 },
    ],
    currentHole: 4,
    status: "done",
    settings: { mode: "handicap", secret: true, length: "short" },
    players: [
      {
        id: "player-anna",
        name: "Anna",
        color: "#e63946",
        tpmUsed: 32,
        extraThrows: 0,
      },
      {
        id: "player-erik",
        name: "Erik",
        color: "#457b9d",
        tpmUsed: 27,
        extraThrows: 0,
      },
      {
        id: "player-maja",
        name: "Maja",
        color: "#2a9d8f",
        tpmUsed: 36,
        extraThrows: 0,
      },
      {
        id: "player-olle",
        name: "Olle",
        color: "#f4a261",
        tpmUsed: 0,
        extraThrows: 0,
      },
    ],
    scores: {
      "player-anna": [3, 2, 4, 5, 2],
      "player-erik": [2, 2, 2, 2, 4],
      "player-maja": [3, 1, 4, 4, 3],
      "player-olle": [3, 3, 3, 4, 3],
    },
  },
  {
    id: "round-9",
    date: new Date("2026-08-09T14:00:00").getTime(),
    duration: 21 * 60 * 1000, // 21 minutes in milliseconds
    courseId: "course-park",
    layoutId: "layout-park-all",
    courseName: "Park Course",
    layoutName: "All 6",
    holes: [
      { holeId: "park-hole-1", length: 55 },
      { holeId: "park-hole-2", length: 88 },
      { holeId: "park-hole-3", length: 70 },
      { holeId: "park-hole-4", length: 96 },
      { holeId: "park-hole-5", length: 63 },
      { holeId: "park-hole-6", length: 110 },
    ],
    currentHole: 5,
    status: "done",
    settings: { mode: "standard", secret: false, length: "short" },
    players: [
      {
        id: "player-erik",
        name: "Erik",
        color: "#457b9d",
        tpmUsed: 27,
        extraThrows: 0,
      },
      {
        id: "player-maja",
        name: "Maja",
        color: "#2a9d8f",
        tpmUsed: 36,
        extraThrows: 0,
      },
      {
        id: "player-olle",
        name: "Olle",
        color: "#f4a261",
        tpmUsed: 0,
        extraThrows: 0,
      },
    ],
    scores: {
      "player-erik": [1, 3, 2, 3, 1, 3],
      "player-maja": [3, 4, 3, 4, 2, 4],
      "player-olle": [2, 2, 2, 4, 1, 5],
    },
  },
  {
    id: "round-10",
    date: new Date("2026-11-06T14:00:00").getTime(),
    duration: 39 * 60 * 1000, // 39 minutes in milliseconds
    courseId: "course-forest",
    layoutId: "layout-forest-full",
    courseName: "Forest Course",
    layoutName: "Full 9",
    holes: [
      { holeId: "forest-hole-1", length: 78 },
      { holeId: "forest-hole-2", length: 112 },
      { holeId: "forest-hole-3", length: 64 },
      { holeId: "forest-hole-4", length: 135 },
      { holeId: "forest-hole-5", length: 91 },
      { holeId: "forest-hole-6", length: 57 },
      { holeId: "forest-hole-7", length: 120 },
      { holeId: "forest-hole-8", length: 102 },
      { holeId: "forest-hole-9", length: 84 },
    ],
    currentHole: 8,
    status: "done",
    settings: { mode: "handicap", secret: false, length: "short" },
    players: [
      {
        id: "player-anna",
        name: "Anna",
        color: "#e63946",
        tpmUsed: 32,
        extraThrows: 0,
      },
      {
        id: "player-erik",
        name: "Erik",
        color: "#457b9d",
        tpmUsed: 27,
        extraThrows: 0,
      },
      {
        id: "player-maja",
        name: "Maja",
        color: "#2a9d8f",
        tpmUsed: 36,
        extraThrows: 0,
      },
      {
        id: "player-olle",
        name: "Olle",
        color: "#f4a261",
        tpmUsed: 0,
        extraThrows: 0,
      },
    ],
    scores: {
      "player-anna": [3, 3, 1, 3, 2, 2, 3, 2, 1],
      "player-erik": [2, 2, 2, 3, 2, 2, 4, 3, 3],
      "player-maja": [3, 3, 1, 5, 2, 4, 4, 3, 2],
      "player-olle": [3, 7, 2, 6, 3, 2, 4, 3, 2],
    },
  },
];

/* ------------------------------------------------------------------ */
/* PUT IT IN THE DATABASE                                              */
/* ------------------------------------------------------------------ */
// Wipes the three tables and fills them with the data above.
export async function loadTestData(): Promise<void> {
  await db.transaction("rw", db.players, db.courses, db.rounds, async () => {
    await db.players.clear();
    await db.courses.clear();
    await db.rounds.clear();

    await db.players.bulkAdd(testPlayers);
    await db.courses.bulkAdd(testCourses);
    await db.rounds.bulkAdd(testRounds);
  });
}

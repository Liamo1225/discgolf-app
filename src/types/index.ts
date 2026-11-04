export type ID = string;

export interface Player {
  id: ID;
  name: string;
  color: string;
  startTPM: number;
}

export interface Hole {
  id: ID;
  length: number;
}

export interface Course {
  id: ID;
  name: string;
  holes: Hole[];
  layouts: Layout[];
}

export interface Layout {
  id: ID;
  name: string;
  holeIds: ID[];
}

export type GameMode =
  | "standard"
  | "handicap"
  | "personalBest"
  | "bestPossible";

export interface RoundSettings {
  mode: GameMode;
  secret: boolean;
}

export interface RoundPlayer {
  playerId: ID;
  name: string;
  tpmUsed: number;
  extraThrows: number;
}

export interface Round {
  id: ID;
  date: number;
  courseId: ID;
  layoutId: ID;
  courseName: string;
  layoutName: string;
  holes: { holeId: ID; length: number }[];
  status: "active" | "done";
  duration: number;
  currentHole: number;
  settings: RoundSettings;
  players: RoundPlayer[];
  scores: Record<ID, (number | null)[]>;
}

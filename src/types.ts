export type ID = string;

export interface Player {
  id: ID;
  name: string;
  color: `#${string}`;
  startTPM: number;
}

export interface Hole {
  id: ID;
  length: number;
  altLenght?: number;
}

export interface Coords {
  latitude: number;
  longitude: number;
}

export interface Course {
  id: ID;
  name: string;
  holes: Hole[];
  layouts: Layout[];
  location: Coords;
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
  length: "short" | "long";
}

export interface RoundPlayer {
  id: ID;
  name: string;
  color: `#${string}`;
  tpmUsed: number;
  extraThrows: number;
}

export interface Round {
  id: ID;

  date: number;
  duration: number;

  courseId: ID;
  layoutId: ID;
  courseName: string;
  layoutName: string;

  holes: { holeId: ID; length: number }[];
  currentHole: number;

  status: "active" | "done";
  settings: RoundSettings;

  players: RoundPlayer[];
  scores: Record<ID, (number | null)[]>;
}

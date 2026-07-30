import { get, set } from "./storage";

export const PlayerSorting = {
    MOVING: "moving",
    STATIC: "static"
}

export const ScoreMode = {
    TOTAL: "total",
    TOTAL_HANDICAP: "total_handicap",
    PERSONAL_BEST: "personalBest",
    BEST_POSSIBLE: "bestPossible"
};

const DEFAULT_SETTINGS = {
    defaultNewRound: {
        scoreMode: ScoreMode.TOTAL_HANDICAP,
        showScore: true,
        playerOrder: PlayerSorting.MOVING
    },
    handicapHistory: 5
};

// ----- Settings -----

const KEY = "settings";

export function getSettings() {
    return {...DEFAULT_SETTINGS, ...get(KEY)};
}

export function setSettings(settings) {
    set(KEY, settings);
}

// ----- Settings managment -----

export function updateSettings(updates) {
    const settings = getSettings();

    set(KEY, {...settings, ...updates});
}
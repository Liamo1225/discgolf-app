import { get, set } from "./storage";

export const PlayerSorting = {
    MOVING: "moving",
    STATIC: "static"
}

export const SecondaryInfo = {
    NONE: "none",
    TOTAL: "total",
    TOTAL_HANDICAP: "total_handicap",
    PERSONAL_BEST: "personalBest",
    BEST_POSSIBLE: "bestPossible"
};

const DEFAULT_SETTINGS = {
    defaultNewRound: {
        playerInfo: SecondaryInfo.TOTAL_HANDICAP,
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
import { get, set } from "./storage";

const KEY = "settings";

const DEFAULT_SETTINGS = {
    defaultNewRound: {
        showTotal: true,
        handicapMode: true,
        playerOrder: "total"
    }
};

// ----- Settings -----

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
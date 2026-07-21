export const STORAGE_KEY = "discgolfData";

const DEFAULT_DB = {
    players: [],
    courses: [],
    history: [],
    settings: {},
    activeGame: null
}

// ----- Data managing -----

function saveDB(db) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));

        return true;

    } catch (err) {
        console.error("Failed to save database.", err);

        return false;
    }
}

function loadDB() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) {
            return structuredClone(DEFAULT_DB);
        }

        return {
            ...structuredClone(DEFAULT_DB),
            ...JSON.parse(data)
        };
    
    } catch (err) {
        console.error("Failed to load database.", err);
        return structuredClone(DEFAULT_DB);
    }
}

// ----- Generic -----

export function get(key) {
    return loadDB()[key];
}

export function set(key, value) {
    const db = loadDB();

    db[key] = value;
    saveDB(db);
}

export function createUUID() {
    return crypto.randomUUID()
}
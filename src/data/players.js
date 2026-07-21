import { get, set, createUUID } from "./storage";

const KEY = "players";

// ----- Players -----

export function getPlayers() {
    return get(KEY);
}

export function getPlayer(id) {
    return getPlayers().find(player => player.id === id);
}

export function playerExists(id) {
    return getPlayer(id) !== undefined;
}

// ----- Player management -----

export function addPlayer(name, color) {
    const players = getPlayers();

    const player = {
        id: createUUID(),
        name,
        color
    };

    set(KEY, [...players, player]);

    return player;
}

export function updatePlayer(id, updates) {
    const players = getPlayers();

    const updatedPlayers = players.map(player => {
        if (player.id !== id) {
            return player;
        }

        return {
            ...player, ...updates
        }
    });

    set(KEY, updatedPlayers);
}

export function deletePlayer(id) {
    const players = getPlayers();

    set(KEY, players.filter(player => player.id !== id));
}
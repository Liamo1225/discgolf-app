import { createUUID, loadData, saveData } from "./dataManager";
import { STORAGE_KEYS } from "./keys";

function saveGameData(gameData) {
    saveData(STORAGE_KEYS.activeGame, gameData);
}

export function getGameData() {
    return loadData(STORAGE_KEYS.activeGame, null);
}

export function createGame(course, players, settings) {
    const gameData = {
        id: createUUID(),

        course: {
            id: course.id,
            name: course.name,
            length: course.length,
            holes: course.holes,
            bestScore: course.bestScore
        },

        players: players.map(player => ({
            id: player.id,
            name: player.name,
            color: player.color,

            handicap: player.handicap ?? 0,

            scores: Array(course.holes).fill(0)
        })),

        settings: {
            showTotal: settings.showTotal,
            handicapMode: settings.handicapMode
        },

        currentHole: 1,
        started: new Date().toISOString(),
        ended: null
    };

    saveGameData(gameData);

    return gameData;
}

export function deleteGameData() {
    saveGameData(null);
}

export function changePlayerScore(playerId, hole, amount) {
    const gameData = getGameData();

    if (!gameData) {
        return null;
    }

    const updatedPlayers = gameData.players.map(player => {
        if (player.id !== playerId) {
            return player;
        }

        const scores = [...player.scores];
        const currentScore = scores[hole - 1] ?? 0;

        scores[hole - 1] = Math.max(0, currentScore + amount);

        return {
            ...player,
            scores
        };
    });

    const updatedGameData = {
        ...gameData,
        players: updatedPlayers
    };

    saveGameData(updatedGameData);

    return updatedGameData;
}

export function setCurrentHole(hole) {
    const gameData = getGameData();

    if (!gameData) {
        return;
    }

    const updatedGameData = {
        ...gameData,
        currentHole: hole
    };

    saveGameData(updatedGameData);

    return updatedGameData;
}

export function updateGame(changes) {
    const gameData = getGameData();

    if (!gameData) {
        return null;
    }

    const updatedGame = {
        ...gameData,
        ...changes
    };

    saveGameData(updatedGame);

    return updatedGame;
}

export function getPlayerTotal(player) {
    return player.scores.reduce((sum, score) => sum + score, 0);
}

export function getDistFromFirst(player, gameData) {
    const getScore = (p) =>
        getPlayerTotal(p) + (gameData.settings.handicapMode ? p.handicap : 0);

    const best = Math.min(...gameData.players.map(getScore));

    return getScore(player) - best;
}
import { getLayout } from "./course";
import { getPlayers } from "./players";
import { getSettings } from "./settings";

import { get, set, createUUID } from "./storage";

const KEY = "activeGame";

// ----- Active game -----

export function getActiveGame() {
    return get(KEY);
}

export function setActiveGame(game) {
    set(KEY, game);
}

// ----- Game lifecycle -----

export function startGame(courseId, layoutId, playerIds, settingChanges = {}) {
    const game = {
        id: createUUID(),

        courseId,
        layoutId,

        players: playerIds.map(id => ({
            id,
            scores: Array(getLayout(courseId, layoutId).holes).fill(0),
            handicap: 0
        })),

        gameSettings: {
            ...getSettings().defaultNewGame,
            ...settingChanges
        },

        currentHole: 1,
        started: Date.now()
    };

    set(KEY, game);

    return game;
}

export function endGame() {
    const game = getActiveGame();

    set(KEY, null);
    
    return game;
}

// ----- Scores -----

export function changeScore(playerId, hole, score) {
    const game = getActiveGame();

    const updatedPlayers = game.players.map(player => {
        if (player.id !== playerId) {
            return player;
        }

        const scores = [...player.scores];
        const currentScore = player.scores[hole - 1];
        scores[hole - 1] = Math.max(0, currentScore + score);

        return {
            ...player, scores
        };
    });

    const updatedGame = {
        ...game,
        players: updatedPlayers
    }

    set(KEY, updatedGame);
    return updatedGame;
}

export function getScore(playerId, hole) {
    const game = getActiveGame();

    const player = game.players.find(
        player => player.id === playerId
    );

    return player?.scores[hole - 1] ?? 0;
}

export function getTotal(playerId) {
    const game = getActiveGame();

    const player = game.players.find(player => player.id === playerId);

    return player.scores.reduce((sum, score) => sum + score, 0);
}

export function getScoreOffset(playerId) {
    const game = getActiveGame();

    const best = Math.min(...game.players.map(player => getTotal(player.id)));

    return getTotal(playerId) - best;
}

// ----- Hole navigation -----

export function changeHole(amount) {
    const game = getActiveGame();

    const holes = getLayout(game.courseId, game.layoutId).holes;

    const newHole = Math.min(
        holes + 1,
        Math.max(1, game.currentHole + amount)
    );

    if (newHole === game.currentHole) return;

    const newPlayerOrder = reorderPlayers(game);

    const updatedGame = {
        ...game,
        players: newPlayerOrder, 
        currentHole: newHole
    }

    set(KEY, updatedGame);
    return updatedGame;
}

function reorderPlayers(game) {
    if (!game.gameSettings.showTotal) return;
    if (game.gameSettings.playerOrder === "static") return;

    const updatedOrder = game.players.sort((a, b) => {
        const aTotal = getTotal(a.id);
        const bTotal = getTotal(b.id);

        if (game.gameSettings.handicapMode) {
            return (aTotal + a.handicap) - (bTotal + b.handicap);
        }

        return aTotal - bTotal;
    });

    return updatedOrder;
}

// ----- Game settings -----

export function updateGameSettings(updates) {
    const game = getActiveGame();

    const updatedGame = {
        ...game,
        gameSettings: {
            ...game.gameSettings,
            ...updates
        }
    }

    set(KEY, updatedGame);
    return updatedGame;
}

export function setHandicap() {
    const game = getActiveGame();

}
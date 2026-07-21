import { getLayout } from "./course";
import { getPlayers } from "./players";
import { getSettings } from "./settings";

import { get, set, createUUID } from "./storage";

const KEY = "activeRound";

// ----- Active round -----

export function getActiveRound() {
    return get(KEY);
}

export function setActiveRound(round) {
    set(KEY, round);
}

// ----- round lifecycle -----

export function startRound(courseId, layoutId, playerIds, settingChanges = {}) {
    const round = {
        id: createUUID(),

        courseId,
        layoutId,

        players: playerIds.map(id => ({
            id,
            scores: Array(getLayout(courseId, layoutId).holes).fill(0),
            handicap: 0
        })),

        roundSettings: {
            ...getSettings().defaultNewRound,
            ...settingChanges
        },

        currentHole: 1,
        started: Date.now()
    };

    set(KEY, round);

    return round;
}

export function endRound() {
    const round = getActiveRound();

    set(KEY, null);
    
    return round;
}

// ----- Scores -----

export function changeScore(playerId, hole, score) {
    const round = getActiveRound();

    const updatedPlayers = round.players.map(player => {
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

    const updatedRound = {
        ...round,
        players: updatedPlayers
    }

    set(KEY, updatedRound);
    return updatedRound;
}

export function getScore(playerId, hole) {
    const round = getActiveRound();

    const player = round.players.find(
        player => player.id === playerId
    );

    return player?.scores[hole - 1] ?? 0;
}

export function getTotal(playerId) {
    const round = getActiveRound();

    const player = round.players.find(player => player.id === playerId);

    return player.scores.reduce((sum, score) => sum + score, 0);
}

export function getScoreOffset(playerId) {
    const round = getActiveRound();

    const best = Math.min(...round.players.map(player => getTotal(player.id)));

    return getTotal(playerId) - best;
}

// ----- Hole navigation -----

export function changeHole(amount) {
    const round = getActiveRound();

    const holes = getLayout(round.courseId, round.layoutId).holes;

    const newHole = Math.min(
        holes + 1,
        Math.max(1, round.currentHole + amount)
    );

    if (newHole === round.currentHole) return;

    const newPlayerOrder = reorderPlayers(round);

    const updatedRound = {
        ...round,
        players: newPlayerOrder, 
        currentHole: newHole
    }

    set(KEY, updatedRound);
    return updatedRound;
}

function reorderPlayers(round) {
    if (!round.roundSettings.showTotal) return;
    if (round.roundSettings.playerOrder === "static") return;

    const updatedOrder = round.players.sort((a, b) => {
        const aTotal = getTotal(a.id);
        const bTotal = getTotal(b.id);

        if (round.roundSettings.handicapMode) {
            return (aTotal + a.handicap) - (bTotal + b.handicap);
        }

        return aTotal - bTotal;
    });

    return updatedOrder;
}

// ----- round settings -----

export function updateRoundSettings(updates) {
    const round = getActiveRound();

    const updatedRound = {
        ...round,
        roundSettings: {
            ...round.roundSettings,
            ...updates
        }
    }

    set(KEY, updatedRound);
    return updatedRound;
}

export function setHandicap() {
    const round = getActiveRound();

}
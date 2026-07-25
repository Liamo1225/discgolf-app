import {
    getActiveRound,
    setActiveRound
} from "./activeRound";

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

    setActiveRound(updatedRound);
    return updatedRound;
}

export function getScore(playerId, hole) {
    const round = getActiveRound();

    const player = round.players.find(
        player => player.id === playerId
    );

    return player?.scores[hole - 1] ?? 0;
}

export function getTotal(scores) {
    return scores.reduce((sum, score) => sum + score, 0);
}

export function getScoreOffset(playerId, useHandicap = false) {
    const round = getActiveRound();

    const getPlayerTotal = (player) => {
        const total = getTotal(player.scores);

        return useHandicap
            ? total + player.handicap
            : total;
    };

    const player = round.players.find(
        player => player.id === playerId
    );

    const best = Math.min(
        ...round.players.map(getPlayerTotal)
    );

    return getPlayerTotal(player) - best;
}
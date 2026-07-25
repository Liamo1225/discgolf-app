import { SecondaryInfo } from "./settings";
import { getActiveRound, setActiveRound } from "./activeRound";
import { getPlayerStats } from "./stats";

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

export function getTotal(scores, filterScores = null) {
    return scores.reduce((sum, score, i) => {
        return !filterScores || filterScores[i] !== 0
            ? sum + score
            : sum;
    }, 0);
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

export function getSortValue(player, round) {
    const total = getTotal(player.scores);
    const stats = player.stats;

    switch (round.roundSettings.playerInfo) {
        case SecondaryInfo.TOTAL:
            return total;

        case SecondaryInfo.TOTAL_HANDICAP:
            return total + player.handicap;
        
        case SecondaryInfo.PERSONAL_BEST:
            if (!stats.bestRound) return Infinity;
            return total - getTotal(stats.bestRound, player.scores);

        case SecondaryInfo.BEST_POSSIBLE:
            if (!stats.bestScores.length) return Infinity;
            return total - getTotal(stats.bestScores, player.scores);
    }
}
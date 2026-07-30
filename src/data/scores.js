import { ScoreMode } from "./settings";
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

    switch (round.roundSettings.scoreMode) {
        case ScoreMode.TOTAL:
            return total;

        case ScoreMode.TOTAL_HANDICAP:
            return total + player.handicap;
        
        case ScoreMode.PERSONAL_BEST:
            if (!stats.bestRound) return Infinity;
            return total - getTotal(stats.bestRound, player.scores);

        case ScoreMode.BEST_POSSIBLE:
            if (!stats.bestScores.length) return Infinity;
            return total - getTotal(stats.bestScores, player.scores);
    }
}

export function getSecondaryText(player, round, scoreMode) {
    const total = getTotal(player.scores);
    const handicapTotal = total + player.handicap;

    switch (scoreMode) {
        case ScoreMode.TOTAL:
            return `+${getScoreOffset(player.id, false)} (${total})`;
        
        case ScoreMode.TOTAL_HANDICAP:
            return `+${getScoreOffset(player.id, true)} (${handicapTotal})`;
        
        case ScoreMode.PERSONAL_BEST: {
            const stats = player.stats;

            if (!stats.bestRound)
                return "???";

            const best = getTotal(
                stats.bestRound,
                player.scores
            );

            const diff = total - best;
            const currentBest = stats.bestRound[round.currentHole - 1];

            return `${formatDiff(diff)} (${total}) ★${currentBest}`;
        }
        
        case ScoreMode.BEST_POSSIBLE: {
            const stats = player.stats;

            if (!stats.bestScores.length)
                return "???";

            const bestPossible = getTotal(
                stats.bestScores,
                player.scores
            );

            const diff = total - bestPossible;

            const currentBest = stats.bestScores[round.currentHole - 1];
            const star = currentBest != null ? `★${currentBest}` : "";

            return `${formatDiff(diff)} (${total}) ${star}`;
        }
        
        default:
            return "";
    }
}

function formatDiff(value) {
    return value >= 0 ? `+${value}` : `${value}`;
}

export function checkScoresComplete(round) {
    return round.players.every(player => 
        player.scores.every(score => score !== 0)
    );
}
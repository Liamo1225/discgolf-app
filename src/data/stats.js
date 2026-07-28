import { getHistory } from "./history";
import { getTotal } from "./scores";

// ----- Player stats -----

const playerStatsCache = new Map();

export function getPlayerStats(playerId, courseId, layoutId) {
    const key = `${playerId}-${courseId}-${layoutId}`;

    if (playerStatsCache.has(key))
        return playerStatsCache.get(key);

    const stats = calculatePlayerStats(playerId, courseId, layoutId);

    playerStatsCache.set(key, stats);

    return stats;
}

export function clearPlayerStatsCache() {
    playerStatsCache.clear();
}

function calculatePlayerStats(playerId, courseId, layoutId) {
    const rounds = getHistory().filter(round =>
        round.course.id === courseId &&
        round.course.layout.id === layoutId
    );

    let bestRound = null;
    let bestRoundT = Infinity;
    let bestScores = [];

    rounds.forEach(round => {
        const player = round.players.find(
            player => player.id === playerId
        );

        if (!player) return;;

        const total = getTotal(player.scores);

        if (total < bestRoundT) {
            bestRound = [...player.scores];
            bestRoundT = total;
        }

        player.scores.forEach((score, index) => {
            if (bestScores[index] === undefined || score < bestScores[index]) {
                bestScores[index] = score;
            }
        });
    });

    return {
        bestRound,
        bestScores
    };
}

export function calcRoundsPlayedAll() {
    const result = new Map();

    for (const round of getHistory()) {
        for (const player of round.players) {
            result.set(player.id, (result.get(player.id) ?? 0) + 1);
        }
    }

    return result;
}
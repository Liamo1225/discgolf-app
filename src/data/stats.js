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
        round.course.layoutId === layoutId
    );

    let bestRound = null;
    let bestHoleScores = [];

    rounds.forEach(round => {
        const player = round.players.find(
            player => player.id === playerId
        );

        if (!player) return;

        const total = getTotal(player.scores);

        if (!bestRound || total < bestRound.total) {
            bestRound = {
                total,
                scores: player.scores
            };
        }

        player.scores.forEach((score, index) => {
            if (bestHoleScores[index] === undefined || score < bestHoleScores[index]) {
                bestHoleScores[index] = score;
            }
        });
    });

    return {
        bestRound,
        bestHoleScores
    };
}
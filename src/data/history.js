import { getCourse, getLayout } from "./course";
import { get, set } from "./storage";
import { getPlayers } from "./players";
import { getTotal } from "./activeRound";
import { BorderStyle } from "react-bootstrap-icons";

const KEY = "history";

// ----- History -----

export function getHistory() {
    return get(KEY);
}

export function getHistoryRound(id) {
    return getHistory().find(round => round.id === id);
}

export function historyExists(id) {
    return getHistoryRound(id) !== undefined;
}

// ----- History management -----

export function addHistory(round) {
    const history = getHistory();

    set(KEY, [...history, round]);
}

export function deleteHistory(id) {
    const history = getHistory();

    set(KEY, history.fiter(round => round.id !== id));
}

// ----- Helpers -----

export function convertActiveToHistory(activeRound) {
    const course = getCourse(activeRound.courseId);
    const layout = getLayout(activeRound.courseId, activeRound.layoutId);

    const players = getPlayers();

    return {
        id: activeRound.id,

        course: {
            id: course.id,
            name: course.name,
            layoutId: layout.id,
            layoutName: layout.name,
            length: layout.length,
            holes: layout.holes
        },

        players: activeRound.players.map(roundPlayer => {
            const player = players.find(
                p => p.id === roundPlayer.id
            );

            return {
                id: player.id,
                name: player.name,
                color: player.color,
                scores: roundPlayer.scores,
                handicap: roundPlayer.handicap
            }
        }),

        date: Date.now(),

        durationMin: Math.round(
            (Date.now() - activeRound.started) / 60000
        )
    }
}

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
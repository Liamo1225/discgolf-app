import { act } from "react";
import { getCourse, getLayout } from "./course";
import { get, set } from "./storage";
import { getPlayer } from "./players";

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

// ----- Convertion -----

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
            length: layout.lenght,
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
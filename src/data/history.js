import { getCourse, getLayout } from "./courses";
import { get, set } from "./storage";
import { getPlayers } from "./players";
import { BorderStyle } from "react-bootstrap-icons";

// ----- History -----

const KEY = "history";

function setHistory(history) {
    set(KEY, history);
}

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
    const course = activeRound.course;
    const layout = activeRound.course.layout;

    return {
        id: activeRound.id,

        course: {
            id: course.id,
            name: course.name,
            layout: {
                id: layout.id,
                name: layout.name
            },
            length: layout.length,
            holes: layout.holes
        },

        players: activeRound.players.map(player => ({
            id: player.id,
            name: player.name,
            color: player.color,
            scores: player.scores,
            handicap: player.handicap
        })),

        date: Date.now(),

        durationMin: Math.round(
            (Date.now() - activeRound.started) / 60000
        )
    }
}
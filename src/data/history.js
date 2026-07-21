import { act } from "react";
import { getCourse, getLayout } from "./course";
import { get, set } from "./storage";
import { getPlayer } from "./players";

const KEY = "history";

// ----- History -----

export function getHistory() {
    return get(KEY);
}

export function getHistoryGame(id) {
    return getHistory().find(game => game.id === id);
}

export function historyExists(id) {
    return getHistoryGame(id) !== undefined;
}

// ----- History management -----

export function addHistory(game) {
    const history = getHistory();

    set(KEY, [...history, game]);
}

export function deleteHistory(id) {
    const history = getHistory();

    set(KEY, history.fiter(game => game.id !== id));
}

// ----- Convertion -----

export function convertActiveToHistory(activeGame) {
    const course = getCourse(activeGame.courseId);
    const layout = getLayout(activeGame.courseId, activeGame.layoutId);

    const players = getPlayers();

    return {
        id: activeGame.id,

        course: {
            id: course.id,
            name: course.name,
            layoutId: layout.id,
            layoutName: layout.name,
            length: layout.lenght,
            holes: layout.holes
        },

        players: activeGame.players.map(gamePlayer => {
            const player = players.find(
                p => p.id === gamePlayer.id
            );

            return {
                id: player.id,
                name: player.name,
                color: player.color,
                scores: gamePlayer.scores,
                handicap: gamePlayer.handicap
            }
        }),

        date: Date.now(),

        durationMin: Math.round(
            (Date.now() - activeGame.started) / 60000
        )
    }
}
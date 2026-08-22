import { startRound } from "./activeRound";
import { addCourse, addLayout, courseExists } from "./courses";
import { addPlayer } from "./players";
import { addHistory } from "./history";
import { data } from "react-router-dom";
import { ScoreMode } from "./settings";
import { clearPlayerStatsCache } from "./stats";

export default function GenTestData() {
    localStorage.clear();
    clearPlayerStatsCache()

    const players = [];
    players.push(addPlayer("Liam", "#057a14"));
    players.push(addPlayer("Viggo", "#ad0f78"));
    players.push(addPlayer("Seth", "#0d078b"));
    players.push(addPlayer("Emanuel", "#d9bd08"));

    const course1 = addCourse("Skutberet");
    const layout1 = addLayout(course1.id, "Full 18 hål", 1428, 18);

    const newSettings = {};

    startRound(course1, layout1, players, newSettings);
}

function genTestHistory(players, course, layout, rounds) {
    const createScores = (index) => 
        Array.from({ length: layout.holes }, (_, i) => 2 + (Math.round(Math.random() * 4)) + index);

    for (let round = 0; round < rounds; round++) {
        addHistory({
            id: crypto.randomUUID(),

            course: {
                id: course.id,
                name: course.name,
                layout: {
                    id: layout.id,
                    name: layout.name
                },
                length: layout.length,
                hole: layout.holes
            },

            players: players.slice(0, -1).map((player, index) => ({
                id: player.id,
                name: player.name,
                color: player.color,
                hanicap: 0,
                scores: createScores(index)
            })),

            date: Date.now() - (3 - round) * 86400000,
            durationMin: 60 + round * 10
        })
    }
}
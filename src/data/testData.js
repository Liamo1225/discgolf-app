import { startRound } from "./activeRound";
import { addCourse, addLayout, courseExists } from "./courses";
import { addPlayer } from "./players";
import { addHistory } from "./history";
import { data } from "react-router-dom";
import { SecondaryInfo } from "./settings";
import { clearPlayerStatsCache } from "./stats";

export default function GenTestData() {
    localStorage.clear();
    clearPlayerStatsCache()

    const players = [];
    players.push(addPlayer("Player1", "#057a14"));
    players.push(addPlayer("Player2", "#ad0f78"));
    players.push(addPlayer("Player3", "#0d078b"));
    players.push(addPlayer("Player4", "#d9bd08"));
    players.push(addPlayer("Player5", "#683406"));

    const course = addCourse("Test Course");
    const layout = addLayout(course.id, "Lay1", 1000, 9);

    genTestHistory(players, course, layout);

    const newSettings = {
        playerInfo: SecondaryInfo.BEST_POSSIBLE
    }

    startRound(course, layout, players, newSettings);
}

function genTestHistory(players, course, layout) {
    const createScores = (index) => 
        Array.from({ length: layout.holes }, (_, i) => 2 + (Math.round(Math.random() * 4)) + index);

    for (let round = 0; round < 3; round++) {
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
            durationMin: 60 + round * 3
        })
    }
}
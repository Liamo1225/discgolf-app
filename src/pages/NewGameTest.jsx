import { useNavigate } from "react-router-dom";
import { calcHandicap } from "../data/playerData.js"
import { createGame } from "../data/gameData.js"

export default function NewGameTest() {
    const navigate = useNavigate();

    function startGameTest() {

        const course = {
            id: "course_test",
            name: "Test Course",
            length: 1429,
            holes: 18
        };

        const players = [
            {
                id: "player_1",
                name: "Liam",
                color: "green",
                history: [
                    {
                        throws: 35,
                        distance: 612
                    },
                    {
                        throws: 34,
                        distance: 717
                    },
                    {
                        throws: 36,
                        distance: 759
                    }
                ]
            },
            {
                id: "player_2",
                name: "Wilma",
                color: "red",
                history: [
                    {
                        throws: 41,
                        distance: 612
                    },
                    {
                        throws: 42,
                        distance: 717
                    },
                    {
                        throws: 37,
                        distance: 759
                    }
                ]
            }
        ]

        const gamePlayers = players.map(player => ({
            ...player,
            handicap: calcHandicap(player, 5)
        }));

        const worst = Math.max(
            ...gamePlayers.map(players => players.handicap)
        );

        const playersWithHandicap = gamePlayers.map(player => ({
            ...player,
            handicap: Math.round(
                (worst - player.handicap) * course.length
            )
        }));

        const settings = {
            showTotal: true,
            handicapMode: true
        };

        createGame(
            course,
            playersWithHandicap,
            settings
        );

        navigate("/scorecard")
    }

    return (
        <div>
            <h1>New Game Test</h1>

            <button onClick={startGameTest}>
                Start Test Game
            </button>
        </div>
    )
}
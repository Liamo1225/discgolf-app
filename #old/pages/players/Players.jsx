import "./Players.css";

import { useNavigate } from "react-router-dom";
import { getPlayers } from "../../data/players";
import { getHistory } from "../../data/history";

import {
    ArrowLeft,
    PersonPlusFill
} from "react-bootstrap-icons";

import Player from "./components/Player";

export default function Players() {
    const navigate = useNavigate()

    const players = getPlayers();
    const history = getHistory();

    const roundsPlayed = {};

    history.forEach(round => {
        round.players.forEach(player => 
            roundsPlayed[player.id] = (roundsPlayed[player.id] || 0) + 1
        );
    });

    const sortedPlayer = players.sort(
        (a, b) => roundsPlayed[b.id] - roundsPlayed[a.id]);

    return (
        <div className="players">
            <header className="header">
                <button
                    className="back-btn"
                    onClick={() => navigate("/")}
                >
                    <ArrowLeft size={42} />
                </button>

                <h1>Players</h1>

                <button
                    className="head-add-btn"
                    onClick={() => {}}
                >
                    <PersonPlusFill size={35} />
                </button>
            </header>

            <main className="player-list">
                {
                    sortedPlayer.map((player) => (
                        <Player
                            key={player.id}
                            player={player}
                            roundsPlayed={roundsPlayed[player.id] || 0} />
                    ))
                }

                <button
                    className="list-add-btn"
                    onClick={() => {}}
                >
                    + New Player
                </button>
            </main>
        </div>
    );
}

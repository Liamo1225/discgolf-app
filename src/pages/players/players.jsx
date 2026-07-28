import "./players.css";

import { useNavigate } from "react-router-dom";
import { getPlayers } from "../../data/players";
import { calcRoundsPlayedAll } from "../../data/stats";

import {
    ArrowLeft,
    PersonFill,
    Plus,
    ThreeDots
} from "react-bootstrap-icons";

export default function Players() {
    const navigate = useNavigate()

    const players = getPlayers();
    const roundsPlayed = calcRoundsPlayedAll();

    const sortedPlayer = players.sort(
        (a, b) => roundsPlayed.get(b.id) - roundsPlayed.get(a.id));

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
                    <Plus size={42} />
                </button>
            </header>

            <main className="player-list">
                {
                    sortedPlayer.map((player) => (
                        <div className="player" key={player.id}>
                            <div className="player-info">
                                <PersonFill size={40} color={player.color} />
                                <h2 className="player-name">{player.name}</h2>
                            </div>

                            <div className="player-right">
                                <span className="rounds-played">{`Rounds: ${roundsPlayed.get(player.id) ?? 0}`}</span>
                                <button
                                    className="edit-btn"
                                    onClick={() => {}}
                                >
                                    <ThreeDots size={30} />
                                </button>
                            </div>
                        </div>
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
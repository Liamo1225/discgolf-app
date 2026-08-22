import { useNavigate } from "react-router-dom";

import "./SummaryContent.css";

import { getScoreOffset, getSecondaryText, getTotal } from "../../../data/scores";
import { ScoreMode } from "../../../data/settings";
import { endRound } from "../../..//data/activeRound";

export default function SummaryContent({ round }) {
    const navigate = useNavigate();

    const standings = [...round.players];

    const podium = [
        { player: standings[1], place: 2, medal: "🥈" },
        { player: standings[0], place: 1, medal: "🥇" },
        { player: standings[2], place: 3, medal: "🥉" },
    ];

    return (
        <>
            <div className="podium">
                {
                    podium.map(({ player, place, medal }) => (
                        <div
                            key={player.id}
                            className={`podium-player ${
                                place === 1 ? "first" :
                                place === 2 ? "second" :
                                "third"
                            }`}
                        >
                            <div className="podium-name">
                                {player.name}
                            </div>

                            <div className="podium-place">
                                {medal}
                            </div>
                        </div>
                    ))
                }
            </div>

            {
                standings.map((player, index) => {
                    const total = getSecondaryText(player, round, ScoreMode.TOTAL);
                    const handicap = getSecondaryText(player, round, ScoreMode.TOTAL_HANDICAP);
                    const personalBest = getSecondaryText(player, round, ScoreMode.TOTAL);
                    const bestPossible = getSecondaryText(player, round, ScoreMode.TOTAL);

                    return (
                        <div
                            key={player.id}
                            className="summary-player"
                        >
                            <h3>
                                {index + 1}. {player.name}
                            </h3>

                            <div className="summary-row">
                                <span>Score</span>
                                <span>{total}</span>
                            </div>

                            <div className="summary-row">
                                <span>Handicap</span>
                                <span>{handicap}</span>
                            </div>

                            <div className="summary-row">
                                <span>Personal Best</span>
                                <span>{personalBest}</span>
                            </div>
                            
                            <div className="summary-row">
                                <span>Best Possible</span>
                                <span>{bestPossible}</span>
                            </div>
                        </div>
                    );
                })
            }

            <button
                className="summary-end-btn"
                onClick={() => {
                    endRound();
                    navigate("/");
                }}
            >
                End Round
            </button>
        </>
    )
}
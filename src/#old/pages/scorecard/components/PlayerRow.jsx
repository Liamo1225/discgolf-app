import "./PlayerRow.css";

import {
    getScoreOffset,
    getTotal,
    getSecondaryText
} from "../../../data/scores";

import { ScoreMode } from "../../../data/settings";
import { getPlayerStats } from "../../../data/stats";

import {
    PersonFill,
    DashCircleFill,
    PlusCircleFill,
    Dash
} from "react-bootstrap-icons";

export default function PlayerRow({ player, round, onChangeScore }) {
    const score = player.scores[round.currentHole - 1];

    return (
        <div className="player-row">
            <div className="player">

                <PersonFill
                    size={40}
                    color={player.color}
                />

                <div className="player-info">

                    <div className={`${round.roundSettings.showScore === false ? "big-" : ""}player-name`}>
                        {player.name}
                    </div>

                    {
                        round.roundSettings.showScore && (
                            <div className="player-secondary-info">
                                {getSecondaryText(player, round, round.roundSettings.scoreMode)}
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="player-score">

                <button
                    className="score-btn"
                    onClick={() => onChangeScore(player.id, -1)}
                >
                    <DashCircleFill size={40}/>
                </button>

                {
                    score === 0 ? (
                        <span className="score-value zero">
                            _
                        </span>
                    ) : (
                        <span className="score-value">
                            {score}
                        </span>
                    )
                }
                
                <button
                    className="score-btn"
                    onClick={() => onChangeScore(player.id, 1)}
                >
                    <PlusCircleFill size={40}/>
                </button>

            </div>

        </div>
    );
}
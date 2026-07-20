import "./PlayerRow.css"
import { getDistFromFirst } from "../../../data/gameData";

import {
    PersonFill,
    DashCircleFill,
    PlusCircleFill,
    Dash
} from "react-bootstrap-icons";

export default function PlayerRow({
    player,
    currentHole,
    onChangeScore,
    gameData
}) {

    const score = player.scores[currentHole - 1];

    let total = player.scores.reduce((sum, score) => sum + score, 0);

    if (gameData.settings.handicapMode) {
        total += player.handicap;
    }

    function onIncrease() {
        onChangeScore(player.id, 1);
    }

    function onDecrease() {
        onChangeScore(player.id, -1);
    }

    return (
        <div className="player-row">

            <div className="player">

                <PersonFill
                    size={40}
                    color={player.color}
                />

                {
                    gameData.settings.handicapMode
                    ? <>
                        <div className="player-info">
                            <div className="player-name">
                                {player.name}
                            </div>

                            <div className="player-total">
                                {
                                    `+${getDistFromFirst(player, gameData)} (${total})`
                                }
                            </div>
                        </div>
                    </>
                    : <div className="big-player-name">
                            {player.name}
                     </div>                   
                }
                

            </div>

            <div className="player-score">

                <button
                    className="score-btn"
                    onClick={onDecrease}
                >
                    <DashCircleFill size={40}/>
                </button>

                {
                    score === 0
                    ? <span className="score-value zero">_</span>
                    : <span className="score-value">{score}</span>
                }
                

                <button
                    className="score-btn"
                    onClick={onIncrease}
                >
                    <PlusCircleFill size={40}/>
                </button>

            </div>

        </div>
    );
}
import { getGameData } from "../data/gameData";
import "./css/PlayerRow.css";

import {
    PersonFill,
    DashCircle,
    PlusCircle
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

            <div className="player-icon">

                <PersonFill
                    size={30}
                    color={player.color}
                />

                <div className="player-info">

                    <div className="player-name">
                        {player.name}
                    </div>

                    <div className="player-total">
                        {total}
                    </div>

                </div>

            </div>

            <div className="player-score">

                <button
                    className="decrease-btn"
                    onClick={onDecrease}
                >
                    <DashCircle size={28}/>
                </button>

                <span className="score-value">
                    {score === 0 ? "-" : score}
                </span>

                <button
                    className="increase-btn"
                    onClick={onIncrease}
                >
                    <PlusCircle size={28}/>
                </button>

            </div>

        </div>
    );
}
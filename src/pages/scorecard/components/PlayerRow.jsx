import "./PlayerRow.css";

import { getScore, getScoreOffset, getTotal } from "../../../data/activeGame";
import { getPlayer } from "../../../data/players";

import {
    PersonFill,
    DashCircleFill,
    PlusCircleFill,
    Dash
} from "react-bootstrap-icons";

export default function PlayerRow({ playerId, game, onChangeScore }) {
    const player = getPlayer(playerId);
    const gamePlayer = game.players.find(player => player.id === playerId);

    const score = getScore(playerId, game.currentHole);
    const total = getTotal(playerId) + (game.gameSettings.handicapMode ? gamePlayer.handicap : 0);

    return (
        <div className="player-row">
            <div className="player">

                <PersonFill
                    size={40}
                    color={player.color}
                />

                {
                    game.gameSettings.handicapMode ? (
                        <div className="player-info">
                            <div className="player-name">
                                {player.name}
                            </div>

                            <div className="player-total">
                                {
                                    `+${getScoreOffset(playerId)} (${total})`
                                }
                            </div>
                        </div>
                    ) : (
                        <div className="big-player-name">
                            {player.name}
                        </div> 
                    )                
                }
            </div>

            <div className="player-score">

                <button
                    className="score-btn"
                    onClick={() => onChangeScore(playerId, -1)}
                >
                    <DashCircleFill size={40}/>
                </button>

                {
                    score === 0 ? (
                        <span className="score-value zero">_</span>
                    ) : (
                        <span className="score-value">{score}</span>
                    )
                }
                
                <button
                    className="score-btn"
                    onClick={() => onChangeScore(playerId, 1)}
                >
                    <PlusCircleFill size={40}/>
                </button>

            </div>

        </div>
    );
}
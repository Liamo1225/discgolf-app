import "./PlayerRow.css";

import {
    getScore,
    getScoreOffset,
    getTotal
} from "../../../data/activeRound";

import { getPlayer, getPlayers } from "../../../data/players";
import { getPlayerStats } from "../../../data/history";

import {
    PersonFill,
    DashCircleFill,
    PlusCircleFill,
    Dash
} from "react-bootstrap-icons";

export const SecondaryInfo = {
    NONE: "none",
    TOTAL: "total",
    TOTAL_HANDICAP: "total_handicap",
    PERSONAL_BEST: "personalBest",
    BEST_POSSIBLE: "bestPossible"
};

function getSecondaryText(player, roundPlayer, round) {
    const total = getTotal(roundPlayer.scores);
    const handicapTotal = total + roundPlayer.handicap;

    switch (round.roundSettings.playerInfo) {
        case SecondaryInfo.TOTAL:
            return `+${getScoreOffset(playerId)} (${total})`;
        
        case SecondaryInfo.TOTAL_HANDICAP:
            return `+${getScoreOffset(playerId, true)} (${handicapTotal})`;
        
        case SecondaryInfo.PERSONAL_BEST: {
            const stats = getPlayerStats(
                playerId, round.courseId, round.layoutId
            );

            if (!stats.bestRound)
                return "???";

            const best = stats.bestRound.total;
            const diff = total - best;

            return `+${diff} (${total}) ★${stats.bestRound.scores[round.currentHole - 1]}`;
        }
        
        case SecondaryInfo.BEST_POSSIBLE: {
            const stats = getPlayerStats(
                playerId, round.courseId, round.layoutId
            );

            if (!stats,bestHoleScores.length)
                return "???";

            const bestPossible = stats.best
        }
        
        case SecondaryInfo.NONE:
        default:
            return "";
    }
}

export default function PlayerRow({ playerId, round, onChangeScore }) {
    const player = getPlayer(playerId);
    const roundPlayer = round.players.find(player => player.id === playerId);

    const score = getScore(playerId, round.currentHole);

    return (
        <div className="player-row">
            <div className="player">

                <PersonFill
                    size={40}
                    color={player.color}
                />

                <div className="player-info">

                    <div className={`${round.roundSettings.playerInfo !== SecondaryInfo.NONE ? "big-" : ""}player-name`}>
                        {player.name}
                    </div>

                    <div className="player-secondary-info">
                        {
                            getSecondaryText(
                                playerId,
                                roundPlayer,
                                round
                            )
                        }
                    </div>
                </div>
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
                    onClick={() => onChangeScore(playerId, 1)}
                >
                    <PlusCircleFill size={40}/>
                </button>

            </div>

        </div>
    );
}
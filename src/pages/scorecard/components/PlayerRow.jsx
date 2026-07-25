import "./PlayerRow.css";

import { getScoreOffset, getTotal } from "../../../data/scores";

import { getPlayerStats } from "../../../data/stats";
import { SecondaryInfo } from "../../../data/settings";

import {
    PersonFill,
    DashCircleFill,
    PlusCircleFill,
    Dash
} from "react-bootstrap-icons";

function getSecondaryText(player, round) {
    const total = getTotal(player.scores);
    const handicapTotal = total + player.handicap;

    switch (round.roundSettings.playerInfo) {
        case SecondaryInfo.TOTAL:
            return `+${getScoreOffset(player.id, false)} (${total})`;
        
        case SecondaryInfo.TOTAL_HANDICAP:
            return `+${getScoreOffset(player.id, true)} (${handicapTotal})`;
        
        case SecondaryInfo.PERSONAL_BEST: {
            const stats = player.stats;

            if (!stats.bestRound)
                return "???";

            const best = getTotal(
                stats.bestRound,
                player.scores
            );

            const diff = total - best;
            const currentBest = stats.bestRound[round.currentHole - 1];

            return `${formatDiff(diff)} (${total}) ★${currentBest}`;
        }
        
        case SecondaryInfo.BEST_POSSIBLE: {
            const stats = player.stats;

            if (!stats.bestScores.length)
                return "???";

            const bestPossible = getTotal(
                stats.bestScores,
                player.scores
            );

            const diff = total - bestPossible;
            const currentBest = stats.bestScores[round.currentHole - 1];

            return `${formatDiff(diff)} (${total}) ★${currentBest}`;
        }
        
        case SecondaryInfo.NONE:
        default:
            return "";
    }
}

function formatDiff(value) {
    return value >= 0 ? `+${value}` : `${value}`;
}

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

                    <div className={`${round.roundSettings.playerInfo !== SecondaryInfo.NONE ? "big-" : ""}player-name`}>
                        {player.name}
                    </div>

                    <div className="player-secondary-info">
                        {getSecondaryText(player, round)}
                    </div>
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
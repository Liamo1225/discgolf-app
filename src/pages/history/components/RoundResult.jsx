import "./RoundResult.css";

import { getTotal } from "../../../data/activeRound";

export function RoundResult({ expanded, players}) {
    return (
        <div className="round-result">
            {
                !expanded ? (
                    <>
                        <div className="top-players">
                            {
                                players.slice(0, 3).map((player) => (
                                    <div
                                        key={player.id}
                                        className="player-chip"
                                    >
                                        <span>{player.name}</span>
                                        <span>{getTotal(player.scores)}</span>
                                    </div>
                                ))
                            }
                        </div>

                        {
                            players.length > 3 && (
                                <div className="more-players">
                                    +{players.length - 3}
                                </div>
                            )
                        }
                    </>
                ) : (
                    <div className="all-players">
                        {
                            players.map((player, index) => (
                                <div
                                    key={player.id}
                                    className="player-row"
                                >
                                    <span>
                                        {index + 1}. {player.name}
                                    </span>

                                    <span>
                                        {getTotal(player.scores)}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}
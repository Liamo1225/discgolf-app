import { RoundResult } from "./RoundResult";

import { getHistory } from "../../../data/history";
import { useState } from "react";

import { getTotal } from "../../../data/activeRound";

export function RoundList() {
    const history = getHistory();

    const [expandedRound, setExpandedRound] = useState(null);

    return (
        <main className="history-list">
            {
                history.map((round) => {
                    const players = [...round.players].sort(
                        (a, b) => getTotal(a.scores) - getTotal(b.scores)
                    );

                    const expanded = expandedRound === round.id;

                    return (
                        <div
                            key={round.id}
                            className="history-round"
                            onClick={() =>
                                setExpandedRound(
                                    expanded ? null : round.id
                                )
                            }
                        >
                            <div className="round-header">
                                <div className="round-name">
                                    <h2>{round.course.name}</h2>
                                    <span>{round.course.layoutName}</span>
                                </div>

                                <div className="round-info">
                                    <span>{round.course.length}</span>
                                    <span>{round.course.holes}</span>
                                </div>
                            </div>

                            <RoundResult
                                expanded={expanded}
                                players={players}
                            />
                        </div>
                    );
                })
            }
        </main>
    );
}
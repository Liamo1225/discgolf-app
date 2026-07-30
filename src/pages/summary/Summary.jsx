import { useState } from "react";
import { checkScoresComplete } from "../../data/scores";

import "./Summary.css"

import SummaryContent from "./components/SummaryContent";

export default function Summary({round}) {
    const scoresComplete = checkScoresComplete(round);
    const [showIncomplete, setShowIncomplete] = useState(scoresComplete);
    
    return (
        <div className="summary">
            <h2>Final Standings</h2>

            <div className="seperator"></div>

            <div className="summary-content">
                {
                    !showIncomplete ? (
                        <div className="summary-warning">
                            <h3>⚠️ Scores incomplete</h3>

                            <p>
                                All scores have not been filled out yet.
                                Complete the round to see standings.
                            </p>

                            <button
                                onClick={() => setShowIncomplete(true)}
                            >
                                Show Summary Anyway
                            </button>
                        </div>
                    ) : (
                        <SummaryContent round={round} />
                    )
                }
            </div>
        </div>
    )
}
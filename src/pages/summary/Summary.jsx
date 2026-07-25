import { useNavigate } from "react-router-dom";

import { convertActiveToHistory, addHistory } from "../..//data/history"
import { endRound } from "../..//data/activeRound";

import "./Summary.css"

export default function Summary({round}) {
    const navigate = useNavigate();

    return (
        <div className="summary"
            onClick={() => {
                console.log(round);
                const historyEntry = convertActiveToHistory(round);
                addHistory(historyEntry);
                endRound();
                navigate("/");
            }}>
            
        </div>
    )
}
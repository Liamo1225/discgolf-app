import "./Summary.css"

import { convertActiveToHistory, addHistory } from "../../../data/history"
import { useNavigate } from "react-router-dom";
import { endRound } from "../../../data/activeRound";

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
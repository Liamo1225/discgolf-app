import { useRef, useState } from "react";

import "./ScoreCard.css";

import ScoreHeader from "./components/ScoreHeader";
import HoleSelector from "./components/HoleSelector";
import PlayerList from "./components/PlayerList";

import {
    changeHole,
    changeScore,
    getActiveRound,
    getTotal
} from "../../data/activeRound";

const SWIPE_THRESHOLE = 60;

export default function Scorecard() {
    const [roundData, setRoundData] = useState(getActiveRound());
    const startX = useRef(0);

    if (!roundData) {
        return <h2>No active round</h2>;
    }

    function onChangeHole(amount) {
        const updatedRound = changeHole(amount);

        if (updatedRound) {
            setRoundData(updatedRound)
        }
    }

    function onChangeScore(playerId, amount) {
        const updatedRound = changeScore(playerId, roundData.currentHole, amount);

        if (updatedRound) {
            setRoundData(updatedRound);
        }
    }

    function handlePointerDown(event) {
        startX.current = event.clientX;
    }

    function handlePointerUp(event) {
        const delta = startX.current - event.clientX;

        if (Math.abs(delta) >= SWIPE_THRESHOLE) {
            onChangeHole(Math.sign(delta));
        }
    }

    return (
        <div
            className="scorecard"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
        >
            <ScoreHeader courseId={roundData.courseId}/>

            <HoleSelector
                round={roundData}
                onChangeHole={onChangeHole}
            />

            <div className="seperator"></div>

            <PlayerList 
                round={roundData}
                onChangeScore={onChangeScore}
            />
        </div>
    );
}
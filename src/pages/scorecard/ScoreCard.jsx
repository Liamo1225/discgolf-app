import { useRef, useState } from "react";

import "./ScoreCard.css";

import ScoreHeader from "./components/ScoreHeader";
import HoleSelector from "./components/HoleSelector";
import PlayerList from "./components/PlayerList";

import {
    changeHole,
    changeScore,
    getActiveGame,
    getTotal
} from "../../data/activeGame";

const SWIPE_THRESHOLE = 60;

export default function Scorecard() {
    const [gameData, setGameData] = useState(getActiveGame());
    const startX = useRef(0);

    if (!gameData) {
        return <h2>No active game</h2>;
    }

    function onChangeHole(amount) {
        const updatedGame = changeHole(amount);

        if (updatedGame) {
            setGameData(updatedGame)
        }
    }

    function onChangeScore(playerId, amount) {
        const updatedGame = changeScore(playerId, gameData.currentHole, amount);

        if (updatedGame) {
            setGameData(updatedGame);
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
            <ScoreHeader courseId={gameData.courseId}/>

            <HoleSelector
                game={gameData}
                onChangeHole={onChangeHole}
            />

            <div className="seperator"></div>

            <PlayerList 
                game={gameData}
                onChangeScore={onChangeScore}
            />
        </div>
    );
}
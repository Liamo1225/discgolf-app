import { useState, useRef } from "react"

import "./ScoreCard.css"

import ScoreHeader from "./components/ScoreHeader";
import HoleSelector from "./components/HoleSelector"
import PlayerList from "./components/PlayerList";

import {
    getGameData,
    getPlayerTotal,
    changePlayerScore,
    setCurrentHole
} from "../../data/gameData";

export default function Scorecard() {

    const [gameData, setGameData] = useState(getGameData());
    const [playerOrder, setPlayerOrder] = useState(() =>
        getSortedPlayerOrder(
            gameData.players,
            gameData.players.map(p => p.id),
            gameData.settings.handicapMode
        )
    );

    if (!gameData) {
        return <h2>No active game</h2>;
    }

    function handleChangeScore(playerId, amount) {
        const updatedGame = changePlayerScore(
            playerId,
            gameData.currentHole,
            amount
        );

        setGameData(updatedGame);
    }

    function handleChangeHole(amount) {
        const newHole = Math.min(
            gameData.course.holes + 1,
            Math.max(1, gameData.currentHole + amount)
        );

        if (newHole === gameData.currentHole) return;

        const updatedGame = setCurrentHole(newHole);

        setPlayerOrder(
            getSortedPlayerOrder(
                updatedGame.players,
                playerOrder,
                updatedGame.settings.handicapMode
            )
        );

        setGameData(updatedGame);
    }

    function getSortedPlayerOrder(players, previousOrder, handicapMode) {
        const previousIndex = new Map(
            previousOrder.map((id, index) => [id, index])
        );

        return [...players]
            .sort((a, b) => {
                const aTotal = getPlayerTotal(a);
                const bTotal = getPlayerTotal(b);

                const scoreDiff = handicapMode
                    ? (aTotal + a.handicap) - (bTotal + b.handicap)
                    : aTotal - bTotal;

                if (scoreDiff !== 0) return scoreDiff;

                return previousIndex.get(a.id) - previousIndex.get(b.id);
            })
            .map(player => player.id);
    }

    const startX = useRef(0);

    function handlePointerDown(e) {
        startX.current = e.clientX;
    }

    function handlePointerUp(e) {
        const delta = startX.current - e.clientX;

        if (Math.abs(delta) > 60) {
            handleChangeHole(Math.sign(delta));
        }
    }

    return (
        <div
            className="scorecard"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
        >
            <ScoreHeader courseName={gameData.course.name}/>

            <HoleSelector gameData={gameData} handleChangeHole={handleChangeHole}/>

            <div className="seperator"></div>

            <PlayerList
                gameData={gameData}
                playerOrder={playerOrder}
                handleChangeScore={handleChangeScore}
            />
        </div>
    );
}
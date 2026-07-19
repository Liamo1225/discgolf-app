import { useState, useRef } from "react";
import { getPlayerTotal } from "../data/gameData";
import PlayerRow from "../components/PlayerRow";
import "../css/ScoreCard.css"

import {
    getGameData,
    changePlayerScore,
    setCurrentHole
} from "../data/gameData";

import {
    BoxArrowLeft,
    ThreeDots,
    ChevronCompactLeft,
    ChevronCompactRight
} from "react-bootstrap-icons";

export default function Scorecard() {

    const [gameData, setGameData] = useState(getGameData());
    const [playerOrder, setPlayerOrder] = useState(() =>
        getSortedPlayerOrder(
            gameData.players,
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
            gameData.course.holes,
            Math.max(1, gameData.currentHole + amount)
        );

        if (newHole === gameData.currentHole) return;

        const updatedGame = setCurrentHole(newHole);

        setPlayerOrder(
            getSortedPlayerOrder(
                updatedGame.players,
                updatedGame.settings.handicapMode
            )
        );

        setGameData(updatedGame);
    }

    function getSortedPlayerOrder(players, handicapMode) {
        return [...players]
            .sort((a, b) => {
                const aTotal = getPlayerTotal(a);
                const bTotal = getPlayerTotal(b);

                return handicapMode
                    ? (aTotal + a.handicap) - (bTotal + b.handicap)
                    : aTotal - bTotal;
            })
            .map(player => player.id);
    }

    const startX = useRef(0);

    function handlePointerDown(e) {
        startX.current = e.clientX;
    }

    function handlePointerUp(e) {
        const delta = e.clientX - startX.current;

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
            <header className="header">
                <button
                    className="exit-btn"
                    onClick={() => {}}
                >
                    <BoxArrowLeft size={42}/>
                </button>
                <h1>{gameData.course.name}</h1>
                <button
                    className="settings-btn"
                    onClick={() => {}}
                >
                    <ThreeDots size={42}/>
                </button>
            </header>

            <section className="hole-section">

                <button
                    className={
                        `change-hole-btn 
                        ${gameData.currentHole === 1 ? "hide" : ""}`
                    }
                    onClick={() => handleChangeHole(-1)}
                >
                    <ChevronCompactLeft size={75}/>
                </button>

                <div className="hole-info">

                    <h3 className="hole-label">Hole</h3>
                    <h4 className="hole-number">{gameData.currentHole}</h4>

                </div>

                <button
                    className={
                        `change-hole-btn 
                        ${gameData.currentHole === gameData.course.holes ? "hide" : ""}`
                    }
                    onClick={() => handleChangeHole(1)}
                >
                    <ChevronCompactRight size={75}/>
                </button>

            </section>

            <div className="seperator"></div>

            <div className="player-list">
                {
                    playerOrder.map(id => {
                        const player = gameData.players.find(p => p.id === id); 
                        
                        return (
                            <PlayerRow
                                key={player.id}
                                player={player}
                                currentHole={gameData.currentHole}
                                onChangeScore={handleChangeScore}
                                gameData={gameData}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}
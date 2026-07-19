import { useState, useRef } from "react";
import PlayerRow from "../components/PlayerRow";

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

    function handleChangeHole(amount) {
        const newHole = Math.min(
            gameData.course.holes,
            Math.max(1, gameData.currentHole + amount)
        );

        setGameData(setCurrentHole(newHole));
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
                    className="prev-hole-btn"
                    onClick={() => handleChangeHole(-1)}
                >
                    <ChevronCompactLeft size={42}/>
                </button>

                <div className="hole-info">

                    <h3 className="hole-label">Hole</h3>
                    <h4 className="hole-number">{gameData.currentHole}</h4>

                </div>

                <button
                    className="next-hole-btn"
                    onClick={() => handleChangeHole(1)}
                >
                    <ChevronCompactRight size={42}/>
                </button>

            </section>

            {gameData.players.map(player => (

                <PlayerRow
                    key={player.id}
                    player={player}
                    currentHole={gameData.currentHole}
                    onChangeScore={handleChangeScore}
                    gameData={gameData}
                />

            ))}

        </div>
    );
}
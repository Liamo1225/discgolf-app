import { useNavigate } from "react-router-dom";
import "./Home.css"

import MenuButtons from "./components/MenuButtons";
import HomeStats from "./components/HomeStats";

import { getGameData } from "../../data/gameData";

export default function Home() {
    const navigate = useNavigate();

    const ongoingGame = getGameData() ? true : false;

    function handleStartGame() {
        if (ongoingGame) {
            console.log("Resume game");
            navigate("/scorecard");
        } else {
            console.log("Start new game");
            navigate("/new-game-test");
        }
    }

    return (
        <div className="home">

            <header className="header">
                <h1>Discgolf App</h1>
            </header>


            <main className="menu">

                <MenuButtons
                    handleStartGame={handleStartGame}
                    ongoingGame={ongoingGame}
                />

            </main>

            <HomeStats />

        </div>
    );
}
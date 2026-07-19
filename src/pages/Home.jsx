import "../css/Home.css"
import { useNavigate } from "react-router-dom";

import {
    GearFill,
    PeopleFill,
    ClockHistory,
    GeoAltFill,
    PlayFill,
    ArrowRepeat,
} from "react-bootstrap-icons";

export default function Home() {
    const navigate = useNavigate();

    // Temporary data
    // Later replace with database/localStorage/API
    const stats = {
        gamesPlayed: 15,
        lastRound: "1d",
    };

    const ongoingGame = false;

    function handleStartGame() {
        if (ongoingGame) {
            console.log("Resume game");
        } else {
            console.log("Start new game");
            navigate("/new-game-test");
        }
    }

    const menuButtons = [
        {
            className: "top-left",
            icon: <PeopleFill size={42} />,
            label: "Players",
            action: () => console.log("Open players")
        },
        {
            className: "top-right",
            icon: <ClockHistory size={42} />,
            label: "History",
            action: () => console.log("Open history")
        },
        {
            className: "bottom-left",
            icon: <GeoAltFill size={42} />,
            label: "Courses",
            action: () => console.log("Open courses")
        },
        {
            className: "bottom-right",
            icon: <GearFill size={42} />,
            label: "Settings",
            action: () => console.log("Open settings")
        }
    ];


    return (
        <div className="home">

            <header className="header">
                <h1>Discgolf App</h1>
            </header>


            <main className="menu">

                {menuButtons.map((button, index) => (
                    <button 
                        key={index}
                        className={`quadrant ${button.className}`}
                        onClick={button.action}
                    >
                        {button.icon}
                        <span>{button.label}</span>
                    </button>
                ))}

                <button
                    className="start-btn"
                    onClick={handleStartGame}
                >
                    {ongoingGame ? (
                        <>
                            <ArrowRepeat size={50} />
                            <span>Resume</span>
                        </>
                    ) : (
                        <>
                            <PlayFill size={50} />
                            <span>Start</span>
                        </>
                    )}
                    
                </button>

            </main>


            <footer className="footer">

                <div className="stat">
                    <p>Games this year</p>
                    <h2>{stats.gamesPlayed}</h2>
                </div>

                <div className="stat">
                    <p>Last Round</p>
                    <h2>{stats.lastRound}</h2>
                </div>

            </footer>

        </div>
    );
}
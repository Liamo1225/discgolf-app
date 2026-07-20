import {
    GearFill,
    PeopleFill,
    ClockHistory,
    GeoAltFill,
    PlayFill,
    ArrowRepeat,
} from "react-bootstrap-icons";

export default function MenuButtons({
    handleStartGame,
    ongoingGame
}) {

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
        <>
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
        </>
    );
}
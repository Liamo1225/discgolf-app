import { useNavigate } from "react-router-dom";

import {
    GearFill,
    PeopleFill,
    ClockHistory,
    GeoAltFill,
    PlayFill,
    ArrowRepeat,
} from "react-bootstrap-icons"

import { getActiveRound } from "../../../data/activeRound";

import GenTestData from "../../../data/testData";

export default function MenuButtons() {
    const navigate = useNavigate();

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
            action: () => localStorage.clear()
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

    const ongoingRound = getActiveRound() ? true : false;

    function onStartRound() {
        if (ongoingRound) {
            console.log("Resume round");
            navigate("/scorecard");
        } else {
            console.log("Start new round");
            GenTestData();
            navigate("/scorecard");
        }
    }

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
                onClick={onStartRound}
            >
                {ongoingRound ? (
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
import { useNavigate } from "react-router-dom";
import { getActiveRound } from "../../../data/activeRound";

import {
    GearFill,
    PeopleFill,
    ClockHistory,
    GeoAltFill,
    PlayFill,
    ArrowRepeat,
} from "react-bootstrap-icons";

import GenTestData from "../../../data/testData";

export default function HomeButtons() {
    const navigate = useNavigate();

    const homeButtons = [
        {
            className: "top-left",
            icon: <PeopleFill size={42} />,
            label: "Players",
            action: () => navigate("/players")
        },
        {
            className: "top-right",
            icon: <ClockHistory size={42} />,
            label: "History",
            action: () => navigate("/history")
        },
        {
            className: "bottom-left",
            icon: <GeoAltFill size={42} />,
            label: "Courses",
            action: () => navigate("/courses")
        },
        {
            className: "bottom-right",
            icon: <GearFill size={42} />,
            label: "Settings",
            action: () => navigate("/settings")
        }
    ];

    const ongoingRound = getActiveRound() ? true : false;

    function onStartRound() {
        if (ongoingRound) {
            navigate("/scorecard");
        } else {
            GenTestData();
            navigate("/scorecard"); // new game page
        }
    }

    return (
        <>
            {
                homeButtons.map((button, index) => (
                    <button
                        key={index}
                        className={`quadrant ${button.className}`}
                        onClick={button.action}
                    >
                        {button.icon}
                        <span>{button.label}</span>
                    </button>
                ))
            }

            <button
                className="start-btn"
                onClick={onStartRound}
            >
                {
                    ongoingRound ? (
                        <>
                            <ArrowRepeat size={50} />
                            <span>Resume</span>
                        </>
                    ) : (
                        <>
                            <PlayFill size={50} />
                            <span>Start</span>
                        </>
                    )
                }
            </button>
        </>
    );
}
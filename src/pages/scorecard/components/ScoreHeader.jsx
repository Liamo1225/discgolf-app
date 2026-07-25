import { useNavigate } from "react-router-dom";
import { useModal } from "../../../utils/modal/ModalContext";

import ScorecardSettings from "../../../utils/modal/windows/ScorecardSettings";

import {
    BoxArrowLeft,
    ThreeDots
} from "react-bootstrap-icons";

export default function ScoreHeader({round}) {
    const navigate = useNavigate();
    const { openModal } = useModal();

    const courseName = round.course?.name ?? "Unknown Course";
    const layoutName = round.course.layout?.name ?? "Unknown Layout";

    return (
        <header className="header">
            <button
                className="exit-btn"
                onClick={() => navigate("/")}
            >
                <BoxArrowLeft size={42}/>
            </button>

            <div className="header-name">
                <h1>{courseName}</h1>
                <h2>{layoutName}</h2>
            </div>
            


            <button
                className="settings-btn"
                onClick={() => openModal(<ScorecardSettings />)}
            >
                <ThreeDots size={42}/>
            </button>
        </header>
    );
}
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../main/modal/ModalContext";

import { getCourse } from "../../../data/course";
import ScorecardSettings from "../../../main/modal/windows/ScorecardSettings";

import {
    BoxArrowLeft,
    ThreeDots
} from "react-bootstrap-icons";

export default function ScoreHeader({courseId}) {
    const navigate = useNavigate();

    const { openModal } = useModal();

    const courseName = getCourse(courseId)?.name ?? "Unknown Course";

    return (
        <header className="header">
            <button
                className="exit-btn"
                onClick={() => navigate("/")}
            >
                <BoxArrowLeft size={42}/>
            </button>

            <h1>{courseName}</h1>

            <button
                className="settings-btn"
                onClick={() => openModal(<ScorecardSettings />)}
            >
                <ThreeDots size={42}/>★
            </button>
        </header>
    );
}
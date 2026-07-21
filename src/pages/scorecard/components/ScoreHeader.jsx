import { useNavigate } from "react-router-dom"
import { getCourse } from "../../../data/course";

import {
    BoxArrowLeft,
    ThreeDots
} from "react-bootstrap-icons";

export default function ScoreHeader({courseId}) {
    const navigate = useNavigate();

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
                onClick={() => {}}
            >
                <ThreeDots size={42}/>
            </button>
        </header>
    );
}
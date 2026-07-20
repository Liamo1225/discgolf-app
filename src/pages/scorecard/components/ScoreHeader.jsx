import { useNavigate } from "react-router-dom"

import {
    BoxArrowLeft,
    ThreeDots
} from "react-bootstrap-icons";

export default function ScoreHeader({courseName}) {
    const navigate = useNavigate();

    return (
        <header className="header">
                <button
                    className="exit-btn"
                    onClick={() => {navigate("/");}}
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
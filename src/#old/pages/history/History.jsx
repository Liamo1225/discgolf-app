import "./History.css";

import { useNavigate } from "react-router-dom";
import { RoundList } from "./components/RoundList";

import {
    ArrowLeft,
    Plus
} from "react-bootstrap-icons";

export default function History () {
    const navigate = useNavigate();

    return (
        <div className="history">
            <header className="header">
                <button
                    className="back-btn"
                    onClick={() => navigate("/")}
                >
                    <ArrowLeft size={42} />
                </button>

                <h1>History</h1>

                <button
                    className="head-add-btn"
                    onClick={() => {}}
                >
                    <Plus size={42} />
                </button>
            </header>

            <RoundList />
        </div>
    );
}
import "./History.css";

import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import { RoundList } from "./components/RoundList";

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
            </header>

            <RoundList />
        </div>
    );
}
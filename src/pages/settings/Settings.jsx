import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";

import "./Settings.css";

export default function Settings() {
    const navigate = useNavigate();

    return (
        <div className="settings">
            <header className="header">
                <button
                    className="back-btn"
                    onClick={() => navigate("/")}
                >
                    <ArrowLeft size={42} />
                </button>

                <h1>Settings</h1>

                <div className="right-spacer"></div>
            </header>
        </div>
    );
}
import { useNavigate } from "react-router-dom";
import { setActiveRound } from "../../../data/activeRound";

import { X } from "react-bootstrap-icons";

import "./ExitModal.css";

export default function ExitModal({ closeModal }) {
    const navigate = useNavigate();

    function onButtonPress(remove) {
        if (remove) {
            setActiveRound(null);
        }

        closeModal();
        navigate("/");
    }

    return (
        <div className="exit-modal">
            <div className="exit-modal-header">
                <h3>Leave round?</h3>

                <button className="exit-modal-close" onClick={closeModal}>
                    <X size={35} />
                </button>
            </div>

            <div className="exit-modal-body">
                <p>
                    Your current round isn't finished. You can keep it and continue later,
                    or remove it.
                </p>
            </div>

            <div className="exit-modal-actions">
                <button className="exit-modal-remove" onClick={() => onButtonPress(true)}>
                    Remove round
                </button>

                <button className="exit-modal-keep" onClick={() => onButtonPress(false)}>
                    Keep & exit
                </button>
            </div>
        </div>
    );
}
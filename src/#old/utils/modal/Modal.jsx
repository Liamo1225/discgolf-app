import "./Modal.css";
import { useModal } from "./ModalContext";

export default function Modal({ open, children }) {
    const { closeModal } = useModal();

    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}
import { getCourse } from "../../../data/course";

import {
    BoxArrowLeft,
    ThreeDots
} from "react-bootstrap-icons";

import { useModal } from "../../../main/modal/ModalContext";
import ExitModal from "../../../main/modal/windows/ExitModal";

export default function ScoreHeader({courseId}) {
    const { openModal, closeModal } = useModal();

    const courseName = getCourse(courseId)?.name ?? "Unknown Course";

    return (
        <header className="header">
            <button
                className="exit-btn"
                onClick={() => openModal(<ExitModal closeModal={closeModal}/>)}
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
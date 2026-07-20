import "./HoleSelector.css"

import {
    ChevronCompactLeft,
    ChevronCompactRight,
    FlagFill
} from "react-bootstrap-icons"

export default function HoleSelector({gameData, handleChangeHole}) {

    const currentHole = gameData.currentHole;
    const startHole = gameData.course.startHole;
    const totalHoles = gameData.course.holes;

    const holes = [
        -1, 
        0,
        ...Array.from({ length: totalHoles + 3 }, (_, i) => i + 1)
    ];

    return (
        <section className="hole-section">

            <button
                className={`change-hole-btn ${currentHole === 1 ? "hide" : ""}`}
                onClick={() => handleChangeHole(-1)}
            >
                <ChevronCompactLeft size={75}/>
            </button>

            <div className="hole-info">

                <h3 className="hole-label">
                    {currentHole === totalHoles + 1 ? "Sum" : "Hole"}
                </h3>
    
                <div className="hole-numbers">
                    {
                        holes.map(hole => {
                            const offset = currentHole - hole;
                            const hidden = Math.abs(offset) > 2;

                            return (
                                <span
                                    key={hole}
                                    className={`hole-number ${
                                        offset === 0 ? "active" : Math.abs(offset) === 1 ? "near" : hidden ? "far" : ""
                                    }`}
                                >
                                    {hole >= 1 && hole <= totalHoles ? hole : hole === totalHoles + 1 ? <FlagFill size={40} /> : ""}
                                </span>
                            );
                        })
                    }
                </div>
            </div>

            <button
                className={`change-hole-btn ${currentHole === totalHoles + 1 ? "hide" : ""}`}
                onClick={() => handleChangeHole(1)}
            >
                <ChevronCompactRight size={75}/>
            </button>

        </section>
    )
}
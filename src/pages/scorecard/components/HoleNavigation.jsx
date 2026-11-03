import {
  ChevronCompactLeft,
  ChevronCompactRight,
  FlagFill,
} from "react-bootstrap-icons";

import { Button } from "../../../components/Button";

export default function HoleNavigation({ round, onChangeHole }) {
  const totalHoles = round.course.holes;
  const currentHole = round.currentHole;

  const holes = Array.from({ length: totalHoles + 5 }, (_, i) => i - 1);

  return (
    <section className="hole-section">
      <Button
        extraClass={`change-hole ${currentHole == 1 ? "hide" : ""}`}
        onClick={() => onChangeHole(-1)}
      >
        <ChevronCompactLeft size={75} />
      </Button>

      <div className="hole-info">
        <h3 className="hole-label">
          {currentHole === totalHoles + 1 ? "Sum" : "Hole"}
        </h3>

        <div className="hole-numbers">
          {holes.map((hole) => {
            const distance = Math.abs(currentHole - hole);

            const className = [
              "hole-number",
              distance === 0 && "active",
              distance === 1 && "near",
              distance > 2 && "far",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <span key={hole} className={className}>
                {getHoleContent(hole, totalHoles)}
              </span>
            );
          })}
        </div>
      </div>

      <Button
        extraClass={`change-hole ${currentHole == totalHoles + 1 ? "hide" : ""}`}
        onClick={() => onChangeHole(1)}
      >
        <ChevronCompactRight size={75} />
      </Button>
    </section>
  );
}

function getHoleContent(hole, totalHoles) {
  if (hole >= 1 && hole <= totalHoles) return hole;

  if (hole === totalHoles + 1) return <FlagFill size={40} />;

  return null;
}

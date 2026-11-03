import { useNavigate } from "react-router-dom";

import {
  PeopleFill,
  ClockHistory,
  GeoAltFill,
  TrophyFill,
  PlayFill,
  ArrowRepeat,
} from "react-bootstrap-icons";

import { Button } from "../../components/Button";

export default function HomeButtons() {
  const navigate = useNavigate();
  const ongoingRound = false; // !!getActiveRound();

  const homeButtons = [
    ["top-left", PeopleFill, "Players", "/players"],
    ["top-right", ClockHistory, "History", "/history"],
    ["bottom-left", GeoAltFill, "Courses", "/courses"],
    ["bottom-right", TrophyFill, "Records", "/records"],
  ];

  return (
    <>
      {homeButtons.map(([position, Icon, label, path]) => (
        <Button
          key={position}
          extraClass={`quadrant ${position}`}
          onClick={() => navigate(path)}
        >
          {
            <>
              <Icon size={42} /> <span>{label}</span>
              <div className="inner-border" />
            </>
          }
        </Button>
      ))}

      <Button
        extraClass="start-btn"
        onClick={() => navigate(ongoingRound ? "/scorecard" : "/newRound")}
      >
        {ongoingRound ? (
          <div className="start-middle">
            <ArrowRepeat size={50} />
            <span>Resume</span>
          </div>
        ) : (
          <div className="start-middle">
            <PlayFill size={50} />
            <span>Start</span>
          </div>
        )}
      </Button>
    </>
  );
}

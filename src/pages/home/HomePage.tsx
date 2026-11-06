import Header from "../../components/Header";

import "./HomePage.css";

export default function HomePage() {
  const totalRounds: number = 0;
  const lastRoundDate: number | null = null;

  return (
    <div className="home">
      <Header title="Disc Golf" />

      <main className="menu">
        <HomeButtons />
      </main>

      <footer className="footer">
        <div className="stat">
          <p>Total rounds</p>
          <h2>{totalRounds}</h2>
        </div>

        <div className="stat">
          <p>Last round</p>
          <h2>{formatLastRound(lastRoundDate)}</h2>
        </div>
      </footer>
    </div>
  );
}

// ----- Date formating ----

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
}

function formatLastRound(
  timestamp: number | null,
  dateLimit: number = 7,
): string {
  if (timestamp === null) return "-- --";

  const date = new Date(timestamp);
  const days = Math.round((startOfDay(new Date()) - startOfDay(date)) / DAY_MS);

  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < dateLimit) return `${days}d ago`;

  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  })
    .format(date)
    .replace(".", "");
}

// ----- Home buttons -----

import {
  ArrowRepeat,
  ClockHistory,
  GeoAltFill,
  PeopleFill,
  PlayFill,
  TrophyFill,
} from "react-bootstrap-icons";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HomeButtons() {
  const navigate = useNavigate();
  const activeGames = []; // all active rounds

  const homeButtons = [
    ["top-left", PeopleFill, "Players", "/players"],
    ["top-right", ClockHistory, "History", "/history"],
    ["bottom-left", GeoAltFill, "Courses", "/courses"],
    ["bottom-right", TrophyFill, "Records", "/records"],
  ] as const;

  function play() {
    if (activeGames.length > 0) {
      //show modal of latest games + new game btn
    } else {
      navigate("/new");
    }
  }

  return (
    <>
      {homeButtons.map(([position, Icon, label, path]) => (
        <Link key={position} className={`quadrant ${position}`} to={path}>
          <Icon size={42} /> <span>{label}</span>
          <div className="inner-border" />
        </Link>
      ))}

      <button className="play-btn" onClick={play}>
        <div className="play-middle">
          {activeGames.length > 0 ? (
            <>
              <ArrowRepeat size={50} />
              <span>Resume</span>
            </>
          ) : (
            <>
              <PlayFill size={50} />
              <span>Play</span>
            </>
          )}
        </div>
      </button>
    </>
  );
}

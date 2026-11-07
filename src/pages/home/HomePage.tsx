import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowRepeat,
  ClockHistory,
  GeoAltFill,
  PeopleFill,
  PlayFill,
  TrophyFill,
} from "react-bootstrap-icons";

import Header from "../../components/Header";
import { getRounds } from "../../lib/tempFunc";
import type { Round } from "../../types";

import "./HomePage.css";

// ----- Home page -----

export default function HomePage() {
  const [yearCount, setYearCount] = useState(0);
  const [active, setActive] = useState<Round[]>([]);
  const [lastDate, setLastDate] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      const [activeRounds, yearRounds, lastRound] = await Promise.all([
        getRounds({ status: "active" }),
        getRounds({ status: "done", year: getYear() }),
        getRounds({ status: "done", limit: 1 }),
      ]);

      setActive(activeRounds);
      setYearCount(yearRounds.length);
      setLastDate(lastRound.length > 0 ? lastRound[0].date : null);
    }

    loadData();
  }, []);

  return (
    <div className="homePage">
      <Header title="Disc Golf" />

      <main className="menu">
        <HomeButtons active={active} />
      </main>

      <footer className="footer">
        <div className="stat">
          <p>Total rounds</p>
          <h2>{yearCount}</h2>
        </div>

        <div className="stat">
          <p>Last round</p>
          <h2>{formatLastRound(lastDate)}</h2>
        </div>
      </footer>
    </div>
  );
}

// ----- Home buttons -----

function HomeButtons({ active }: { active: Round[] }) {
  const navigate = useNavigate();
  const hasActive = active.length > 0;

  const links = [
    ["top-left", PeopleFill, "Players", "/players"],
    ["top-right", ClockHistory, "History", "/history"],
    ["bottom-left", GeoAltFill, "Courses", "/courses"],
    ["bottom-right", TrophyFill, "Records", "/records"],
  ] as const;

  function handlePlay() {
    if (hasActive) {
      //show modal of latest games + new game btn
    } else {
      navigate("/new");
    }
  }

  return (
    <>
      {links.map(([position, Icon, label, path]) => (
        <Link key={position} className={`quadrant ${position}`} to={path}>
          <Icon size={42} /> <span>{label}</span>
          <div className="inner-border" />
        </Link>
      ))}

      <button className="play-btn" onClick={handlePlay}>
        <div className="play-middle">
          {hasActive ? (
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

// ==========================================================
// DATE STUFF (move to pther script later)
// ==========================================================

const DAY_MS = 24 * 60 * 60 * 1000;

function getYear(): number {
  return new Date().getFullYear();
}

function startOfDay(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
}

function formatLastRound(
  timestamp: number | null,
  maxDays: number = 7,
): string {
  if (timestamp === null) return "-- --";

  const date = new Date(timestamp);
  const daysAgo = Math.floor(
    (startOfDay(new Date()) - startOfDay(date)) / DAY_MS,
  );

  if (daysAgo <= 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  if (daysAgo < maxDays) return `${daysAgo}d ago`;

  return new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "short" })
    .format(date)
    .replace(".", "");
}

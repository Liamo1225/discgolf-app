import { Header } from "../../components/Header";

import "./Home.css";

import HomeButtons from "./HomeButtons";

export default function Home() {
  const totalRounds = 0;
  const lastRound = "?";

  return (
    <div className="home">
      <Header title={"Discgolf App"} />

      <main className="menu">
        <HomeButtons />
      </main>

      <footer className="footer">
        <div className="stat">
          <p>Rounds this year</p>
          <h2>{totalRounds}</h2>
        </div>

        <div className="stat">
          <p>Last round</p>
          <h2>{lastRound}</h2>
        </div>
      </footer>
    </div>
  );
}

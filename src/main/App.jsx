import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./../components/Components.css";

import Home from "../pages/home/Home";
import ScoreCard from "../pages/scorecard/ScoreCard";
import Players from "../pages/players/Players";
import History from "../pages/history/History";
import Courses from "../pages/courses/Courses";
import Records from "../pages/records/Records";
import NewRound from "../pages/newround/NewRound";

export default function App() {
  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scorecard" element={<ScoreCard />} />
        <Route path="/players" element={<Players />} />
        <Route path="/history" element={<History />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/records" element={<Records />} />
        <Route path="/newround" element={<NewRound />} />
      </Routes>
    </main>
  );
}

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import './App.css';

import Home from "../pages/home/Home";
import ScoreCard from "../pages/scorecard/ScoreCard";
import Players from "../pages/players/Players";
import History from "../pages/history/History";
import Courses from "../pages/courses/Courses";
import Settings from "../pages/settings/Settings";

import Modal from "../utils/modal/Modal";

export default function App() {
  const [modal, setModal] = useState({
    open: false,
    context: null
  });

  return (
    <main className="main-content">
      <Routes>

        <Route path="/" element={<Home />}/>
        <Route path="/scorecard" element={<ScoreCard />}/>
        <Route path="/players" element={<Players />}/>
        <Route path="/history" element={<History />}/>
        <Route path="/courses" element={<Courses />}/>
        <Route path="/settings" element={<Settings />}/>
        
      </Routes>

      <Modal
        open={modal.open}
        onClose={() =>
          setModal({
            open: false,
            context: null
          })
        }
      >
        {modal.context}
      </Modal>

    </main>
  )
}
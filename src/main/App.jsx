import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import './App.css';

import Home from "../pages/home/Home";
import ScoreCard from "../pages/scorecard/ScoreCard";

import Modal from "./modal/Modal";

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

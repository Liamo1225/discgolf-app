import { Routes, Route } from "react-router-dom"

import './App.css'

import Home from "../pages/home/Home"
import ScoreCard from "../pages/scorecard/ScoreCard"

export default function App() {
  return (
    <main className="main-content">
      <Routes>

        <Route path="/" element={<Home />}/>
        <Route path="/scorecard" element={<ScoreCard />}/>
        
      </Routes>
    </main>
  )
}

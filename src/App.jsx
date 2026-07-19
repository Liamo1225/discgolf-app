import { Routes, Route } from "react-router-dom"
import './css/App.css'
import Home from "./pages/Home"
import ScoreCard from "./pages/ScoreCard"
import NewGameTest from "./pages/NewGameTest"

function App() {
  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/scorecard" element={<ScoreCard />}/>

        <Route path="/new-game-test" element={<NewGameTest />}/>
      </Routes>
    </main>
  )
}

export default App

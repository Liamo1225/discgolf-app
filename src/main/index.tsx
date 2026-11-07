import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import { requestPersistence } from "../data/db";

import "./index.css";

import HomePage from "../pages/home/HomePage";
import PlayersPage from "../pages/players/PlayersPage";

import { loadTestData } from "../testData";

async function bootstrap() {
  await loadTestData();
  await requestPersistence();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/new" element={""} />
          <Route path="/play/:roundId" element={""} />

          <Route path="/players" element={<PlayersPage />} />
          <Route path="/players/:id" element={""} />

          <Route path="/history" element={""} />
          <Route path="/history/:id" element={""} />

          <Route path="/courses" element={""} />
          <Route path="/courses/:id" element={""} />

          <Route path="/records" element={""} />
        </Routes>
      </HashRouter>
    </StrictMode>,
  );
}

bootstrap();

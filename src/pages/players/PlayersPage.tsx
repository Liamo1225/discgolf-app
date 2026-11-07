import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

import {
  ArrowDownUp,
  ArrowLeft,
  CaretUpFill,
  PersonFill,
  PersonFillAdd,
} from "react-bootstrap-icons";

import Header from "../../components/Header";
import { calcTPM, getRounds } from "../../lib/tempFunc";
import type { Player } from "../../types";
import { db } from "../../data/db";

import "./PlayersPage.css";

const sortFields = ["name", "tpm", "rounds"] as const;
type SortField = (typeof sortFields)[number];

// ----- Players Page -----

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [tpms, setTpms] = useState<Record<string, number>>({});
  const [played, setPlayed] = useState<Record<string, number>>({});
  const [sort, setSort] = useState<SortField>("name");
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    async function loadData() {
      const allPlayers = await db.players.toArray();
      setPlayers(allPlayers);

      const counts: Record<string, number> = {};
      const tpmValues: Record<string, number> = {};

      await Promise.all(
        allPlayers.map(async (player) => {
          const rounds = await getRounds({
            playerId: player.id,
            status: "done",
          });

          counts[player.id] = rounds.length;
          tpmValues[player.id] = await calcTPM(player);
        }),
      );
      setPlayed(counts);
      setTpms(tpmValues);
    }
    loadData();
  }, []);

  const sorted = [...players].sort((a, b) => {
    const difference = {
      name: a.name.localeCompare(b.name),
      tpm: (tpms[a.id] ?? 0) - (tpms[b.id] ?? 0),
      rounds: (played[b.id] ?? 0) - (played[a.id] ?? 0),
    };
    return difference[sort] || a.name.localeCompare(b.name);
  });
  if (reverse) sorted.reverse();

  function nextSort() {
    setSort(sortFields[(sortFields.indexOf(sort) + 1) % sortFields.length]);
  }

  return (
    <div className="playersPage">
      <Header
        title="Players"
        left={
          <Link to="/">
            <ArrowLeft size={42} />
          </Link>
        }
        right={
          <button className="new-player" onClick={() => {}}>
            <PersonFillAdd size={42} />
          </button>
        }
      />

      <main className="player-list">
        <div className="player-toolbar">
          <span className="player-count">Players: {players.length}</span>

          <button className="sort-btn" onClick={nextSort}>
            <span>{sort}</span>
            <ArrowDownUp size={18} />
          </button>

          <button
            className={`reverse-btn ${reverse ? "reversed" : ""}`}
            onClick={() => setReverse(!reverse)}
          >
            <CaretUpFill size={25} />
          </button>
        </div>

        {sorted.map((player) => (
          <PlayerRow
            key={player.id}
            player={player}
            tpm={tpms[player.id] ?? 0}
            played={played[player.id] ?? 0}
          />
        ))}
      </main>
    </div>
  );
}

// ----- Player Row -----

function PlayerRow({
  player,
  tpm,
  played,
}: {
  player: Player;
  tpm: number;
  played: number;
}) {
  return (
    <motion.div
      layout="position"
      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
    >
      <Link
        key={player.id}
        to={`/players/${player.id}`}
        className="player-row"
        style={{ "--player-color": player.color } as React.CSSProperties}
      >
        <PersonFill size={42} />
        <h3 className="player-name">{player.name}</h3>
        <div className="player-stats">
          <span className="stat-label">TPM:</span>
          <span className="stat-value">{Math.round(tpm)}</span>

          <span className="stat-label">Rounds:</span>
          <span className="stat-value">{played}</span>
        </div>
      </Link>
    </motion.div>
  );
}

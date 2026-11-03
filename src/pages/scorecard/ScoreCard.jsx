import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BoxArrowLeft, GearFill } from "react-bootstrap-icons";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";

import HoleNavigation from "./components/HoleNavigation";
import ContentList from "./components/ContentList";

import "./ScoreCard.css";

const SWIPE_THRESHOLE = 60;

const testround = {
  course: {
    name: "Test",
    layout: {
      name: "Lay1",
    },
    length: 1400,
    holes: 18,
  },

  players: [
    {
      id: 0,
      name: "Player1",
      color: "#06a80b",
      scores: Array(18).fill(0),
      handicap: 0,
      stats: {
        /*get player stats*/
      },
    },
    {
      id: 1,
      name: "Player2",
      color: "#952121",
      scores: Array(18).fill(0),
      handicap: 0,
      stats: {
        /*get player stats*/
      },
    },
  ],

  roundSettings: {},

  holeOrder: [],
  currentHole: 1,

  started: Date.now(),
};

export default function ScoreCard() {
  const [roundData, setRoundData] = useState(testround); /*get active round*/
  const startX = useRef(0);
  const navigate = useNavigate();

  if (!roundData) {
    navigate("/");
  }

  function onChangeHole(amount) {
    /* Change hole from script */
  }

  function onChangeScore(playerId, amount) {
    /* Change score from script */
  }

  function onPointerDown(event) {
    startX.current = event.clientX;
  }

  function onPointerUp(event) {
    const delta = startX.current - event.clientX;

    if (Math.abs(delta) >= SWIPE_THRESHOLE) {
      onChangeHole(Math.sign(delta));
    }
  }

  return (
    <div
      className="scorecard"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <Header
        title={"Test"}
        subtitle={"Lay1"}
        leftAction={
          <Button onClick={() => navigate("/")}>
            <BoxArrowLeft size={42} />
          </Button>
        }
        rightAction={
          <Button
            onClick={() => {
              /*roundsettings popup*/
            }}
          >
            <GearFill size={35} />
          </Button>
        }
      />

      <HoleNavigation round={roundData} onChangeHole={onChangeHole} />

      <div className="seperator" />

      <ContentList round={roundData} onChangeScore={onChangeScore} />
    </div>
  );
}

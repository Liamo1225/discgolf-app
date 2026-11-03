import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { ArrowLeft } from "react-bootstrap-icons";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";

import "./NewRound.css";

import CourseSelect from "./components/CourseSelect";
import PlayersSelect from "./components/PlayersSelect";
import SettingsSelect from "./components/SettingsSelect";

export default function NewRound() {
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [players, setPlayers] = useState([]);
  const [settings, setSettings] = useState(); //default settings

  const [expanded, setExpanded] = useState("course");

  const selectSection = (section) => {
    setExpanded((current) => (current === section ? current : section));
  };

  const startRound = () => {
    /*if (!course || players.length === 0) return;*/

    //startRound from script
    navigate("/scorecard");
  };

  return (
    <div className="new-round">
      <Header
        title={"New Round"}
        subtitle={"Set up your new round"}
        leftAction={
          <Button onClick={() => navigate("/")}>
            <ArrowLeft size={42} />
          </Button>
        }
      />

      <div className="list">
        <CourseSelect
          course={course}
          setCourse={setCourse}
          expanded={expanded === "course"}
          onExpand={() => selectSection("course")}
        />

        <PlayersSelect
          players={players}
          setPlayers={setPlayers}
          expanded={expanded === "players"}
          onExpand={() => selectSection("players")}
        />

        <div className="expandable-seperator"></div>

        <SettingsSelect
          settings={settings}
          setSettings={setSettings}
          expanded={expanded === "settings"}
          onExpand={() => selectSection("settings")}
        />

        <Button
          active={true} /*{!!course && players.length > 0}*/
          onClick={startRound}
          extraClass={"start-round"}
        >
          Start Round
        </Button>
      </div>
    </div>
  );
}

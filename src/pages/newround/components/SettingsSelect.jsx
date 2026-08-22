import { Button } from "../../../components/Button";
import { ArrowRepeat } from "react-bootstrap-icons";

export default function SettingsSelect({
  settings,
  setSettings,
  expanded,
  onExpand,
}) {
  return (
    <div className={`selectcard ${expanded ? "expanded" : ""}`}>
      <div className="card-header" onClick={onExpand}>
        <h2>Settings</h2>

        <div className="card-info">
          <h4>Change the</h4>
          <h4>default settings</h4>
        </div>

        <Button
          extraClass={`header-btn ${expanded ? "expanded" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            //open new player popup
          }}
        >
          <ArrowRepeat size={35} />
        </Button>
      </div>

      <div className={`card-content ${expanded ? "expanded" : ""}`}></div>
    </div>
  );
}

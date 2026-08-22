import { PlusLg } from "react-bootstrap-icons";
import { Button } from "../../../components/Button";

export default function PlayersSelect({
  players,
  setPlayers,
  expanded,
  onExpand,
}) {
  const allPlayers = []; //getPlayers from script

  const sortedPlayers = [...allPlayers].sort((a, b) => {
    const aSelected = players.some((p) => p.id === a.id);
    const bSelected = players.some((p) => p.id === b.id);

    if (aSelected !== bSelected) {
      return Number(bSelected) - Number(aSelected);
    }

    return b.handicap - a.handicap;
  });

  return (
    <div className={`selectcard ${expanded ? "expanded" : ""}`}>
      <div className="card-header" onClick={onExpand}>
        <h2>Players</h2>

        <div className="card-info">
          <h4>{`${players.length} selected`}</h4>
        </div>

        <Button
          extraClass={`header-btn ${expanded ? "expanded" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            //open new player popup
          }}
        >
          <PlusLg size={35} />
        </Button>
      </div>

      <div className={`card-content ${expanded ? "expanded" : ""}`}>
        {sortedPlayers.map((player) => {
          const TPM = 0;
          const handicap = 0;

          const isSelected = players.some(
            (selected) => selected.id === player.id,
          );

          return (
            <Button
              key={player.id}
              onClick={(e) => {
                e.stopPropagation();

                setPlayers((current) => {
                  if (isSelected) {
                    return current.filter(
                      (selected) => selected.id !== player.id,
                    );
                  }

                  return [...current, player];
                });
              }}
              extraClass={`player ${isSelected ? "selected" : ""}`}
            >
              <div className="player-left">
                <h3>{player.name}</h3>
              </div>

              <div className="player-right">
                <span>{isSelected ? handicap : TPM}</span>

                <span className={`checkbox ${isSelected ? "checked" : ""}`}>
                  {isSelected && "✓"}
                </span>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

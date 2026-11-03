import { motion, transform } from "framer-motion";

import PlayerRow from "../components/PlayerRow";
import Summary from "../../summary/Summary";

export default function ContentList({ round, onChangeScore }) {
  if (round.currentHole > round.course.holes) {
    return <Summary round={round} />;
  }

  return (
    <div className="player-list">
      {round.players.map((player) => (
        <motion.div
          key={player.id}
          layout
          layoutId={player.id}
          transition={{ type: "spring", bounce: 0, duration: 0.35 }}
        >
          <PlayerRow
            player={player}
            round={round}
            onChangeScore={onChangeScore}
          />
        </motion.div>
      ))}
    </div>
  );
}

import { motion } from "framer-motion";

import PlayerRow from "./PlayerRow";

export default function PlayerList({ round, onChangeScore }) {
    return (
        <div className="player-list">
            {
                round.players.map(player => (
                    <motion.div
                        key={player.id}
                        layout
                        layoutId={player.id}
                        transition={{
                            type: "spring",
                            bounce: 0,
                            duration: 0.35
                        }}
                    >
                        <PlayerRow
                            player={player}
                            round={round}
                            onChangeScore={onChangeScore}
                        />
                    </motion.div>  
                ))
            }
        </div>
    );
}
import { motion } from "framer-motion";

import PlayerRow from "./PlayerRow";
import Summary from "./Summary";

import { getLayout } from "../../../data/course";

export default function PlayerList({ round, onChangeScore }) {
    const totalHoles = getLayout(round.courseId, round.layoutId).holes; 

    if (round.currentHole === totalHoles + 1) {
        return <Summary />
    }

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
                            playerId={player.id}
                            round={round}
                            onChangeScore={onChangeScore}
                        />
                    </motion.div>  
                ))
            }
        </div>
    );
}
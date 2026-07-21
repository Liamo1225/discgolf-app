import { motion } from "framer-motion";

import PlayerRow from "./PlayerRow";
import Summary from "./Summary";

import { getLayout } from "../../../data/course";

export default function PlayerList({ game, onChangeScore }) {
    const totalHoles = getLayout(game.courseId, game.layoutId).holes; 

    if (game.currentHole === totalHoles + 1) {
        return <Summary />
    }

    return (
        <div className="player-list">
            {
                game.players.map(player => (
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
                            game={game}
                            onChangeScore={onChangeScore}
                        />
                    </motion.div>  
                ))
            }
        </div>
    );
}
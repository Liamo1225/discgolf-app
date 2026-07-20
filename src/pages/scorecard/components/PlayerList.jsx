
import { motion } from "framer-motion"

import PlayerRow from "./PlayerRow"
import Summary from "./Summary"

import { BoxArrowDown } from "react-bootstrap-icons"

export default function PlayerList({gameData, playerOrder, handleChangeScore}) {
    if (gameData.currentHole === gameData.course.holes + 1) {
        return <Summary />
    }

    const playersToRender = gameData.settings.reorderPlayers && gameData.settings.showTotal
        ? playerOrder.map(id => gameData.players.find(p => p.id === id)).filter(Boolean)
        : gameData.players;

    return (
        <div className="player-list">
            {
                playersToRender.map(player => (
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
                            currentHole={gameData.currentHole}
                            onChangeScore={handleChangeScore}
                            gameData={gameData}
                        />
                    </motion.div>  
                ))
            }
        </div>
    );
}
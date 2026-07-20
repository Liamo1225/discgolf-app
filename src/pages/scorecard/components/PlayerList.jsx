import PlayerRow from "./PlayerRow";

import { motion } from "framer-motion";

export default function PlayerList({gameData, playerOrder, handleChangeScore}) {
    if (gameData.currentHole === gameData.course.holes + 1) {
        return (
            <div className="finish">
                
            </div>
        )
    }

    return (
        <div className="player-list">
            {
                playerOrder.map(id => {
                    const player = gameData.players.find(p => p.id === id); 
                    
                    return (
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
                    );
                })
            }
        </div>
    );
}
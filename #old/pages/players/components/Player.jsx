import {
    PersonFill,
    ThreeDots
} from "react-bootstrap-icons";

export default function Player({player, roundsPlayed}) {
    return (
        <div
            className="player"
            style={{ "--player-color": player.color}}
            >
                
            <div className="player-info">
                <PersonFill size={40} color={player.color} />
                <h2 className="player-name">{player.name}</h2>
            </div>

            <div className="player-right">
                <span className="rounds-played">{`Rounds: ${roundsPlayed}`}</span>
                <button
                    className="edit-btn"
                    onClick={() => {}}
                >
                    <ThreeDots size={30} />
                </button>
            </div>
        </div>
    )
}
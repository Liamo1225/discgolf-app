import { getHistory } from "../../../data/history";

export default function HomeStats() {
    const history = getHistory();

    return (
        <footer className="footer">

            <div className="stat">

                <p>Games this year</p>
                <h2>{history.length}</h2>

            </div>

            <div className="stat">

                <p>Last round</p>
                <h2>{timeSinceLastRound(history)}</h2>

            </div>
        </footer>
    );
}

function timeSinceLastRound(history) {
    if (history.length === 0) return "?";

    const timeDiff = Date.now() - history.at(-1).date;
    const timeDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));

    return timeDays + "d";
}
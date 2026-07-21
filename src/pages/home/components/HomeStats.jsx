import { getHistory } from "../../../data/history";

export default function HomeStats() {
    const history = getHistory();

    return (
        <footer className="footer">

            <div className="stat">

                <p>
                    Games this year
                </p>

                <h2>
                    {history.length}
                </h2>
            </div>

            <div className="stat">

                <p>
                    Last round
                </p>

                <h2>
                    {
                        history.length > 0
                        ? Math.floor((Date.now() - new Date(history.at(-1).date)) / (1000 * 60 * 60 * 24)) + "d ago"
                        : "?"
                    }
                </h2>
            </div>
        </footer>
    );
}
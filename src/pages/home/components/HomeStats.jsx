import { getHistory } from "../../../data/historyData";

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
                    {history.length > 0 ? history[-1].endend : "?"}
                </h2>
            </div>
        </footer>
    );
}
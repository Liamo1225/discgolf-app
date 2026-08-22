import { ThreeDots } from "react-bootstrap-icons";

export default function Layout({ layout, layoutStats}) {
    const timesPlayed = layoutStats[layout.id]?.timesPlayed ?? 0;
    const totalTime = layoutStats[layout.id]?.totalDurationMin ?? 0;

    return (
        <div className="layout">
            <div className="layout-info">
                <h3>{layout.name}</h3>

                <div className="layout-stats">
                    <span>
                        {layout.holes} holes
                    </span>

                    <span>
                        {layout.length}m
                    </span>

                    <span>
                        Rounds: {timesPlayed}
                    </span>

                    <span>
                        ~{formatDuration(totalTime, timesPlayed)}
                    </span>
                </div>
            </div>

            <button
                className="edit-btn"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <ThreeDots size={30} />
            </button>
        </div>
    );
}

function formatDuration(totalMinutes, timesPlayed) {
    if (timesPlayed === 0) return "???";

    const avgTime = totalMinutes / timesPlayed;
    const rounded = Math.round(avgTime / 15) * 15;

    const hours = Math.floor(rounded / 60);
    const minutes = rounded % 60;

    if (hours === 0) return `${minutes}m`;
    if (minutes === 0) return `${hours}h`;

    return `${hours}h ${minutes}m`;
}

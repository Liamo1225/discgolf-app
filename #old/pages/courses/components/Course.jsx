import {
    ThreeDots
} from "react-bootstrap-icons";

import Layout from "./Layout";
import { button } from "framer-motion/client";

export default function Course({ course, courseStats, layoutStats, expanded, setExpanded }) {
    const sortedLayouts = [...course.layouts].sort(
        (a, b) => a.length - b.length
    );

    return (
        <div className="course">
            <div
                className="course-top"
                onClick={() => setExpanded(prev => prev === course.id ? null : course.id)}
            >

                <div className="course-info">
                    <h2>
                        {course.name}
                    </h2>

                    <div className="course-stats">
                        <span>
                            Layouts: {course.layouts.length}
                        </span>

                        <span>
                            Rounds: {courseStats[course.id]?.timesPlayed ?? 0}
                        </span>                       
                    </div>
                    
                </div>
            
                <button
                    className="edit-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <ThreeDots size={35} />
                </button>
            </div>

            <div className="layout-list">
                {
                    expanded && (
                        <>
                            {
                                sortedLayouts.map(layout => (
                                    <Layout
                                        key={layout.id}
                                        layout={layout}
                                        layoutStats={layoutStats}
                                    />
                                ))
                            }

                            <button
                                className="new-layout-btn"
                                onClick={() => {}}
                            >
                                + New Layout
                            </button>
                        </>
                    )
                }
            </div>
        </div>
    );
}
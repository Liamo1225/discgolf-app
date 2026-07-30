import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Courses.css";

import { getHistory } from "../../data/history";
import { getCourses } from "../../data/courses";

import {
    ArrowLeft,
    Plus
} from "react-bootstrap-icons";

import Course from "./components/Course";

export default function Courses() {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(null);

    const courses = getCourses();
    const history = getHistory();

    const courseStats = {};
    const layoutStats = {};

    history.forEach(round => {
        const courseId = round.course.id;
        const layoutId = round.course.layout.id;
        const durationMin = round.durationMin;

        courseStats[courseId] ??= {
            timesPlayed: 0,
        };
        courseStats[courseId].timesPlayed++;

        layoutStats[layoutId] ??= {
            timesPlayed: 0,
            totalDurationMin: 0,
        };
        layoutStats[layoutId].timesPlayed++;
        layoutStats[layoutId].totalDurationMin += durationMin;
    });

    const sortedCourses = [...courses].sort(
        (a, b) => courseStats[b.id] - courseStats[a.id]
    );

    return (
        <div className="courses">

            <header className="header">
                <button
                    className="back-btn"
                    onClick={() => navigate("/")}
                >
                    <ArrowLeft size={42}/>
                </button>

                <h1>Courses</h1>

                <button className="add-course-btn">
                    <Plus size={42}/>
                </button>
                
            </header>

            <div className="course-list">
                {
                    <>
                        {
                            sortedCourses.map(course => (
                                <Course
                                    key={course.id}
                                    course={course}
                                    courseStats={courseStats}
                                    layoutStats={layoutStats}
                                    expanded={expanded === course.id}
                                    setExpanded={setExpanded}
                                />
                            ))
                        }

                        <button className="new-course-btn">
                            + New Course
                        </button>
                    </>
                }
            </div>
        </div>
    );
}
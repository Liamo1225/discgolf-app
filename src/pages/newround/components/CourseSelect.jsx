import { PlusLg, ThreeDots } from "react-bootstrap-icons";
import { Button } from "../../../components/Button";

export default function CourseSelect({
  course,
  setCourse,
  expanded,
  onExpand,
}) {
  const allCourses = [
    {
      id: 0,
      name: "Test1",
      layouts: [
        {
          id: 1,
          name: "Lay1",
          holes: 9,
          length: 578,
        },
        {
          id: 2,
          name: "Lay2",
          holes: 18,
          length: 1428,
        },
        {
          id: 3,
          name: "Lay3",
          holes: 12,
          length: 980,
        },
      ],
    },
    {
      id: 1,
      name: "Test2",
      layouts: [
        {
          id: 4,
          name: "Lay4",
          holes: 9,
          length: 679,
        },
      ],
    },
    {
      id: 2,
      name: "Test3",
      layouts: [],
    },
    {
      id: 3,
      name: "Test4",
      layouts: [],
    },
    {
      id: 4,
      name: "Test5",
      layouts: [],
    },
    {
      id: 5,
      name: "Test6",
      layouts: [],
    },
    {
      id: 6,
      name: "Test7",
      layouts: [],
    },
    {
      id: 7,
      name: "Test8",
      layouts: [],
    },
  ]; //getCourses from script

  const sortedCourses = [...allCourses].sort((a, b) => {
    if (a.id === course?.id) return -1;
    if (b.id === course?.id) return -1;

    return 0;
  });

  return (
    <div className={`selectcard ${expanded ? "expanded" : ""}`}>
      <div className="card-header" onClick={onExpand}>
        <h2>Course</h2>

        <div className="card-info">
          {course ? (
            <>
              <h3>{course.name}</h3>
              <p>{course.layout.name}</p>
            </>
          ) : (
            <>
              <h4>No course</h4>
              <h4>selected</h4>
            </>
          )}
        </div>

        <Button
          extraClass={`header-btn ${expanded ? "expanded" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            //open new course popup
          }}
        >
          <PlusLg size={35} />
        </Button>
      </div>

      <div className={`card-content ${expanded ? "expanded" : ""}`}>
        <div className="course-list">
          {sortedCourses.map((courseItem) => {
            const timesPlayed = 0;
            const lastPlayed = "?";
            const layoutCount = courseItem.layouts.length;

            return (
              <Button
                key={courseItem.id}
                onClick={(e) => {
                  e.stopPropagation();
                  //open course layout popup
                }}
                extraClass={`course ${
                  courseItem.id === course?.id ? "selected" : ""
                }`}
              >
                <div className="course-left">
                  <h3>{courseItem.name}</h3>
                  <span>
                    {layoutCount} {layoutCount === 1 ? "layout" : "layouts"}
                  </span>
                </div>

                <div className="course-right">
                  <div className="info-text">
                    <span>Last:</span>
                    <span>Rounds:</span>
                  </div>
                  <div className="info-num">
                    <span>{lastPlayed}</span>
                    <span>{timesPlayed}</span>
                  </div>
                </div>
              </Button>
            );
          })}

          <ThreeDots size={20} className="list-end" />
        </div>
      </div>
    </div>
  );
}

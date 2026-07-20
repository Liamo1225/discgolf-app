import { saveData, loadData, createUUID } from "./dataManager"
import { STORAGE_KEYS } from "./keys"

function saveCourses(courses) {
    saveData(STORAGE_KEYS.courses, courses);
}

export function getCourses() {
    return loadData(STORAGE_KEYS.courses, []);
}

export function addCourse(name, length, holes) {
    const course = {
        id: createUUID(),
        name: name,
        length: length,
        holes: holes
    }

    const courses = getCourses();
    const updatedCourses = [...courses, course];

    saveCourses(updatedCourses);
}

export function deleteCourse(id) {
    const courses = getCourses();

    const updatedCourses = courses.filter(
        course => course.id !== id
    );
    
    saveCourses(updatedCourses);
}

export function updateCourse(id, changes) {
    const courses = getCourses();

    const updatedCourses = courses.map(course =>
        course.id === id
        ? {...course, ...changes}
        : course
    );

    saveCourses(updatedCourses);
}
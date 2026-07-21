import { get, set, createUUID } from "./storage";

const KEY = "courses";

// ----- Courses -----

export function getCourses() {
    return get(KEY);
}

export function getCourse(id) {
    return getCourses().find(course => course.id === id);
}

export function courseExists(id) {
    return getCourse(id) !== undefined;
}

// ----- Course management

export function addCourse(name) {
    const courses = getCourses();

    const course = {
        id: createUUID(),
        name,
        layouts: []
    };

    set(KEY, [...courses, course]);

    return course;
}

export function updateCourse(id, updates) {
    const courses = getCourses();
    
    const updatedCourses = courses.map(course => {
        if (course.id !== id) {
            return course;
        }

        return {
            ...course, ...updates
        }
    });

    set(KEY, updatedCourses);
}

export function deleteCourse(id) {
    const courses = getCourses();

    set(KEY, courses.filter(course => course.id !== id));
}

// ----- Layouts -----

export function getLayouts(courseId) {
    const course = getCourse(courseId);

    return course ? course.layouts : [];
}

export function getLayout(courseId, layoutId) {
    const layouts = getLayouts(courseId);

    return layouts.find(layout => layout.id === layoutId);
}

// ----- Layout management -----

export function addLayout(courseId, name, length, holes) {
    const course = getCourse(courseId);

    if (!course) return null;

    const layout = {
        id: createUUID(),
        name,
        length,
        holes
    };

    updateCourse(courseId, {layouts: [...course.layouts, layout]});

    return layout;
}

export function updateLayout(courseId, layoutId, updates) {
    const course = getCourse(courseId);

    if (!course) return;

    const updatedLayouts = course.layouts.map(layout => {
        if (layout.id !== layoutId) {
            return layout;
        }

        return {
            ...layout, ...updates
        }
    });

    updateCourse(courseId, {layouts: updatedLayouts });
}

export function deleteLayout(courseId, layoutId) {
    const course = getCourse(courseId);

    if (!course) return;

    const updatedLayouts = course.layouts.filter(
        layout => layout.id !== layoutId
    );

    updateCourse(courseId, {layouts: updatedLayouts});
}


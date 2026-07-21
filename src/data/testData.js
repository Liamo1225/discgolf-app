import { startGame } from "./activeGame";
import { addCourse, addLayout } from "./course";
import { addPlayer } from "./players";

export default function GenTestData() {
    localStorage.clear();

    const players = [];
    players.push(addPlayer("Liam", "#057a14").id);
    players.push(addPlayer("Wilma", "#ad0f78").id);
    players.push(addPlayer("Benjamin", "#0d078b").id);
    players.push(addPlayer("Mamma", "#d9bd08").id);
    players.push(addPlayer("Pappa", "#683406").id);

    const course = addCourse("Test Course");
    const layout = addLayout(course.id, "Lay1", 1000, 18);

    startGame(course.id, layout.id, players);
}
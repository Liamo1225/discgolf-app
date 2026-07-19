import { saveData, loadData } from "./dataManager"
import { STORAGE_KEYS } from "./keys"
import { removeGameFromPlayers } from "./playerData";

function saveHistory(history) {
    saveData(STORAGE_KEYS.history, history);
}

export function getHistory() {
    return loadData(STORAGE_KEYS.history, []);
}

export function addGame(game) {
    const history = getHistory();

    const updatedHistory = [...history, game];

    saveHistory(updatedHistory);
    addGameToPlayers(game);
}

export function removeGame(id) {
    const history = getHistory();

    const updatedHistory = history.filter(
        game => game.id !== id
    );

    saveHistory(updatedHistory);

    removeGameFromPlayers(id);
}
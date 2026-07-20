import { saveData, loadData, createUUID } from "./dataManager"
import { STORAGE_KEYS } from "./keys"

function savePlayers(players) {
    saveData(STORAGE_KEYS.players, players);
}

export function getPlayers() {
    return loadData(STORAGE_KEYS.players, []);
}

export function addPlayer(name, color) {
    const player = {
        id: createUUID(),
        name: name,
        color: color
    }

    const players = getPlayers();
    const updatedPlayers = [...players, player];

    savePlayers(updatedPlayers);
}

export function deletePlayer(id) {
    const players = getPlayers();

    const updatedPlayers = players.filter(
        player => player.id !== id
    );
    
    savePlayers(updatedPlayers);
}

export function updatePlayer(id, changes) {
    const players = getPlayers();

    const updatedPlayers = players.map(player =>
        player.id === id
        ? {...player, ...changes}
        : player
    );

    savePlayers(updatedPlayers);
}

export function calcHandicap(player, games = 5) {
    const recentGames = getHistory()
        .filter(game => game.players.some(p => p.id === player.id))
        .sort((a, b) => new Date(b.ended).getTime() - new Date(a.ended).getTime())
        .slice(-games);

    let throws = 0;
    let meters = 0;

    for (const game of recentGames) {
        const score = game.players.find(p => p.id === player.id).score;

        throws += score.reduce((sum, holeScore) => sum + holeScore, 0);
        meters += game.course.length;
    }

    if (meters === 0) {
        return 0;
    }

    return throws / meters;
}
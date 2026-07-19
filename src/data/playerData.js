import { saveData, loadData, createUUID } from "./dataManager";
import { STORAGE_KEYS } from "./keys";

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
        color: color,
        history: []
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
    const recentGames = player.history.slice(-games);

    let throws = 0;
    let meters = 0;

    for (const game of recentGames) {
        throws += game.throws;
        meters += game.distance;
    }

    if (meters === 0) {
        return 0;
    }

    return throws / meters;
}

export function removeGameFromPlayers(id) {
    const players = getPlayers();

    const updatedPlayers = players.map(player => ({
        ...player,
        history: player.history.filter(
            game => game.id !== id
        )
    }));

    savePlayers(updatedPlayers)
}

export function addGameToPlayers(game) {
    const players = getPlayers();

    const updatedPlayers = players.map(player => {
        const gamePlayer = game.players.find(
            p => p.id === player.id
        );

        if (!gamePlayer) {
            return;
        }

        return {
            ...player,
            history: [
                ...player.history,
                {
                    roundId: game.id,
                    throws: gamePlayer.total,
                    length: game.course.length
                }
            ]
        };
    });

    savePlayers(updatedPlayers);
}
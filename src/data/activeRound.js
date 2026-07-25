import { get, set, createUUID } from "./storage";
import { getSortValue, getTotal } from "./scores";
import { getSettings, PlayerSorting, SecondaryInfo } from "./settings";
import { getPlayerStats } from "./stats";
import { getHistory } from "./history";

// ----- Active round -----

const KEY = "activeRound";

export function setActiveRound(round) {
    set(KEY, round);
}

export function getActiveRound() {
    return get(KEY);
}

// ----- round lifecycle -----

export function startRound(course, layout, players, settingChanges = {}) {
    const round = {
        id: createUUID(),

        course: {
            id: course.id,
            name: course.name,
            layout: {
                id: layout.id,
                name: layout.name
            },
            length: layout.length,
            holes: layout.holes
        },
            
        players: players.map(player => ({
            id: player.id,
            name: player.name,
            color: player.color,
            scores: Array(layout.holes).fill(0),
            handicap: 0,
            stats: getPlayerStats(player.id, course.id, layout.id)
        })),

        roundSettings: {
            ...getSettings().defaultNewRound,
            ...settingChanges
        },

        holeOrder: layout.holeOrder,
        currentHole: 1,

        started: Date.now()
    };

    const updatedRound = setHandicap(round);
    updatedRound.players = reorderPlayers(updatedRound);
    setActiveRound(updatedRound);
    
    return updatedRound;
}

export function endRound() {
    const round = getActiveRound();

    setActiveRound(null);
    
    return round;
}

// ----- Hole navigation -----

export function changeHole(amount) {
    const round = getActiveRound();

    const holes = round.course.holes;

    const newHole = Math.min(
        holes + 1,
        Math.max(1, round.currentHole + amount)
    );

    if (newHole === round.currentHole) return;

    const newPlayerOrder = reorderPlayers(round);

    const updatedRound = {
        ...round,
        players: newPlayerOrder, 
        currentHole: newHole
    }

    set(KEY, updatedRound);
    return updatedRound;
}

function reorderPlayers(round) {
    if (round.roundSettings.playerInfo === SecondaryInfo.NONE) return round.players;
    if (round.roundSettings.playerOrder === PlayerSorting.STATIC) return round.players;

    const updatedOrder = [...round.players].sort((a, b) => {
        const aTotal = getSortValue(a, round);
        const bTotal = getSortValue(b, round)

        return aTotal - bTotal;
    });

    return updatedOrder;
}

// ----- Round settings -----

export function updateRoundSettings(updates) {
    const round = getActiveRound();

    const updatedRound = {
        ...round,
        roundSettings: {
            ...round.roundSettings,
            ...updates
        }
    }

    set(KEY, updatedRound);
    return updatedRound;
}

export function setHandicap(round) {
    const settings = getSettings();
    const historyLength = settings.handicapHistory ?? Infinity;

    const courseLength = round.course.length;

    const history = getHistory();

    const playerData = round.players.map(player => {
        let throws = 0;
        let length = 0;
        let games = 0;

        for (let i = history.length - 1; i >= 0 && games < historyLength; i--) {
            const historyRound = history[i];

            const historyPlayer = historyRound.players.find(
                p => p.id === player.id
            );

            if (!historyPlayer) continue;

            throws += getTotal(historyPlayer.scores);
            length += historyRound.course.length;
            games++;
        }

        return {
            player,
            TPM: length > 0 ? throws / length : Infinity
        };
    });

    const bestTPM = Math.min(
        ...playerData.map(p => p.TPM).filter(Number.isFinite)
    );

    return {
        ...round,
        players: playerData.map(({ player, TPM }) => {
            const playerTPM = Number.isFinite(TPM) ? TPM : bestTPM;

            return {
                ...player,
                handicap: Math.round((playerTPM - bestTPM) * courseLength) 
            };
        })
    }
}

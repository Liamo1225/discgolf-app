import { get, set, createUUID } from "./storage";
import { getLayout } from "./courses";
import { getTotal } from "./scores";
import { getSettings } from "./settings";

// ----- Active round -----

const KEY = "activeRound";

export function setActiveRound(round) {
    set(KEY, round);
}

export function getActiveRound() {
    return get(KEY);
}

// ----- round lifecycle -----

export function startRound(courseId, layoutId, playerIds, settingChanges = {}) {
    const layout = getLayout(courseId, layoutId);

    const round = {
        id: createUUID(),

        courseId,
        layoutId,

        players: playerIds.map(id => ({
            id,
            scores: Array(layout.holes).fill(0),
            handicap: 0
        })),

        roundSettings: {
            ...getSettings().defaultNewRound,
            ...settingChanges
        },

        holeOrder: layout.holeOrder,
        currentHole: 1,

        started: Date.now()
    };

    setActiveRound(round);

    return round;
}

export function endRound() {
    const round = getActiveRound();

    setActiveRound(null);
    
    return round;
}

// ----- Hole navigation -----

export function changeHole(amount) {
    const round = getActiveRound();

    const holes = getLayout(round.courseId, round.layoutId).holes;

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
    if (!round.roundSettings.showTotal) return;
    if (round.roundSettings.playerOrder === "static") return;

    const updatedOrder = round.players.sort((a, b) => {
        const aTotal = getTotal(a.scores);
        const bTotal = getTotal(b.scores);

        if (round.roundSettings.handicapMode) {
            return (aTotal + a.handicap) - (bTotal + b.handicap);
        }

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

export function setHandicap() {
    const round = getActiveRound();

}
import { db } from "../data/db";
import type { ID, Player, Round } from "../types";

export interface RoundFilters {
  year?: number;
  status?: Round["status"];
  courseId?: ID;
  layoutId?: ID;
  playerId?: ID;
  limit?: number;
}

export async function getRounds(filters: RoundFilters = {}): Promise<Round[]> {
  const allRounds = await db.rounds.toArray();

  const matchingRounds = allRounds.filter((round) => {
    if (filters.year && new Date(round.date).getFullYear() !== filters.year) {
      return false;
    }
    if (filters.status && round.status !== filters.status) {
      return false;
    }
    if (filters.courseId && round.courseId !== filters.courseId) {
      return false;
    }
    if (filters.layoutId && round.layoutId !== filters.layoutId) {
      return false;
    }
    if (
      filters.playerId &&
      !round.players.some((roundPlayer) => roundPlayer.id === filters.playerId)
    ) {
      return false;
    }
    return true;
  });

  matchingRounds.sort((roundA, roundB) => roundB.date - roundA.date);

  return matchingRounds.slice(0, filters.limit ?? matchingRounds.length);
}

const TPM_ROUNDS = 5;

export async function calcTPM(player: Player): Promise<number> {
  const lastRounds = await getRounds({
    playerId: player.id,
    status: "done",
    limit: TPM_ROUNDS,
  });

  const roundTPMs = lastRounds.map((round) => {
    let throws = 0;
    let meters = 0;

    round.scores[player.id]?.forEach((score, holeIdx) => {
      if (score == null) return;
      throws += score * 1000;
      meters += round.holes[holeIdx].length;
    });

    return meters > 0 ? throws / meters : player.startTPM;
  });

  while (roundTPMs.length < TPM_ROUNDS && player.startTPM != 0) {
    roundTPMs.push(player.startTPM);
  }

  const total = roundTPMs.reduce((sum, tpm) => sum + tpm, 0);
  return roundTPMs.length > 0 ? total / roundTPMs.length : 0;
}

export function pluralize(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

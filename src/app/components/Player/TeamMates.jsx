import React from "react";
import Link from "next/link";

function calculateWinRate(playerData, teammateId) {
  const gamesWithTeammate =
    playerData.games.filter((game) =>
      game.teams.some(
        (team) =>
          team.players.some((player) => player._id === playerData._id) &&
          team.players.some((player) => player._id === teammateId)
      )
    ) || [];

  const gamesWonWithTeammate = gamesWithTeammate.filter((game) => {
    const userTeam = game.teams.find((team) =>
      team.players.some((player) => player._id === playerData._id)
    );
    return userTeam && userTeam.winner;
  });

  const winRate =
    (gamesWonWithTeammate.length / gamesWithTeammate.length) * 100 || 0;

  return winRate.toFixed(2);
}

function findTopTeammates(playerData) {
  const teammatesMap = new Map();
  const topTeammates = [];

  playerData.games.forEach((game) => {
    const userTeam = game.teams.find((team) =>
      team.players.some((player) => player._id === playerData._id)
    );

    if (!userTeam) return;

    const teammate = userTeam.players.find(
      (player) => player._id !== playerData._id
    );

    if (!teammate) return;

    const teammateId = teammate._id;

    if (teammatesMap.has(teammateId)) {
      teammatesMap.set(teammateId, {
        teammate,
        gamesWithTeammate: teammatesMap.get(teammateId).gamesWithTeammate + 1,
      });
    } else {
      teammatesMap.set(teammateId, {
        teammate,
        gamesWithTeammate: 1,
      });
    }
  });

  const sortedTeammates = Array.from(teammatesMap.values()).sort(
    (a, b) => b.gamesWithTeammate - a.gamesWithTeammate
  );

  topTeammates.push(...sortedTeammates.slice(0, 3));

  return topTeammates;
}

const TopTeammatesStats = ({ playerData }) => {
  const topTeammates = findTopTeammates(playerData);

  return (
    <div>
      <h2 className="rounded-full bg-purple-900 py-2 px-4 text-white">
        Best performance with teammates
      </h2>
      {topTeammates.map(({ teammate, gamesWithTeammate }) => (
        <div key={teammate._id} className="ml-3 mt-3">
          <Link
            className="hover:text-gray-600 hover:underline"
            href={`/player/${teammate._id}`}
          >
            <p className="mb-1">
              {teammate.firstName} {teammate.lastName}:
            </p>
          </Link>
          <div className="flex justify-between">
            <p>{gamesWithTeammate} games</p>
            <p>Win Rate: {calculateWinRate(playerData, teammate._id)}%</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const TeamMates = ({ playerData }) => {
  return (
    <div className="flex justify-evenly h-full">
      <div>
        <TopTeammatesStats playerData={playerData} />
      </div>
    </div>
  );
};

export default TeamMates;

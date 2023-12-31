import React from "react";
import Link from "next/link";

function Singles({ playerData }) {
  const mixedGames =
    playerData?.games?.filter((game) => game.matchType === "Mixed doubles") ||
    [];

  return (
    <div>
      <h1 className="font-bold text-center text-1xl text-slate-500 mt-6 bg-neutral rounded-t-md text-white">
        Mixed doubles
      </h1>
      {mixedGames.length > 0 ? (
        <div className="flex flex-col justify-center items-center divide-y divide-accent">
          {mixedGames.slice(0, 5).map((game) => {
            const userTeam = game.teams.find((team) =>
              team.players.some((player) => player._id === playerData._id)
            );

            if (!userTeam) return ndivl;

            const gameResult = userTeam.winner ? "won" : "lost";
            const bgClass =
              gameResult === "won" ? "bg-green-500" : "bg-red-500";
            const textClass =
              gameResult === "won" ? "text-green-900" : "text-red-900";

            const opposingTeam = game.teams.find((team) => team !== userTeam);

            const userPlayer = userTeam.players.find(
              (player) => player._id === playerData._id
            );
            const userPartner = userTeam.players.find(
              (player) => player._id !== playerData._id
            );

            return (
              <div key={game._id} className="bg-gray-100 shadow-lg w-full">
                {/* Players */}
                <div className="flex flex-col divide-y divide-yellow-100 text-xs">
                  <div className="flex mb-1">
                    <div className="flex flex-col justify-center ml-3 mr-6 px-2 mb-1 mt-1 w-1/3">
                      <p className={`${textClass}`}>
                        {userPlayer.firstName} {userPlayer.lastName.charAt(0)}.
                      </p>
                      {userPartner ? (
                        <Link
                          className="hover:text-white hover:underline"
                          href={`/player/${userPartner._id}`}
                        >
                          <p>
                            {userPartner.firstName}{" "}
                            {userPartner.lastName.charAt(0)}.
                          </p>
                        </Link>
                      ) : null}
                    </div>
                    <div className="flex justify-center items-center mr-3">
                      <p className="text-accent px-2 py-1 m-2 bg-gray-200">
                        {userTeam.score.sets}
                      </p>
                      <p className="text-accent px-2 py-1 m-2 bg-gray-200">
                        {userTeam.score.games}
                      </p>
                      <p className="text-accent px-2 py-1 m-2 bg-gray-200">
                        {userTeam.score.points}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col justify-center ml-3 mt-1 mr-6 px-2 mb-2 w-1/3">
                      {opposingTeam.players.map((player) => (
                        <Link
                          className="hover:text-accent hover:underline"
                          href={`/player/${player._id}`}
                        >
                          <p key={player._id}>
                            {player.firstName} {player.lastName.charAt(0)}.
                          </p>
                        </Link>
                      ))}
                    </div>
                    <div className="flex justify-center items-center mr-3">
                      <p className="text-accent px-2 py-1 m-2 bg-gray-200">
                        {opposingTeam.score.sets}
                      </p>
                      <p className="text-accent px-2 py-1 m-2 bg-gray-200">
                        {opposingTeam.score.games}
                      </p>
                      <p className="text-accent px-2 py-1 m-2 bg-gray-200">
                        {opposingTeam.score.points}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mx-3 mt-3">No games played yet.</p>
      )}
    </div>
  );
}

export default Singles;

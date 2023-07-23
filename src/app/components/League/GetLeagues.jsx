import DeleteLeague from "./DeleteLeague";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { LeaguesContext } from "../../context/leagues.context.js";
import Link from "next/link";
import LeagueModal from "../modals/league.modal";
import JoinLeague from "./JoinLeague";
import { useEffect } from "react";

const GetLeagues = () => {
  const { leagues } = useContext(LeaguesContext);
  const { playerData, getPlayerData, isLoggedIn } = useContext(AuthContext);
  const [selectedLeague, setSelectedLeague] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      getPlayerData();
    }
  }, [isLoggedIn]);
  if (!isLoggedIn) {
    return null;
  }

  const handleOpenModal = (league) => {
    setSelectedLeague(league);
  };

  const handleCloseModal = () => {
    setSelectedLeague(null);
  };

  return (
    <div className="mt-8 grid grid-cols-4 gap-20">
      {leagues.map((league) => (
        <div
          key={league._id}
          className="card card-compact w-72 bg-base-100 shadow-xl"
        >
          <figure className="w-72 h-72 bg-white">
            <img src={league.leagueLogo} alt="League logo" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{league.name}</h2>

            <p className="text-md font-semibold">Location: {league.location}</p>

            <p className="text-md font-semibold">
              Open for registration?:{" "}
              {league.registrationOpen === true ? "Yes" : "No"}
            </p>
          </div>
          <div>
            {/* Get league details */}
            <button
              onClick={() => handleOpenModal(league)}
              className="btn btn-primary m-2"
            >
              View Details
            </button>
            {selectedLeague && (
              <LeagueModal league={selectedLeague} onClose={handleCloseModal} />
            )}
          </div>
          {isLoggedIn && (
            <div className="card-actions flex justify-between mt-2">
              {/* Delete league */}
              <DeleteLeague leagueId={league._id} />
              {/* Edit league */}
              <Link
                className="btn btn-info mr-2"
                href={`/leagues/edit/${league._id}`}
                passHref
              >
                Edit
              </Link>
              {/* <Link
                className="btn btn-secondary mx-2 mb-2"
                href={`/leagues/join/${league._id}`}
                passHref
              >
                Join
              </Link> */}
              <JoinLeague leagueId={league._id} playerId={playerData._id} />
            </div>
          )}

          {/* Join league */}
          {/* <Link
            className="btn btn-secondary mx-2 mb-2"
            href={`/leagues/join/${league._id}`}
            passHref
          >
            Join
          </Link> */}
          {/* <JoinLeague></JoinLeague> */}
        </div>
      ))}
    </div>
  );
};

export default GetLeagues;

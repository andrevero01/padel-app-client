import { useState, useEffect } from "react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { LeaguesContext } from "../../context/leagues.context.js";
import DeleteLeague from "./DeleteLeague";
import LeagueDetailsModal from "../modals/leagueDetails.modal";
import JoinLeague from "./JoinLeague";
import LeagueLogin from "./LeageLogin";

const GetLeagues = () => {
  const { leagues } = useContext(LeaguesContext);
  const { playerData, getPlayerData, isLoggedIn } = useContext(AuthContext);

  const [selectedLeague, setSelectedLeague] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      getPlayerData();
    }
  }, [isLoggedIn]);

  const handleOpenModal = (league) => {
    setSelectedLeague(league);
  };

  const handleCloseModal = () => {
    setSelectedLeague(null);
  };

  return (
    <div className="drawer drawer-end ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 lg:gap-16 drawer-content">
        {leagues.map((league) => (
          <div
            key={league._id}
            className="card card-compact w-44 lg:w-72 bg-base-100 shadow-xl"
          >
            <figure className="w-44 h-44 lg:w-72 lg:h-72 bg-white">
              <img src={league.leagueLogo} alt="League logo" />
            </figure>
            <div className="card-body bg-gray-900">
              <h2 className="card-title text-primary">{league.name}</h2>
              <div className="flex justify-around">
                <span className="text-md font-medium">
                  📍 {league.location}
                </span>
                <span>|</span>
                <span className="text-md font-medium">
                  {league.registrationOpen === true
                    ? "Open for registration"
                    : "Closed"}
                </span>
              </div>
              <div className="flex justify-around">
                <span>Deadline: {league.registrationDeadline}</span>
                <span className="text-info font-bold">
                  € {league.registrationFee}{" "}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center bg-gray-900 rounded-b-2xl">
              {/* Get league details */}
              <button
                onClick={() => handleOpenModal(league)}
                className="btn btn-primary m-2 w-2/3"
              >
                View Details
              </button>
              {selectedLeague && (
                <LeagueDetailsModal
                  league={selectedLeague}
                  onClose={handleCloseModal}
                />
              )}

              {/* Join league */}
              {isLoggedIn ? (
                <JoinLeague leagueId={league._id} playerId={playerData._id} />
              ) : (
                <label
                  htmlFor="my-drawer-4"
                  className="drawer-button btn btn-secondary w-2/3 text-white mb-4 ml-2"
                >
                  Join
                </label>
              )}
            </div>
            {isLoggedIn && playerData._id == league.createdBy && (
              <div className="card-actions flex justify-center mt-2 bg-gray-900 rounded-b-2xl">
                {/* Delete league / Edit league */}
                <DeleteLeague leagueId={league._id} />
                <Link
                  className="bg-info  hover:bg-blue-600 font-bold py-2 px-4 rounded my-4  text-white text-center w-1/3 opacity-8 "
                  href={`/leagues/edit/${league._id}`}
                  passHref
                >
                  Edit
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Login sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu p-4 w-200 h-full bg-base-200 text-base">
          {/* Sidebar content here */}
          <li>{<LeagueLogin />}</li>
        </ul>
      </div>
    </div>
  );
};

export default GetLeagues;

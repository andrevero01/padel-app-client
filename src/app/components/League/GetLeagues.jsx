import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteLeague from "./DeleteLeague";
import LeagueDetails from "./LeagueDetails";

const GetLeagues = () => {
  const [leagues, setLeagues] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5005/api/leagues").then((leagues) => {
      console.log("response.data", leagues.data);
      setLeagues(leagues.data);
    });
  }, []);
  return (
    <div className="mt-8 grid grid-cols-4 gap-20">
      {leagues.map((league) => (
        <div
          key={league._id}
          className="card card-compact bg-base-100 shadow-xl"
        >
          <figure>
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
          <LeagueDetails leagueId={league._id} />
          <div className="card-actions flex justify-between">
            <DeleteLeague leagueId={league._id} />
            <button className="btn btn-primary mb-2 mx-2  text-black">
              Join league
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetLeagues;

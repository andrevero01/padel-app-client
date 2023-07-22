import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteLeague from "./DeleteLeague";
import LeagueDetails from "./LeagueDetails";
import { useContext } from "react";
import { LeaguesContext } from "../../context/leagues.context.js";
import { AuthContext } from "@/app/context/auth.context";
import Link from "next/link";

const GetLeagues = () => {
  const { leagues, leagueDetails, getLeagueDetails } =
    useContext(LeaguesContext);
  const { isLoggedIn } = useContext(AuthContext);

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
          {isLoggedIn && (
            <div className="card-actions flex justify-between">
              <LeagueDetails leagueId={league._id} />

              <Link className="btn btn-info m-2" href="/leagues/edit-league">
                Edit
              </Link>
              <DeleteLeague leagueId={league._id} />
            </div>
          )}

          <button className="btn btn-secondary mb-4 mx-2  text-black">
            Join league
          </button>
        </div>
      ))}
    </div>
  );
};

export default GetLeagues;

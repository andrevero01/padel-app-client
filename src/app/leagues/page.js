"use client";

import React, { useEffect, useState } from "react";
import ScrollToTopButton from "../components/ScrollToTop";
import GetLeagues from "../components/League/GetLeagues";
import AddLeague from "../components/League/AddLeague";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function leaguesPage() {
  const { isLoggedIn, getPlayerData, playerData } = useContext(AuthContext);
  const [isFormVisible, setFormVisible] = useState(false);
  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };
  useEffect(() => {
    if (isLoggedIn) {
      getPlayerData();
    }
  }, [isLoggedIn]);
  return (
    <div className="flex flex-col items-center bg-gray-100">
      <div className="mt-10 mx-10 bg-white shadow-lg p-10 ">
        <h2 className="text-neutral text-xl font-bold mb-6">
          Current active leagues
        </h2>
        <GetLeagues />
      </div>
      {isLoggedIn && (
        <button
          className="btn btn-primary text-white hover-primary text-lg font-bold mb-6 mt-10  "
          onClick={toggleForm}
        >
          Add a New League
        </button>
      )}
      {isFormVisible && (
        <div className="flex-col w-full md:w-4/5 bg-white p-12 rounded-lg shadow-lg mt-10">
          <AddLeague playerId={playerData._id} />
        </div>
      )}

      <div className=" align-self-end">
        <ScrollToTopButton />
      </div>
    </div>
  );
}

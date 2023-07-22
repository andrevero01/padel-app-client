"use client";

import React, { useEffect, useState } from "react";
import ScrollToTopButton from "../components/ScrollToTop";
import GetLeagues from "../components/League/GetLeagues";
import AddLeague from "../components/League/AddLeague";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function leaguesPage() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="flex flex-col items-center  bg-gray-100">
      <div className="mt-10 mx-6">
        <h2 className="text-primary-focus text-lg font-bold mb-6">
          Current active leagues
        </h2>
        <GetLeagues />
      </div>
      {isLoggedIn && (
        <div className="flex-col w-2/3 bg-white p-12 rounded-lg shadow-lg mt-10">
          <h3 className="text-primary-focus text-lg font-bold mb-6">
            Add a New League
          </h3>
          <AddLeague />
        </div>
      )}
      <div className=" align-self-end">
        <ScrollToTopButton />
      </div>
    </div>
  );
}

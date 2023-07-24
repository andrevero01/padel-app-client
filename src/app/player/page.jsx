"use client";

import React, { useState } from "react";
import Link from "next/link";
import racket from "../../../public/racket.png";
import trophy from "../../../public/trophy.png";
import team from "../../../public/team.png";
import cogs from "../../../public/cogs.png";
import Sidebar from "@/app/components/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { playerData, getPlayerData, isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      getPlayerData();
    }
  }, [isLoggedIn]);
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex justify-evenly h-full">
      <Sidebar />

      <div className="bg-slate-200 md:mb-10 text-black h-full grow">
        {/* Title */}

        <div className="flex justify-between">
          <h1 className="ml-3 font-bold text-1xl text-slate-500">
            {playerData.firstName}'s Profile
          </h1>
          <Link href="/settings">
            <img
              src={cogs.src}
              alt="Cogs Icon"
              className="max-h-7 mr-3 mt-1 md:hidden"
            />
          </Link>
        </div>

        {/* Buttons */}

        <div className="flex justify-between md:justify-center mx-3">
          <Link href="/createGame">
            <button className="bg-green-600 w-2/5 md:w-40 rounded-lg py-3 my-5 mr-3 max-w-100 flex flex-col justify-center items-center md:grow-0">
              <img
                src={racket.src}
                alt="Racket Icon"
                className="max-h-10 my-1"
              />
              Log Game
            </button>
          </Link>
          <Link href="/leagues">
            <button className="bg-green-600 w-2/5 md:w-40 rounded-lg py-3 my-5 mr-3 max-w-100 flex flex-col justify-center items-center md:grow-0">
              <img
                src={trophy.src}
                alt="Trophy Icon"
                className="max-h-10 my-1"
              />
              Find a League
            </button>
          </Link>
          <button className="bg-green-600 w-2/5 md:w-40 rounded-lg py-3 my-5 max-w-100 flex flex-col justify-center items-center md:grow-0">
            <img src={team.src} alt="Trophy Icon" className="max-h-10 my-1" />
            Find a Team
          </button>
        </div>

        {/* Profile Picture */}

        <div className="flex flex-col justify-center items-center mx-3 my-5">
          <img
            className="h-32 max-w-fit rounded-full"
            src="https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
            alt="PlaceHolder"
          />
          <h1 className="my-5 font-semibold text-2xl">
            {playerData.firstName}
          </h1>
        </div>

        {/* Basic Stat Logs */}
        {playerData && playerData.games && playerData.leagues && (
          <div className="flex justify-center mx-3 my-5 divide-x divide-green-800">
            <div className="w-2/5 md:max-w-xs py-3 text-center text-slate-500">
              <p>{playerData.games.length || 0}</p>
              <p>Played Games</p>
            </div>
            <div className="w-2/5 md:max-w-xs py-3 text-center text-slate-500">
              <p>{playerData.games.leagues || 0} </p>
              <p>Played Leagues</p>
            </div>
            <div className="w-2/5 md:max-w-xs py-3 text-center text-slate-500">
              <p>
                {(
                  (playerData.gamesWon.length / playerData.games.length) *
                  100
                ).toFixed(2)}
                %
              </p>
              <p>Win Percentage</p>
            </div>
          </div>
        )}

        {/* Last Games */}


        {/* Statistical Breakdown */}

        <h1 className="ml-3 font-bold text-1xl mt-5 mb-5 text-slate-500">
          Statistical Breakdown
        </h1>

        <div className="carousel w-full max-h-60 mx-3">
          <div id="item1" className="carousel-item w-full">
            <img
              src="/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
              className="w-full"
            />
          </div>
          <div id="item2" className="carousel-item w-full">
            <img
              src="/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
              className="w-full"
            />
          </div>
          <div id="item3" className="carousel-item w-full">
            <img
              src="/images/stock/photo-1414694762283-acccc27bca85.jpg"
              className="w-full"
            />
          </div>
          <div id="item4" className="carousel-item w-full">
            <img
              src="/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
              className="w-full"
            />
          </div>
        </div>

        {/* Leagues */}

        <h1 className="ml-3 font-bold text-1xl mt-5 mb-5 text-slate-500">
          Leagues
        </h1>

        <div className="carousel w-full max-h-60 mx-3">
          <div id="item1" className="carousel-item w-full">
            <img
              src="/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
              className="w-full"
            />
          </div>
          <div id="item2" className="carousel-item w-full">
            <img
              src="/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
              className="w-full"
            />
          </div>
          <div id="item3" className="carousel-item w-full">
            <img
              src="/images/stock/photo-1414694762283-acccc27bca85.jpg"
              className="w-full"
            />
          </div>
          <div id="item4" className="carousel-item w-full">
            <img
              src="/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
              className="w-full"
            />
          </div>
        </div>

        {/* Teams */}

        <h1 className="ml-3 font-bold text-1xl mt-5 mb-5 text-slate-500">
          Teams
        </h1>

        <div className="carousel w-full max-h-60 mx-3">
          <div id="item1" className="carousel-item w-full">
            <img
              src="/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
              className="w-full"
            />
          </div>
          <div id="item2" className="carousel-item w-full">
            <img
              src="/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
              className="w-full"
            />
          </div>
          <div id="item3" className="carousel-item w-full">
            <img
              src="/images/stock/photo-1414694762283-acccc27bca85.jpg"
              className="w-full"
            />
          </div>
          <div id="item4" className="carousel-item w-full">
            <img
              src="/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Page;

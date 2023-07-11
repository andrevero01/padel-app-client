"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import racket from "../../../public/racket.png";
import trophy from "../../../public/trophy.png";
import team from "../../../public/team.png";
import cogs from "../../../public/cogs.png";
import Sidebar from "@/components/Sidebar";

const Page = () => {
  return (
    <div className="flex justify-evenly h-full">
      <Sidebar />

      <div className="bg-slate-200 md:mb-10 text-black h-full grow">
        {/* Title */}

        <div className="flex justify-between">
          <h1 className="ml-3 font-bold text-2xl">My Profile</h1>
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
          <button className="bg-green-800 w-2/5 md:w-40 rounded-lg py-3 md:py-0 my-5 mr-3 max-w-100 flex flex-col justify-center items-center md: grow-0">
            <img src={racket.src} alt="Racket Icon" className="max-h-10 my-1" />
            Log Game
          </button>
          <button className="bg-green-800 w-2/5 md:w-40 rounded-lg py-3 my-5 mr-3 max-w-100 flex flex-col justify-center items-center md: grow-0">
            <img src={trophy.src} alt="Trophy Icon" className="max-h-10 my-1" />
            Find a League
          </button>
          <button className="bg-green-800 w-2/5 md:w-40 rounded-lg py-3 my-5 max-w-100 flex flex-col justify-center items-center md: grow-0">
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
          <h1 className="my-5 font-semibold text-2xl">Player Name</h1>
        </div>

        {/* Basic Stat Logs */}

        <div className="flex justify-center mx-3 my-5 divide-x divide-green-800">
          <div className="w-2/5 md:max-w-xs py-3 text-center">
            <p>0</p>
            <p>Logged Games</p>
          </div>
          <div className="w-2/5 md:max-w-xs py-3 text-center">
            <p>2</p>
            <p>Leagues Played</p>
          </div>
          <div className="w-2/5 md:max-w-xs py-3 text-center">
            <p>3</p>
            <p>Tracked Players</p>
          </div>
        </div>

        {/* Graphed Output */}

        <h1 className="ml-3 font-bold text-2xl mt-16 mb-5">
          Statistical Breakdown
        </h1>

        <div></div>

        {/* Edit Information */}

        <h1 className="ml-3 font-bold text-2xl mt-16 mb-5">Edit Information</h1>

        {/* BASIC INFORMATION ACCORDION */}
      </div>
      <Sidebar />
    </div>
  );
};

export default Page;

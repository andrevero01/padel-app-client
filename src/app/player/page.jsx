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
  const [nationality, setNationality] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [club, setClub] = useState("");
  const [handedness, setHandedness] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [dominantHand, setDominantHand] = useState("");
  const [backhandType, setBackhandType] = useState("");
  const [playingStyle, setPlayingStyle] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [coach, setCoach] = useState("");
  // Add state variables here

  const [leagues, setTournaments] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const selectCountry = (val) => {
    setNationality(val);
  };

  const handleTournamentChange = (index, event) => {
    const { name, value } = event.target;
    const updatedTournaments = [...leagues];
    updatedTournaments[index][name] = value;
    setTournaments(updatedTournaments);
  };

  const handleAchievementChange = (index, event) => {
    const { name, value } = event.target;
    const updatedAchievements = [...achievements];
    updatedAchievements[index][name] = value;
    setAchievements(updatedAchievements);
  };

  const addTournament = () => {
    setTournaments([
      ...leagues,
      { name: "", location: "", date: "", result: "" },
    ]);
  };

  const removeTournament = (index) => {
    const updatedTournaments = [...leagues];
    updatedTournaments.splice(index, 1);
    setTournaments(updatedTournaments);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      nationality,
      name,
      age,
      /* Add more data properties */
      leagues,
      achievements,
    };
    axios
      .post("http://localhost:5005/api/players", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex justify-evenly">
      <Sidebar />

      <div className="bg-slate-200 text-black mb-12 h-full grow">
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

        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item border-base-300">
            <input
              type="radio"
              name="my-accordion-4"
              defaultChecked="checked"
            />
            <div className="collapse-title text-xl font-medium">
              Basic Information
            </div>
            <div className="collapse-content">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="bg-slate-300 text-black rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="age">Age:</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    className="bg-slate-300 text-black rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="gender">Gender:</label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                    className="bg-slate-300 text-black rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="club">Club:</label>
                  <input
                    type="text"
                    id="club"
                    name="club"
                    value={club}
                    onChange={(event) => setClub(event.target.value)}
                    className="bg-slate-300 text-black rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="handedness">Handedness:</label>
                  <input
                    type="text"
                    id="handedness"
                    name="handedness"
                    value={handedness}
                    onChange={(event) => setHandedness(event.target.value)}
                    className="bg-slate-300 text-black rounded-lg"
                  />
                </div>

                {/* Add more form fields here */}

                <button type="submit">Submit</button>
              </form>
            </div>
          </div>

          {/* ADVANCED INFORMATION ACCORDION */}

          <div className="collapse collapse-arrow join-item border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              Advanced Information
            </div>

            <div className="collapse-content">
              <div>
                <label htmlFor="height">Height:</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                  className="bg-slate-300 text-black rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="weight">Weight:</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  className="bg-slate-300 text-black rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="dominantHand">Dominant Hand:</label>
                <input
                  type="text"
                  id="dominantHand"
                  name="dominantHand"
                  value={dominantHand}
                  onChange={(event) => setDominantHand(event.target.value)}
                  className="bg-slate-300 text-black rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="backhandType">Backhand Type:</label>
                <input
                  type="text"
                  id="backhandType"
                  name="backhandType"
                  value={backhandType}
                  onChange={(event) => setBackhandType(event.target.value)}
                  className="bg-slate-300 text-black rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="playingStyle">Playing Style:</label>
                <input
                  type="text"
                  id="playingStyle"
                  name="playingStyle"
                  value={playingStyle}
                  onChange={(event) => setPlayingStyle(event.target.value)}
                  className="bg-slate-300 text-black rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="experienceLevel">Experience Level:</label>
                <input
                  type="text"
                  id="experienceLevel"
                  name="experienceLevel"
                  value={experienceLevel}
                  onChange={(event) => setExperienceLevel(event.target.value)}
                  className="bg-slate-300 text-black rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="coach">Coach:</label>
                <input
                  type="text"
                  id="coach"
                  name="coach"
                  value={coach}
                  onChange={(event) => setCoach(event.target.value)}
                  className="bg-slate-300 text-black rounded-lg"
                />
              </div>

              {/* Add more form fields here */}
            </div>
          </div>

          {/* LEAGUE INFORMATION ACCORDION */}

          <div className="collapse collapse-arrow join-item border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              League Information
            </div>
            <div className="collapse-content">
              <div>
                <h2>Leagues played in: </h2>
                {leagues.map((league, index) => (
                  <div key={index}>
                    <label htmlFor={`league-name-${index}`}>Name:</label>
                    <input
                      type="text"
                      id={`league-name-${index}`}
                      name="name"
                      value={league.name}
                      onChange={(event) => handleTournamentChange(index, event)}
                    />

                    {/* Add more league form fields here */}

                    <button onClick={() => removeTournament(index)}>
                      Remove Tournament
                    </button>
                  </div>
                ))}
                <button onClick={addTournament}>Add League</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Page;

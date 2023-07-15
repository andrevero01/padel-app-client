"use client"

import { useState } from "react";
import React from "react";
import Sidebar from "@/components/Sidebar";

function page() {
  
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
    <div className="flex justify-evenly h-full">
      <Sidebar />
      <div className="bg-slate-200 md:mb-10 text-black h-full grow">
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
}

export default page;

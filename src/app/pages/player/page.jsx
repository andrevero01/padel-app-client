"use client";

import React, { useState } from "react";
import axios from "axios";
/* import { CountryDropdown } from "react-country-region-selector"; */

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
  // Add more state variables here

  const [tournaments, setTournaments] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const selectCountry = (val) => {
    setNationality(val);
  };

  const handleTournamentChange = (index, event) => {
    const { name, value } = event.target;
    const updatedTournaments = [...tournaments];
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
      ...tournaments,
      { name: "", location: "", date: "", result: "" },
    ]);
  };

  const removeTournament = (index) => {
    const updatedTournaments = [...tournaments];
    updatedTournaments.splice(index, 1);
    setTournaments(updatedTournaments);
  };

  const addAchievement = () => {
    setAchievements([...achievements, { title: "", year: "" }]);
  };

  const removeAchievement = (index) => {
    const updatedAchievements = [...achievements];
    updatedAchievements.splice(index, 1);
    setAchievements(updatedAchievements);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      nationality,
      name,
      age,
      /* Add more data properties */ tournaments,
      achievements,
    };
    // Send the data to the backend
    axios
      .post("http://localhost:5005/api/players", data)
      .then((response) => {
        console.log(response.data);
        // Handle successful submission
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <div className="bg-white text-black min-h-screen p-8">
      {/* BASIC INFORMATION */}

      <div className="join join-vertical w-full">
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" defaultChecked="checked" />
          <div className="collapse-title text-xl font-medium">
            Add Basic Information
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
                />
              </div>

              {/* Add more form fields here */}

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

        {/* ADVANCED INFORMATION */}

        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">
            Add Advanced Information
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
              />
            </div>

            {/* Add more form fields here */}
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">
            Tournaments Information
          </div>
          <div className="collapse-content">
            {/* Render tournaments form */}

            <div>
              <h2>Tournaments</h2>
              {tournaments.map((tournament, index) => (
                <div key={index}>
                  <label htmlFor={`tournament-name-${index}`}>Name:</label>
                  <input
                    type="text"
                    id={`tournament-name-${index}`}
                    name="name"
                    value={tournament.name}
                    onChange={(event) => handleTournamentChange(index, event)}
                  />

                  {/* Add more tournament form fields here */}

                  <button onClick={() => removeTournament(index)}>
                    Remove Tournament
                  </button>
                </div>
              ))}
              <button onClick={addTournament}>Add Tournament</button>
            </div>
            {/* Render achievements form */}
            <div>
              <h2>Achievements</h2>
              {achievements.map((achievement, index) => (
                <div key={index}>
                  <label htmlFor={`achievement-title-${index}`}>Title:</label>
                  <input
                    type="text"
                    id={`achievement-title-${index}`}
                    name="title"
                    value={achievement.title}
                    onChange={(event) => handleAchievementChange(index, event)}
                  />

                  {/* Add more achievement form fields here */}

                  <button onClick={() => removeAchievement(index)}>
                    Remove Achievement
                  </button>
                </div>
              ))}
              <button onClick={addAchievement}>Add Achievement</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

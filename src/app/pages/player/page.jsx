"use client";

import React, { useState } from "react";
import axios from "axios";
/* import { CountryDropdown } from "react-country-region-selector"; */

const Page = () => {
  const [nationality, setNationality] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
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
    setAchievements([...achievements, { title: "", year: null }]);
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

        {/* Add more form fields here */}

        {/*         <div>
          <CountryDropdown value={nationality} onChange={(val) => selectCountry(val)} />
        </div> */}

        <button type="submit">Submit</button>
      </form>

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
  );
};

export default Page;

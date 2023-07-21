"use client";

import React, { useState } from "react";
import axios from "axios";
import AddPlayersToTeam from "../components/AddPlayersToTeam";
import AddCourt from "../components/AddCourt";

const CreateGame = () => {
  const [formData, setFormData] = useState({
    date: "",
    courts: [],
    teams: [
      {
        name: "Team 1",
        players: [],
        winner: false,
        score: {
          sets: 0,
          games: 0,
          points: "0",
        },
      },
      {
        name: "Team 2",
        players: [],
        winner: false,
        score: {
          sets: 0,
          games: 0,
          points: "0",
        },
      },
    ],
  });

  const [existingPlayers, setExistingPlayers] = useState([]);
  const [existingCourts, setExistingCourts] = useState([]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const gameRes = await axios.post("http://localhost:5005/api/games", {
        date: formData.date,
        courts: formData.courts,
        score: formData.score,
        teams: formData.teams,
      });

      console.log(gameRes.data);

      // Reset the form
      setFormData({
        date: "",
        teams: [
          {
            name: "Team 1",
            players: [],
          },
          {
            name: "Team 2",
            players: [],
          },
        ],
        courts: [],
        score: {
          sets: 0,
          games: 0,
          points: "0",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchExistingPlayers = async () => {
    try {
      const res = await axios.get("http://localhost:5005/api/players");
      setExistingPlayers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchExistingCourts = async () => {
    try {
      const res = await axios.get("http://localhost:5005/api/courts");
      setExistingCourts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayerScoreChange = (teamIndex, category, value) => {
    setFormData((prevFormData) => {
      // Create a copy of the previous state
      const updatedFormData = { ...prevFormData };

      // Ensure that the score object exists for the specified team
      if (!updatedFormData.teams[teamIndex].score) {
        updatedFormData.teams[teamIndex].score = {
          sets: 0,
          games: 0,
          points: "0",
        };
      }

      // Update the score for the specified team and category
      updatedFormData.teams[teamIndex].score[category] = value;

      return updatedFormData;
    });
  };

  const handleTeamWinChange = (teamIndex, value) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      if (teamIndex === 0 && value) {
        updatedFormData.teams[1].winner = false;
      } else if (teamIndex === 1 && value) {
        updatedFormData.teams[0].winner = false;
      }
      updatedFormData.teams[teamIndex].winner = value;
      return updatedFormData;
    });
  };

  return (
    <div className="py-4 flex flex-col bg-white mb-14">
      <h1 className="text-2xl font-bold mb-4 mx-3">Register Game</h1>

      <form onSubmit={handleSubmit}>
        {/* Courts */}
        <AddCourt
          setFormData={setFormData}
          fetchExistingCourts={fetchExistingCourts}
          existingCourts={existingCourts}
        />

        {/* Players - Team 1 */}
        <AddPlayersToTeam
          formData={formData}
          setFormData={setFormData}
          fetchExistingPlayers={fetchExistingPlayers}
          existingPlayers={existingPlayers}
          teamIndex={0} // Pass the teamIndex as 0 for Team 1
        />

        {/* Players - Team 2 */}
        <AddPlayersToTeam
          formData={formData}
          setFormData={setFormData}
          fetchExistingPlayers={fetchExistingPlayers}
          existingPlayers={existingPlayers}
          teamIndex={1} // Pass the teamIndex as 1 for Team 2
        />

        {/* Team 1 */}
        <div className="flex flex-col mx-3 border-gray-400 border-x-2 border-t-2">
          <div className="flex">
            <h1>Team 1 </h1>
            {/* Win Toggle */}
            <h2>Won</h2>
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => handleTeamWinChange(0, e.target.checked)}
              checked={formData.teams[0].winner}
              name="teams[0].winner"
            />

            {/* Sets */}

            <select
              className="select select-bordered"
              type="number"
              name="teams[0].score.sets"
              placeholder="Sets"
              value={formData.teams[0]?.score?.sets || 0}
              onChange={(e) =>
                handlePlayerScoreChange(0, "sets", parseInt(e.target.value))
              }
            >
              <option value="1">0</option>
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="2">3</option>
              <option value="2">4</option>
              <option value="3">5</option>
            </select>

            {/* Games */}

            <select
              className="select select-bordered"
              type="number"
              name="teams[0].score.games"
              placeholder="Games"
              value={formData.teams[0]?.score?.games || 0}
              onChange={(e) =>
                handlePlayerScoreChange(0, "games", parseInt(e.target.value))
              }
            >
              <option value="1">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>

            {/* Points */}

            <select
              className="select select-bordered"
              name="teams[0].score.points"
              value={formData.teams[0]?.score?.points || "0"}
              onChange={(e) =>
                handlePlayerScoreChange(0, "points", e.target.value)
              }
            >
              <option value="0">0</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="advantage">Advantage</option>
              <option value="deuce">Deuce</option>
            </select>
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex flex-col mx-3 border-2 border-gray-400">
          <div className="flex">
            <h1>Team 2</h1>
            {/* Win Toggle */}
            <h2>Won</h2>
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => handleTeamWinChange(1, e.target.checked)}
              checked={formData.teams[1].winner}
              name="teams[1].winner"
            />

            {/* Sets */}

            <select
              className="select select-bordered"
              type="number"
              name="teams[1].score.sets"
              placeholder="Sets"
              value={formData.teams[1]?.score?.sets || 0}
              onChange={(e) =>
                handlePlayerScoreChange(1, "sets", parseInt(e.target.value))
              }
            >
              <option value="1">0</option>
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="2">3</option>
              <option value="2">4</option>
              <option value="3">5</option>
            </select>

            {/* Games */}
            <select
              className="select select-bordered"
              type="number"
              name="teams[1].score.games"
              placeholder="Games"
              value={formData.teams[1]?.score?.games || 0}
              onChange={(e) =>
                handlePlayerScoreChange(1, "games", parseInt(e.target.value))
              }
            >
              {" "}
              <option value="1">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>

            {/* Points */}
        
            <select
              className="select select-bordered"
              name="teams[1].score.points"
              value={formData.teams[1]?.score?.points || "0"}
              onChange={(e) =>
                handlePlayerScoreChange(1, "points", e.target.value)
              }
            >
              <option value="0">0</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="advantage">Advantage</option>
              <option value="deuce">Deuce</option>
            </select>
          </div>
        </div>

        {/* Date */}
        <div className="my-4">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded mt-4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGame;

"use client";

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import AddPlayersToTeam from "../components/AddPlayersToTeam";
import AddCourt from "../components/AddCourt";
import AddLeagues from "../components/AddLeagues";

const CreateGame = () => {
  const { playerData, getPlayerData } = useContext(AuthContext);

  const [existingPlayers, setExistingPlayers] = useState([]);
  const [existingCourts, setExistingCourts] = useState([]);
  const [existingLeagues, setExistingLeagues] = useState([]);
  const [leaguesFetched, setLeaguesFetched] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    matchType: "Singles",
    courts: [],
    leagues: {},
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

  useEffect(() => {
    getPlayerData();
    fetchExistingPlayers();
    fetchExistingCourts();
  }, []);

  useEffect(() => {
    if (playerData && formData.matchType === "League Game") {
      fetchExistingLeagues(playerData._id, playerData.leagues);
    }
  }, [formData.matchType, playerData]);

  useEffect(() => {
    if (existingLeagues.length > 0) {
      setLeaguesFetched(true);
    }
  }, [existingLeagues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the "leagues" field is being changed
    if (name === "leagues") {
      // If the value is an empty object, set "leagues" to null
      const leaguesValue = JSON.stringify(value) === "{}" ? null : value;

      setFormData((prevFormData) => ({
        ...prevFormData,
        leagues: leaguesValue,
      }));
    } else {
      // For other fields, update the state as usual
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const gameRes = await axios.post("http://localhost:5005/api/games", {
        date: formData.date,
        courts: formData.courts,
        score: formData.score,
        winner: formData.winner,
        teams: formData.teams,
        matchType: formData.matchType,
        leagues: formData.leagues,
      });

      // Reset the form
      setFormData({
        date: "",
        matchType: "Singles",
        teams: [
          {
            name: "Team 1",
            players: [],
            winner: false,
          },
          {
            name: "Team 2",
            players: [],
            winner: false,
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
      console.error("Error response:", error.response);
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

  const fetchExistingLeagues = async (playerId, playerLeagueIds) => {
    try {
      const leagueIdsString = playerLeagueIds.join(",");

      const response = await axios.get(
        `http://localhost:5005/api/leagues?playerId=${playerId}&playerLeagueId=${leagueIdsString}`
      );

      const leagues = response.data;
      console.log("Fetched Leagues:", leagues);
      setExistingLeagues(leagues);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlayerScoreChange = (teamIndex, category, value) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      if (!updatedFormData.teams[teamIndex].score) {
        updatedFormData.teams[teamIndex].score = {
          sets: 0,
          games: 0,
          points: "0",
        };
      }

      updatedFormData.teams[teamIndex].score[category] = value;

      return updatedFormData;
    });
    console.log("ping");
    console.log(formData);
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

  const showLeagueField =
    formData.matchType === "League Game" && leaguesFetched;

  return (
    <div className="py-4 flex flex-col bg-white mb-14">
      <h1 className="text-2xl font-bold mb-4 mx-3">Register Game</h1>

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

      <h1 className="mx-3 font-bold mb-3">Match Type</h1>
      <select
        className="mx-3 select select-bordered"
        type="string"
        name="matchType"
        value={formData.matchType}
        onChange={handleChange}
      >
        {" "}
        <option value="Singles">Singles</option>
        <option value="Doubles">Doubles</option>
        <option value="Mixed doubles">Mixed doubles</option>
        <option value="Practice">Practice</option>
        <option value="League Game">League Game</option>
      </select>

      {/* Add the searchable field */}
      {formData.matchType === "League Game" && (
        <AddLeagues
          formData={formData}
          onChange={handleChange}
          existingLeagues={existingLeagues}
          playerData={playerData}
          disabled={!leaguesFetched}
        />
      )}

      <form onSubmit={handleSubmit}>
        {/* Courts */}
        <AddCourt
          setFormData={setFormData}
          fetchExistingCourts={fetchExistingCourts}
          existingCourts={existingCourts}
        />
        {/* Players - Team 1 */}{" "}
        <label className="font-bold ml-3 mt-6">Players team 1:</label>
        <AddPlayersToTeam
          formData={formData}
          setFormData={setFormData}
          fetchExistingPlayers={fetchExistingPlayers}
          existingPlayers={existingPlayers}
          teamIndex={0}
        />
        {/* Players - Team 2 */}
        <label className="font-bold ml-3">Players team 2:</label>
        <AddPlayersToTeam
          formData={formData}
          setFormData={setFormData}
          fetchExistingPlayers={fetchExistingPlayers}
          existingPlayers={existingPlayers}
          teamIndex={1}
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
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
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
              <option value="0">0</option>
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
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
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
              <option value="0">0</option>
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

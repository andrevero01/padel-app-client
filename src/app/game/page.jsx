"use client"

import { useState } from "react";
import axios from "axios";

const page = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [court, setCourt] = useState("");
  const [league, setLeague] = useState("");
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [score, setScore] = useState("0-0");
  const [winner, setWinner] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const gameData = {
      player1,
      player2,
      court,
      league,
      team1,
      team2,
      dateTime,
      score,
      winner,
      duration,
    };

    axios
      .post("http://localhost:5005/api/games", gameData)
      .then((response) => {
        // Handle success
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded p-6 shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-black">Add Game</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="player1" className="block mb-1 text-black">
              Player 1
            </label>
            <input
              type="text"
              id="player1"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              className="w-full bg-gray-400 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="player2" className="block mb-1 text-black">
              Player 2
            </label>
            <input
              type="text"
              id="player2"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              className="w-full bg-gray-400 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
          </div>
        </div>

        {/* Add other form fields here */}

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Game
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;

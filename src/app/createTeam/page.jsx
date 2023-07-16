"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateTeam = () => {
  const [formData, setFormData] = useState({
    name: "",
    players: [],
    captain: null,
    homeCourt: null,
    leagues: [],
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const teamRes = await axios.post("http://localhost:5005/api/teams", {
        name: formData.name,
        players: formData.players,
        captain: formData.captain,
        homeCourt: formData.homeCourt,
        leagues: formData.leagues,
      });

      console.log("Players invited successfully!");

      setFormData({
        name: "",
        players: [],
        captain: null,
        homeCourt: null,
        leagues: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [existingPlayers, setExistingPlayers] = useState([]);

  const handlePlayerSelect = (player) => {
    setFormData({
      ...formData,
      players: player._id,
      playerName: `${player.firstName} ${player.lastName}`,
    });
  };

  useEffect(() => {
    fetchExistingPlayers();
  }, []);

  const fetchExistingPlayers = async () => {
    try {
      const res = await axios.get("http://localhost:5005/api/players");
      setExistingPlayers(res.data);
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  const filterExistingPlayers = (searchTerm) => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return existingPlayers.filter(
      (player) =>
        player.firstName.toLowerCase().includes(lowercaseSearchTerm) ||
        player.lastName.toLowerCase().includes(lowercaseSearchTerm)
    );
  };

  return (
    <div className="py-4 flex flex-col bg-white mb-14">
      <h1 className="text-2xl font-bold mb-4 mx-3">Create Player</h1>
      <form onSubmit={handleSubmit}>
      
        {/* Name */}

        <div className="flex justify-start mx-3">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Team Name</label>
            <input
              type="text"
              placeholder="The Super-Ultra-Awesome-Paddle Squad"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input border mr-3 grow"
              required
            />
          </div>
        </div>

        {/* Invite Players */}

        <div className="flex justify-start mx-3 mt-6">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Invite Players</label>
            <input
              type="text"
              placeholder="Jane"
              name="players"
              value={formData.playerName}
              onChange={handleChange}
              className="input border mr-3 grow"
              required
            />
            {formData.players.length > 0 && (
              <div className="flex flex-col mr-3 rounded-xl bg-base-100">
                {filterExistingPlayers(formData.players).map((player) => (
                  <button
                    key={player._id}
                    type="button"
                    className="text-white-500 text-start ml-5 py-2 hover:underline"
                    onClick={() => handlePlayerSelect(player)}
                  >
                    {player.firstName} {player.lastName}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Leagues */}

        <div className="flex justify-start mx-3 mt-6">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Leagues</label>
            <input
              type="text"
              name="leagues"
              value={formData.leagues}
              onChange={handleChange}
              className="input border mr-3 grow"
            />
          </div>
        </div>

        {/* Home Court */}

        <div className="flex justify-start mx-3 mt-6">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Home Court</label>
            <input
              type="text"
              placeholder="Court"
              name="homeCourt"
              value={formData.homeCourt}
              onChange={handleChange}
              className="input border mr-3 grow"
            />
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

export default CreateTeam;
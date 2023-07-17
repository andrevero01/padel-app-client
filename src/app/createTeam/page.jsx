"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCourt from "../components/AddCourt";

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
    console.log(formData);
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

  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [existingPlayers, setExistingPlayers] = useState([]);
  const [existingCourts, setExistingCourts] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const handlePlayerSearch = (searchTerm) => {
    const filteredPlayers = filterExistingPlayers(searchTerm);

    // Exclude the already selected players from the filtered players list
    const availablePlayers = filteredPlayers.filter(
      (player) =>
        !selectedPlayers.find((selected) => selected._id === player._id)
    );

    setFilteredPlayers(availablePlayers);
  };

  const handlePlayerSelect = (player) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      players: [...prevFormData.players, player._id],
    }));

    setSelectedPlayers((prevSelectedPlayers) => [
      ...prevSelectedPlayers,
      player,
    ]);

    setFilteredPlayers((prevFilteredPlayers) =>
      prevFilteredPlayers.filter((filtered) => filtered._id !== player._id)
    );
  };

  const handlePlayerRemove = (player) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      players: prevFormData.players.filter((id) => id !== player._id),
    }));

    setSelectedPlayers((prevSelectedPlayers) =>
      prevSelectedPlayers.filter((selected) => selected._id !== player._id)
    );

    setFilteredPlayers((prevFilteredPlayers) => [
      ...prevFilteredPlayers,
      player,
    ]);
  };

  const handleCourtSelect = (court) => {
    setFormData({
      ...formData,
      court: court._id,
      homeCourt: `${court.name}`,
    });
  };

  useEffect(() => {
    fetchExistingPlayers();
  }, []);

  useEffect(() => {
    fetchExistingCourts();
  }, []);

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

  const filterExistingPlayers = (searchTerm) => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return existingPlayers.filter(
      (player) =>
        player.firstName.toLowerCase().includes(lowercaseSearchTerm) ||
        player.lastName.toLowerCase().includes(lowercaseSearchTerm)
    );
  };

  const filterExistingCourts = (searchTerm) => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return existingCourts.filter(
      (court) =>
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
              placeholder="Search players"
              onChange={(e) => handlePlayerSearch(e.target.value)}
              className="input border mr-3 grow"
            />
            <div className="mt-2">
              {filteredPlayers.map((player) => (
                <div
                  key={player._id}
                  onClick={() => handlePlayerSelect(player)}
                  className="cursor-pointer hover:bg-gray-200 px-2 py-1"
                >
                  {`${player.firstName} ${player.lastName}`}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Players */}
        <div className="flex justify-start mx-3 mt-6">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Selected Players</label>
            <div>
              {selectedPlayers.map((player) => (
                <div key={player._id} className="px-2 py-1 flex items-center">
                  <div>{`${player.firstName} ${player.lastName}`}</div>
                  <button
                    type="button"
                    onClick={() => handlePlayerRemove(player)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leagues */}

        {/*

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

        */}

        {/* Home Court */}

        <AddCourt
          filterExistingCourts={filterExistingCourts}
          handleCourtSelect={handleCourtSelect}
          handleChange={handleChange}
          formData={formData}
        />

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

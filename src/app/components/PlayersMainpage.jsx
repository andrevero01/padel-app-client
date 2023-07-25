"use client";
import React, { useState } from "react";
import axios from "axios";
import PlayerModal from "./modals/PlayerModal";

const PlayersMainpage = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Add this line

  const getPlayers = async () => {
    const response = await axios.get("http://localhost:5005/api/players", {
      params: {
        limit: 5,
      },
    });
    setPlayers(response.data.slice(0, 5));
  };

  const handleGetPlayers = () => {
    getPlayers();
  };

  const handleOpenModal = (player) => {
    setSelectedPlayer(player);
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
  };

  return (
    <div>
      <div>
        <button onClick={handleGetPlayers} className="my-4 py-2 px-4 bg-primary text-white rounded">Get Players</button>

        <div className="flex flex-wrap justify-center">
          {players.map((player) => (
            <div
              key={player._id} // Use _id instead of id
              className="max-w-xs p-4 mx-2 my-2 bg-white rounded shadow"
            >
              <div className="font-bold">
                <p>{player.firstName} {player.lastName}</p>
                <br />
                Team(s):
                <ul>
                  {player.team.map((team) => (
                    <li key={team._id}>{team.name}</li>
                  ))}
                </ul>
                <button
                  onClick={() => handleOpenModal(player)}
                  className="mt-4 py-2 px-4 bg-primary text-white rounded"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedPlayer && (
          <PlayerModal player={selectedPlayer} onClose={handleCloseModal} />
        )}
      </div>
    </div>

  // </div>

  );
};

export default PlayersMainpage;

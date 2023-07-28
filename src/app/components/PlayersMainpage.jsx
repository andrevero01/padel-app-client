"use client";
import React, { useState } from "react";
import axios from "axios";
import PlayerModal from "./modals/PlayerModal";

const PlayersMainpage = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

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
    setButtonClicked(true);
  };

  const handleOpenModal = (player) => {
    setSelectedPlayer(player);
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {!buttonClicked && (
          <div>
            <button
              onClick={handleGetPlayers}
              className="my-4 py-2 px-4 bg-secondary text-white rounded"
            >
              Show me the top 5 players
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center text-neutral">
        {players.map((player) => (
          <div
            key={player._id}
            className="max-w-xs p-4 mx-2 my-2 bg-white rounded shadow"
          >
            <div className="font-bold">
              <p>
                {player.firstName} {player.lastName}
              </p>
              <br />

              <button
                onClick={() => handleOpenModal(player)}
                className="mt-4 py-2 px-4 btn-primary text-white rounded"
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
  );
};

export default PlayersMainpage;

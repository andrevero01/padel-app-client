import React, { useState } from "react";
import axios from "axios";
import PlayerModal from "../../modals/PlayerModal";

const AdminPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const getPlayers = async () => {
    const response = await axios.get(
      "https://misty-stole-lamb.cyclic.app/api/players"
    );
    setPlayers(response.data);
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
        {players.length === 0 ? (
          <button
            onClick={handleGetPlayers}
            className="my-4 py-2 px-4 bg-primary text-white rounded"
          >
            Get Players
          </button>
        ) : null}
        <div className="flex flex-wrap justify-center">
          {players.map((player) => (
            <div
              key={player.id}
              className="max-w-xs p-4 mx-2 my-2 bg-white rounded shadow"
            >
              <div className="font-bold">
                {player.firstName} {player.lastName} <br />
                <br />
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
  );
};

export default AdminPlayers;

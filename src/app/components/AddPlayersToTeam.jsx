import React, { useState, useEffect } from "react";

function AddPlayersToTeam({ teamIndex, formData, setFormData, fetchExistingPlayers, existingPlayers }) {
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handlePlayerSearch = (searchTerm) => {
    if (searchTerm.trim().length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
      setFilteredPlayers([]);
    }

    const filteredPlayers = filterExistingPlayers(searchTerm);
    // Remove selected players from the list
    const availablePlayers = filteredPlayers.filter(
      (player) =>
        !selectedPlayers.find((selected) => selected._id === player._id)
    );

    setFilteredPlayers(availablePlayers);
  };

  const handlePlayerSelect = (player) => {
    const updatedTeams = [...formData.teams];
    updatedTeams[teamIndex].players.push(player._id);

    setFormData((prevFormData) => ({
      ...prevFormData,
      teams: updatedTeams,
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
    const updatedTeams = [...formData.teams];
    updatedTeams[teamIndex].players = updatedTeams[teamIndex].players.filter(
      (id) => id !== player._id
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      teams: updatedTeams,
      playerName: "",
    }));

    setSelectedPlayers((prevSelectedPlayers) =>
      prevSelectedPlayers.filter((selected) => selected._id !== player._id)
    );

    setFilteredPlayers((prevFilteredPlayers) => [
      ...prevFilteredPlayers,
      player,
    ]);
  };

  const filterExistingPlayers = (searchTerm) => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return existingPlayers.filter(
      (player) =>
        player.firstName.toLowerCase().includes(lowercaseSearchTerm) ||
        player.lastName.toLowerCase().includes(lowercaseSearchTerm)
    );
  };

  useEffect(() => {
    fetchExistingPlayers();
  }, []);

  return (
    <div className="flex flex-col justify-start mx-3 mt-3">
      <div className="flex flex-col w-full">
        <input
          type="text"
          placeholder="Search players"
          onChange={(e) => handlePlayerSearch(e.target.value)}
          className="input border mr-3 grow bg-gray-100 shadow-md rounded-md placeholder:text-gray-500"
        />
        {isSearching && (
          <div className="mt-2">
            {filteredPlayers.map((player) => (
              <div
                key={player._id}
                onClick={() => {
                  handlePlayerSelect(player);
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    playerName: "",
                  }));
                }}
                className="cursor-pointer hover:bg-gray-200 px-2 py-1"
              >
                {`${player.firstName} ${player.lastName}`}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Selected Players */}
      <div className="flex justify-start mt-6">
        <div className="flex flex-col w-full">
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
    </div>
  );
}

export default AddPlayersToTeam;

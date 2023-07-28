import React, { useState, useEffect } from "react";

function AddPlayers({
  setFormData,
  fetchExistingPlayers,
  existingPlayers,
  formData,
  isLeagueGame,
}) {
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
    // Removed selected players from the list
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

    setFormData((prevFormData) => ({
      ...prevFormData,
      playerName: "",
    }));
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

  if (isLeagueGame) {
    return (
      <div className="flex flex-col justify-start mx-3 mt-6">
        <div className="flex flex-col w-full">
          <label className="font-bold mb-3">
            Select Players from the League:
          </label>
          <div>
            <select
              className="select select-bordered"
              name="players"
              onChange={(e) =>
                handlePlayerSelect(
                  existingPlayers.find(
                    (player) => player._id === e.target.value
                  )
                )
              }
              value=""
            >
              <option value="" disabled>
                Select a Player
              </option>
              {existingPlayers
                .filter((player) => formData.leagues.includes(player.league))
                .map((player) => (
                  <option key={player._id} value={player._id}>
                    {`${player.firstName} ${player.lastName}`}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {/* Selected Players */}
        <div className="flex justify-start mt-6">
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
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start mx-3 mt-6">
      <div className="flex flex-col w-full">
      </div>
    </div>
  );
}

export default AddPlayers;

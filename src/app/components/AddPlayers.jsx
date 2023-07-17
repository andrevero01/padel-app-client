import React from "react";

function AddPlayers({
  isSearching,
  setIsSearching,
  handlePlayerSearch,
  filteredPlayers,
  handlePlayerSelect,
  setFormData,
  selectedPlayers,
  handlePlayerRemove,
}) {
  return (
    <div className="flex flex-col justify-start mx-3 mt-6">
      <div className="flex flex-col w-full">
        <label className="font-bold mb-3">Invite Players</label>
        <input
          type="text"
          placeholder="Search players"
          onChange={(e) => handlePlayerSearch(e.target.value)}
          className="input border mr-3 grow"
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

export default AddPlayers;

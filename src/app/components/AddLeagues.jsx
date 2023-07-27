import React from "react";

const AddLeagues = ({ formData, onChange, existingLeagues, playerData }) => {
  // Check if playerData and existingLeagues are available
  const isDataLoaded = !!playerData && existingLeagues.length > 0;

  // Filter the leagues based on playerData
  const filteredLeagues = existingLeagues.filter((league) =>
    league.players.some((player) => player._id === playerData._id)
  );

  return (
    <div className="ml-3 mt-6 flex flex-col">
      <label className="font-bold mb-3">Select a League:</label>
      <select
        className="select select-bordered"
        name="leagues"
        onChange={onChange}
        value={formData.leagues}
        disabled={!isDataLoaded}
      >
        <option value="" disabled={!isDataLoaded}>
          {isDataLoaded ? "Select a League" : "Loading..."}
        </option>
        {filteredLeagues.map((league) => (
          <option key={league._id} value={league._id}>
            {league.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddLeagues;

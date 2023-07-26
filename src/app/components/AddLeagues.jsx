import React from "react";

const AddLeagues = ({ formData, onChange, existingLeagues, playerData }) => {
  const filteredLeagues = existingLeagues.filter((league) =>
    league.players.some((player) => player._id === playerData._id)
  );

  return (
    <div className="my-4">
      <label>Select a League:</label>
      <select
        className="select select-bordered"
        name="searchableField"
        onChange={onChange}
        value={formData.searchableField}
      >
        <option value="" disabled>
          Select a League
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
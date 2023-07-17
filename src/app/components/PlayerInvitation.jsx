import React from 'react'

function PlayerInvitation({filterExistingPlayers, handlePlayerSelect, handleChange, formData}) {
  return (
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
  )
}

export default PlayerInvitation
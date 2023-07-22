'use client'
import React, { useState } from "react";

const PlayerModal = ({ player, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-8 rounded shadow">
          <h2 className="text-lg font-bold mb-4">
            {player.firstName} {player.lastName}
          </h2>
          <p>Team: {player.team}</p>
          <p>Sex: {player.gender}</p>
          <p>Nationality: {player.nationality}</p>
          <p>Age: {player.age}</p>
          <p>Height: {player.height}</p>
          <p>Weight: {player.weight}</p>
          <p>Preferred Hand: {player.dominantHand}</p>
          <p>Backhand Type: {player.backhandType}</p>
          <button
            onClick={onClose}
            className="mt-4 py-2 px-4 bg-primary text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

export default PlayerModal;
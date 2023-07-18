<<<<<<< HEAD

"use client";
import React, { useState } from "react";
import axios from "axios";
import async from "hbs/lib/async";
import shuffle from "lodash/shuffle";
=======
'use client'
import React, { useState } from 'react';
import axios from 'axios';
import async from 'hbs/lib/async';
import shuffle from 'lodash/shuffle';
>>>>>>> parent of e4cab6a (Merge pull request #9 from andrevero01/leagues)

const PlayersMainpage = () =>{
  const [players, setPlayers] = useState([]);
  const [showShuffleButton, setShowShuffleButton] = useState(false);

  const getPlayers = async () => {
    const response = await axios.get('http://localhost:5005/api/players', {
      params: {
        limit: 5,
      },
    });
    setPlayers(response.data.slice(0, 5));
    setShowShuffleButton(true);
  };

  const handleGetPlayers = () => {
    getPlayers();
  };

  const handleShufflePlayers = () => {
    const shuffledPlayers = shuffle(players);
    setPlayers(shuffledPlayers.slice(0, 5));
  };

  return (
    <div className="flex flex-col items-center">
    <button onClick={handleGetPlayers} className="my-4 py-2 px-4 bg-blue-500 text-white rounded">
      Get Players
    </button>
    
    {showShuffleButton && (
        <button onClick={handleShufflePlayers} className="my-4 py-2 px-4 bg-red-500 text-white rounded">Shuffle</button>
      )}

    <div className="flex flex-wrap justify-center">
      {players.map((player) => (
        <div key={player.id} className="max-w-xs p-4 mx-2 my-2 bg-white rounded shadow">
          <div className="font-bold">
            Name: {player.firstName} {player.lastName} <br></br>
            Team: {player.team}
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default PlayersMainpage;
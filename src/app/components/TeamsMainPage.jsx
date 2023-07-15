'use client'
import React, { useState } from 'react';
import axios from 'axios';
import shuffle from 'lodash/shuffle';

const TeamsMainPage = () => {
  const [teams, setTeams] = useState([]);
  const [showShuffleButton, setShowShuffleButton] = useState(false);

  const getTeams = async () => {
    const response = await axios.get('http://localhost:5005/api/teams');
    setTeams(response.data);
    setShowShuffleButton(true);
  };

  const handleGetTeams = () => {
    getTeams();
  };

  const handleShuffleTeams = () => {
    const shuffledTeams = shuffle(teams);
    setTeams(shuffledTeams);
  };

  return (
    <div className="flex flex-col items-center">
      <button onClick={handleGetTeams} className="my-4 py-2 px-4 bg-blue-500 text-white rounded">
        Get Teams
      </button>
    
      {showShuffleButton && (
        <button onClick={handleShuffleTeams} className="my-4 py-2 px-4 bg-red-500 text-white rounded">Shuffle</button>
      )}

      <div className="flex flex-wrap justify-center">
        {teams.map((team) => (
          <div key={team.id} className="max-w-xs p-4 mx-2 my-2 bg-white rounded shadow">
            <div className="font-bold">
              Team Name: {team.name} <br></br>
              Player: {team.player}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamsMainPage;
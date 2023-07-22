import React, { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const JoinLeague = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { leagueId } = useParams();

  const handleJoinLeague = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:5005/api/leagues/join/${leagueId}`
      );
      setIsLoading(false);
      // If the join is successful, you might want to show a success message or perform any other actions.
      console.log(response.data);
    } catch (error) {
      setIsLoading(false);
      // Handle error messages based on the HTTP status returned by the API.
      if (error.response && error.response.status === 403) {
        setErrorMessage("League registration is closed.");
      } else if (error.response && error.response.status === 409) {
        setErrorMessage("You are already a member of this league.");
      } else {
        setErrorMessage("An error occurred while joining the league.");
      }
    }
  };

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}

      <button
        className="btn btn-secondary mb-4 mx-2  text-black"
        onClick={handleJoinLeague}
        disabled={isLoading}
      >
        {isLoading ? "Joining..." : "Join League"}
      </button>
    </div>
  );
};

export default JoinLeague;

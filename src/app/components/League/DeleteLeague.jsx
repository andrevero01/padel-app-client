import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { LeaguesContext } from "../../context/leagues.context.js";

const DeleteLeague = ({ leagueId }) => {
  const { updateLeagues } = useContext(LeaguesContext);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = () => {
    axios
      .delete(`https://misty-stole-lamb.cyclic.app/api/leagues/${leagueId}`)
      .then(() => {
        console.log("League deleted");
        setMessage("League deleted!");
        updateLeagues();
      })
      .catch((error) => {
        console.error("Failed to delete league", error.message);
        setErrorMessage("Failed to delete league");
      });
  };

  useEffect(() => {
    if (message || errorMessage) {
      const timer = setTimeout(() => {
        setMessage("");
        setErrorMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, errorMessage]);
  return (
    <>
      <button
        onClick={handleDelete}
        className="bg-red-700 hover:bg-red-900 font-bold py-2 px-4 rounded my-4  text-white w-1/3 opacity-85"
      >
        Delete
      </button>

      {message ? (
        <p className="text-success font-semibold text-center mr-2 mb-2">
          {message}
        </p>
      ) : errorMessage ? (
        <p className="text-error font-semibold text-center mr-2 mb-2">
          {errorMessage}
        </p>
      ) : (
        ""
      )}
    </>
  );
};

export default DeleteLeague;

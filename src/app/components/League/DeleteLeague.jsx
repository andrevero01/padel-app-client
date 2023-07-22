import React, { useEffect, useState } from "react";
import axios from "axios";

const DeleteLeague = ({ leagueId }) => {
  const [message, setMessage] = useState("");
  const handleDelete = () => {
    axios
      .delete(`http://localhost:5005/api/leagues/${leagueId}`)
      .then(() => {
        console.log("League deleted");
        setMessage("League deleted!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error("Failed to delete league:", error);
      });
  };
  return (
    <>
      <button
        onClick={handleDelete}
        className="btn bg-red-600 text-white mb-4 ml-2"
      >
        Delete league
      </button>
      {message && (
        <p className="text-orange-600 font-semibold text-center">{message}</p>
      )}
    </>
  );
};

export default DeleteLeague;

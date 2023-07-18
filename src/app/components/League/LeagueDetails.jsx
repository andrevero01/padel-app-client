import React, { useEffect, useState } from "react";
import axios from "axios";

const LeagueDetails = ({ leagueId }) => {
  const [leagueDetails, setLeagueDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/leagues/${leagueId}`)
      .then((response) => {
        const league = response.data;
        setLeagueDetails(league);
      })
      .catch((error) => {
        console.error("Failed to fetch league details", error);
      });
  }, [leagueId]);

  const handleEdit = () => {
    console.log(leagueDetails);
  };

  return (
    <>
      <button className="btn btn-secondary m-2" onClick={handleEdit}>
        View details
      </button>
      {/* <EditLeague leagueId={leagueId} /> */}
    </>
  );
};

export default LeagueDetails;

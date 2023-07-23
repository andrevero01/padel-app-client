// "use client";

// import React, { useEffect, useState } from "react";
// import ScrollToTopButton from "../../../components/ScrollToTop";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "@/app/context/auth.context";

// export default function JoinLeague({ leagueId, playerId }) {
//   // const [isLoading, setIsLoading] = useState(false);
//   // const [errorMessage, setErrorMessage] = useState("");
//   const { isLoggedIn, playerData, getPlayerData } = useContext(AuthContext);
//   const { leagueId } = useParams();
//   const [playerId, setPlayerId] = useState("");

//   // useEffect(() => {}, []);

//   useEffect(() => {
//     getPlayerData();
//     if (playerData && playerData._id) {
//       setPlayerId(playerData._id);
//       console.log("player id", playerData._id);
//     }
//   }, []);

//   useEffect(() => {
//     axios
//       .post(`http://localhost:5005/api/leagues/${leagueId}/join`, {
//         playerId: playerId,
//       })
//       .then((response) => {
//         // setIsLoading(false);

//         console.log("league data", response.data);
//       })
//       .catch((error) => {
//         console.error("Failed to retrieve league:", error.message);
//       });
//   }, [leagueId]);
//   // setIsLoading(false);
//   // if (error.response && error.response.status === 403) {
//   //   setErrorMessage("League registration is closed.");
//   // } else if (error.response && error.response.status === 409) {
//   //   setErrorMessage("You are already a member of this league.");
//   // } else {
//   //     setErrorMessage("An error occurred while joining the league.");
//   //   }

//   return (
//     <div>
//       {/* {errorMessage && <p>{errorMessage}</p>}
//       <button
//         className="btn btn-secondary mb-4 mx-2  text-black"
//         onClick={handleJoinLeague}
//         disabled={isLoading}
//       >
//         {isLoading ? "Joining..." : "Join League"}
//       </button> */}
//     </div>
//   );
// }

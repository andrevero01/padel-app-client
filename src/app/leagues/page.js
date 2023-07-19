"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function leaguesPage() {
  const [leagues, setLeagues] = useState([]);
  // const handleDelete = (leagueId) => {
  //   axios
  //     .delete(`http://localhost:5005/api/leagues/${leagueId}`)
  //     .then(() => {
  //       console.log("League deleted");
  //     })
  //     .catch((error) => {
  //       console.error("Failed to delete league:", error);
  //     });
  // };

  // useEffect(() => {
  //   axios.get("http://localhost:5005/api/leagues").then((leagues) => {
  //     console.log("response.data", leagues.data);
  //     setLeagues(leagues.data);
  //   });
  // }, []);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState("");
  const [registrationOpen, setRegistrationOpen] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState(new Date());
  const [registrationFee, setRegistrationfee] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create the body for the POST request
    const body = {
      name,
      location,
      schedule,
      registrationOpen,
      registrationDeadline,
      registrationFee,
    };

    axios
      .post("http://localhost:5005/api/leagues", body)
      .then((newLeague) => {
        console.log(newLeague.data);
        setName("");
        setLocation("");
        setSchedule("");
        setRegistrationOpen(false);
        setRegistrationDeadline("");
        setRegistrationfee(0);
        setRegistrationDeadline(new Date());
      })
      .catch((error) => {
        console.error("Failed to create league", error);
      });
  };

  return (
    <>
      <div className="my-8">
        <h3 className="text-lg font-bold mb-6">Add New Leagues</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-md font-bold mb-2">League name:</label>
            <input
              className="shadow-md rounded-md py-2 px-4 mb-4 ml-2"
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <label className="text-lg font-bold mb-2 ml-8">
              League location:
            </label>
            <input
              className="shadow-md rounded-md py-2 px-4 mb-4 ml-2"
              type="text"
              name="courts"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            />
            <label className="text-lg font-bold mb-2 ml-8">
              Open for registration:
            </label>

            <select
              className="shadow-md rounded-md py-2 px-4 mb-4 ml-2"
              id="registrationOpen"
              name="registrationOpen"
              value={registrationOpen}
              onChange={(e) => setRegistrationOpen(e.target.value)}
            >
              <option value="">-</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <label className="text-md font-bold mb-2 ml-2">
              Registration Deadline:
            </label>
            <input
              className="shadow-md rounded-md py-2 px-4 mb-4 ml-2"
              type="date"
              name="registrationDeadline"
              onChange={(e) => setRegistrationDeadline(e.target.value)}
              value={registrationDeadline}
            />
            <label className="text-md font-bold mb-2">Registration fee:</label>
            <input
              className="shadow-md rounded-md py-2 px-4 mb-4 ml-2"
              type="number"
              name="registrationFee"
              onChange={(e) => setRegistrationfee(e.target.value)}
              value={registrationFee}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Create League
          </button>
        </form>
      </div>
      {/* Get all leagues */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-b mb-6">All leagues:</h3>
        {leagues.map((league) => (
          <div key={league._id}>
            <ul>
              <li className="text-md font-semibold">{league.name}</li>
            </ul>
            <h3 className="text-md font-semibold"> Courts:</h3>
            <p className=""> {league.courts}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

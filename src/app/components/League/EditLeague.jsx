import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// edit league
const EditLeague = ({ leagueId }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState("");
  const [registrationOpen, setRegistrationOpen] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [registrationFee, setRegistrationfee] = useState("");
  const [leagueLogo, setLeagueLogo] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/leagues/${leagueId}`)
      .then((response) => {
        const leagueDetails = response.data;
        setName(leagueDetails.name);
        setLocation(leagueDetails.location);
        setSchedule(leagueDetails.schedule);
        setRegistrationOpen(leagueDetails.registrationOpen);
        setRegistrationDeadline(leagueDetails.registrationDeadline);
        setRegistrationfee(leagueDetails.registrationFee);
        setLeagueLogo(leagueDetails.leagueLogo);
        setMessage("You've successfully edited this league!");
      })
      .catch((error) => console.log(error.message));
  }, [leagueId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      location,
      schedule,
      registrationOpen,
      registrationDeadline,
      registrationFee,
      leagueLogo,
    };

    axios
      .put(`http://localhost:5005/api/leagues/${leagueId}`, requestBody)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      {/* Create new league form */}
      <form onSubmit={handleSubmit}>
        {/* Name and location container */}
        <div className="flex justify-between mb-4 gap-5">
          <div className="flex flex-col w-1/2 mr-2">
            <label className="text-md font-medium mb-2 text-neutral">
              League name:
            </label>
            <input
              className="input input-bordered input-primary w-full shadow-md rounded-md mb-2"
              placeholder={name}
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="flex flex-col w-1/2 mr-2">
            <label className="text-md font-medium mb-2 text-neutral">
              League location:
            </label>
            <input
              className="input input-bordered input-primary w-full shadow-md rounded-md mb-2"
              placeholder={location}
              type="text"
              name="location"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            />
          </div>
        </div>
        {/* Schedule and logo container */}
        <div className="flex justify-between mb-4 gap-5">
          <div className="flex flex-col w-1/2 mr-2">
            <label className="text-md font-medium my-2 text-neutral">
              League schedule:
            </label>
            <input
              className="input input-bordered input-primary w-full shadow-md rounded-md mb-2"
              type="text"
              placeholder="Tuesdays and Thursdays"
              name="schedule"
              onChange={(e) => setSchedule(e.target.value)}
              value={schedule}
            />
          </div>
          <div className="flex flex-col w-1/2 mr-2">
            <label className="text-md font-medium my-2 text-neutral">
              League logo:
            </label>
            <input
              className="input input-bordered input-primary w-full shadow-md rounded-md mb-2 "
              type="string"
              placeholder="Add your URL here"
              name="leagueLogo"
              onChange={(e) => setLeagueLogo(e.target.value)}
              value={leagueLogo}
            />
          </div>
        </div>
        {/* Deadline and fee container */}
        <div className="flex justify-between mb-4 gap-5">
          <div className="flex flex-col w-1/2 mr-2">
            <label className="text-md font-medium my-2 text-neutral">
              Open for registration:
            </label>

            <select
              className="input input-bordered input-primary w-full shadow-md rounded-md mb-2"
              id="registrationOpen"
              name="registrationOpen"
              value={registrationOpen}
              onChange={(e) => setRegistrationOpen(e.target.value)}
            >
              <option value="">- Select one</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="flex flex-col w-1/2 mr-2">
            <label className="text-md font-medium my-2 text-neutral">
              Registration deadline:
            </label>
            <input
              className="input input-bordered input-primary w-full  shadow-md rounded-md mb-2"
              type="date"
              name="registrationDeadline"
              onChange={(e) => setRegistrationDeadline(e.target.value)}
              value={registrationDeadline}
            />
          </div>
          <div className="flex flex-col w-1/2 mr-2">
            <label className="text-md font-medium my-2 text-neutral">
              Registration fee (EUR):
            </label>
            <input
              className="input input-bordered input-primary w-full shadow-md rounded-md mb-2 "
              type="number"
              placeholder="15"
              name="registrationFee"
              onChange={(e) => setRegistrationfee(e.target.value)}
              value={registrationFee}
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="bg-primary hover:bg-secondary font-bold py-2 px-4 rounded my-4 w-1/4 text-white"
            type="submit"
          >
            Edit League
          </button>
          {message && <p className="text-orange-600">{message}</p>}
        </div>
      </form>
    </>
  );
};

export default EditLeague;

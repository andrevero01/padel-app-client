"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Link } from "react-router-dom";

export default function leagueDetailsPage() {
  const router = useRouter();
  const [leagueDetails, setLeagueDetails] = useState("");
  const { leagueId } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState("");
  const [registrationOpen, setRegistrationOpen] = useState();
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [registrationFee, setRegistrationfee] = useState("");
  const [leagueLogo, setLeagueLogo] = useState("");
  const [message, setMessage] = useState("");

  const leagueLogoUrl =
    leagueLogo ||
    "https://www.usaclicosenza.it/wp-content/uploads/2021/04/Padel-League-Logo.jpeg";

  const backToLeagues = () => {
    router.push("/leagues");
  };

  useEffect(() => {
    if (leagueId) {
      axios
        .get(`http://localhost:5005/api/leagues/${leagueId}`)
        .then((response) => {
          setLeagueDetails(response.data);

          console.log(response.data);
        })
        .catch((error) => {
          console.error("Failed to retrieve league:", error.message);
        });
    }
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
      leagueLogo: leagueLogoUrl,
    };

    axios
      .put(`http://localhost:5005/api/leagues/${leagueId}`, requestBody)
      .then((response) => {
        console.log(response);
        setName("");
        setLocation("");
        setSchedule("");
        setRegistrationOpen("");
        setRegistrationDeadline("");
        setRegistrationfee("");
        setLeagueLogo("");
        setMessage("You've successfully edited this league!");
        setTimeout(() => {
          router.push("/leagues");
        }, 1000);
      });
  };

  return (
    <div className="flex flex-col items-center  bg-gray-100 h-screen">
      <div className="flex-col w-2/3 bg-white p-12 rounded-lg shadow-lg mt-10">
        <form onSubmit={handleSubmit}>
          {/* Name and location container */}
          <div className="flex justify-between mb-4 gap-5">
            <div className="flex flex-col w-1/2 mr-2 text-neutral items-center md:items-start">
              <label className="text-md w-1/2 font-medium mb-2 text-neutral text-center md:text-left">
                League name:
              </label>
              <input
                className="input placeholder:text-gray-500 bg-gray-100 w-full shadow-md rounded-md mb-2"
                placeholder={leagueDetails.name}
                type="text"
                name="name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="flex flex-col w-1/2 mr-2 text-neutral items-center md:items-start">
              <label className="text-md w-1/2 font-medium mb-2 text-neutral text-center md:text-left">
                League location:
              </label>
              <input
                className="input bg-gray-100 w-full  shadow-md rounded-md mb-2 placeholder:text-gray-500"
                placeholder={leagueDetails.location}
                type="text"
                name="location"
                required
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
            </div>
          </div>
          {/* Schedule and logo container */}
          <div className="flex justify-center md:justify-between lg:justify-between mb-4 gap-5">
            <div className="flex flex-col w-1/2 mr-2 text-neutral items-center md:items-start">
              <label className="text-md font-medium my-2 text-neutral text-center md:text-left">
                League schedule:
              </label>
              <input
                className="input bg-gray-100  w-full shadow-md rounded-md mb-2 placeholder:text-gray-500 "
                type="text"
                placeholder={leagueDetails.schedule}
                name="schedule"
                required
                onChange={(e) => setSchedule(e.target.value)}
                value={schedule}
              />
            </div>
            <div className="flex flex-col w-1/2 mr-2 text-neutral items-center md:items-start">
              <label className="text-md font-medium my-2 text-neutral text-center md:text-left">
                League logo:
              </label>
              <input
                className="input bg-gray-100 placeholder:text-gray-500 w-full shadow-md rounded-md mb-2  "
                type="string"
                placeholder={leagueDetails.leagueLogo}
                name="leagueLogo"
                onChange={(e) => setLeagueLogo(e.target.value)}
                value={leagueLogo}
              />
            </div>
          </div>
          {/* Deadline and fee container */}
          <div className="flex justify-center md:justify-between lg:justify-between mb-4 gap-5">
            <div className="flex flex-col w-1/3 md:w-1/2 lg:w-1/2 mr-2 text-neutral items-center md:items-start">
              <label className="text-md font-medium my-2 text-neutral text-center md:text-left">
                Open for registration:
              </label>

              <select
                className="input bg-gray-100  w-full shadow-md rounded-md mb-2 placeholder:text-gray-500"
                id="registrationOpen"
                name="registrationOpen"
                required
                value={registrationOpen}
                onChange={(e) => setRegistrationOpen(e.target.value)}
              >
                <option value="">- Select one</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="flex flex-col w-1/3 md:w-1/2 lg:w-1/2 mr-2 text-neutral items-center md:items-start">
              <label className="text-md font-medium my-2 text-neutral text-center md:text-left">
                Registration deadline:
              </label>
              <input
                className="input bg-gray-100 w-full  shadow-md rounded-md mb-2 placeholder:text-gray-500"
                type="date"
                name="registrationDeadline"
                required
                onChange={(e) => setRegistrationDeadline(e.target.value)}
                value={registrationDeadline}
              />
            </div>
            <div className="flex flex-col w-1/3 md:w-1/2 lg:w-1/2 mr-2 text-neutral items-center md:items-start ">
              <label className="text-md font-medium my-2 text-neutral text-center md:text-left">
                Registration fee (EUR):
              </label>
              <input
                className="input bg-gray-100 w-full shadow-md rounded-md mb-2 placeholder:text-gray-500 "
                type="number"
                placeholder={leagueDetails.registrationFee}
                name="registrationFee"
                required
                onChange={(e) => setRegistrationfee(e.target.value)}
                value={registrationFee}
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="btn btn-primary m-2 w-1/2 md:w-1/5 lg:w-1/5   font-bold py-2 px-4  my-4 text-white"
              type="submit"
            >
              Edit League
            </button>
          </div>
        </form>
      </div>
      {message && <p className="text-orange-600">{message}</p>}
      <div>
        <button className="m-10 text-secondary-focus" onClick={backToLeagues}>
          Back to leagues
        </button>
      </div>
    </div>
  );
}

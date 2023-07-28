import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { LeaguesContext } from "../../context/leagues.context.js";
import { FileUploadContext } from "../../context/fileUpload.context.js";
import FileUpload from "../UploadFile.jsx";

const AddLeague = ({ playerId }) => {
  const { updateLeagues } = useContext(LeaguesContext);
  const { uploadedFile, uploadedFileURL, setUploadedFile, setUploadedFileURL } =
    useContext(FileUploadContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState("");
  const [registrationOpen, setRegistrationOpen] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [registrationFee, setRegistrationfee] = useState("");
  const [leagueLogo, setLeagueLogo] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const leagueLogoUrl =
  //   uploadedFileURL ||
  //   "https://www.usaclicosenza.it/wp-content/uploads/2021/04/Padel-League-Logo.jpeg";

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Uploaded File URL:", uploadedFileURL);
    const body = {
      name,
      location,
      schedule,
      leagueLogo: uploadedFileURL,
      registrationOpen,
      registrationDeadline,
      registrationFee,
      createdBy: playerId,
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
        setRegistrationfee("");
        setRegistrationDeadline("");
        setLeagueLogo("");
        setMessage("You've successfully created your league!");
        updateLeagues();
      })
      .catch((error) => {
        console.error("Failed to create league", error.message);
        setErrorMessage("Failed to create league");
      });
  };

  useEffect(() => {
    if (message || errorMessage) {
      const timer = setTimeout(() => {
        setMessage("");
        setErrorMessage("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [message, errorMessage]);

  return (
    <>
      {/* Create new league form */}
      <form onSubmit={handleSubmit}>
        {/* Name and location container */}
        <div className="flex justify-center md:justify-between lg:justify-between mb-4 gap-5">
          <div className="flex flex-col w-1/2 mr-2 text-neutral items-center md:items-start">
            <label className="text-md w-1/2 font-medium mb-2 text-neutral text-center md:text-left">
              League name:
            </label>
            <input
              className="input placeholder:text-gray-500 bg-gray-100 w-full shadow-md rounded-md mb-2"
              placeholder="Best League"
              type="text"
              name="name"
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
              placeholder="Somewhere on earth"
              type="text"
              name="location"
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
              placeholder="Tuesdays and Thursdays"
              name="schedule"
              onChange={(e) => setSchedule(e.target.value)}
              value={schedule}
            />
          </div>
          <div className="flex flex-col w-1/2 mr-2 text-neutral items-center md:items-start ">
            <label className="text-md font-medium my-2 text-neutral text-center md:text-left">
              League logo:
            </label>
            <FileUpload />
            {/* <input
              className="input bg-gray-100 placeholder:text-gray-500 w-full shadow-md rounded-md mb-2 "
              type="string"
              placeholder="Add your URL here"
              name="leagueLogo"
              onChange={(e) => setLeagueLogo(e.target.value)}
              value={leagueLogo}
            /> */}
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
              onChange={(e) => setRegistrationDeadline(e.target.value)}
              value={registrationDeadline}
            />
          </div>
          <div className="flex flex-col w-1/3 md:w-1/2 lg:w-1/2 mr-2 text-neutral items-center md:items-start ">
            <label className="text-md font-medium my-2 text-neutral text-center md:text-left">
              Registration fee (EUR):
            </label>
            <input
              className="input bg-gray-100 w-full shadow-md rounded-md mb-2 placeholder:text-gray-500"
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
            className="btn btn-primary m-2 w-1/2 md:w-1/5 lg:w-1/5   font-bold py-2 px-4  my-4 text-white"
            type="submit"
          >
            Create League
          </button>
          {message ? (
            <p className="text-success">{message}</p>
          ) : errorMessage ? (
            <p className="text-error font-semibold text-center mr-2 mb-2">
              {errorMessage}
            </p>
          ) : (
            ""
          )}
        </div>
      </form>
    </>
  );
};

export default AddLeague;

"use client";
import React, { useState } from "react";
import axios from "axios";
import CourtModal from "./modals/CourtModal";

function CourtsMainpage() {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  const getCourts = async () => {
    const response = await axios.get("http://localhost:5005/api/courts", {
      params: {
        limit: 5,
      },
    });
    setCourts(response.data.slice(0, 5));
  };

  const handleGetCourts = () => {
    getCourts();
    setButtonClicked(true);
  };

  const handleOpenModal = (court) => {
    setSelectedCourt(court);
  };

  const handleCloseModal = () => {
    setSelectedCourt(null);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center my-4">
        {!buttonClicked && (
          <button
            onClick={handleGetCourts}
            className="py-2 px-4 bg-secondary text-white rounded"
          >
            Show me courts in my area
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 text-neutral">
        {courts.map((court) => (
          <div
            key={court._id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleOpenModal(court)}
          >
            <div className="font-bold text-xl mb-2 text-primary-focus">
              {court.name}
            </div>
            <p>
              <span className="font-bold">Address:</span> {court.address}
            </p>
            <p>
              <span className="font-bold">Surface:</span> {court.surface}
            </p>
            <img
              src={court.picture}
              alt={court.name}
              className="w-full h-48 object-cover rounded-b-lg"
            />
          </div>
        ))}
      </div>
      {selectedCourt && (
        <CourtModal court={selectedCourt} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default CourtsMainpage;

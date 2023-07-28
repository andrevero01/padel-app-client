"use client";
import React from "react";

const CourtModal = ({ court, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 text-neutral p-5">
      <div className="bg-gray-100 rounded-lg shadow-lg w-96 p-2">
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-bold text-primary-focus">
                {court.name}
              </h2>
              <p className="font-bold">Address:</p>
              <p>{court.address}</p>
              <p className="font-bold">Surface:</p>
              <p>{court.surface}</p>
              <p className="font-bold">Cleanliness:</p>
              <p>{court.cleanliness}</p>
            </div>
            <div>
              <p className="font-bold">Seating:</p>
              <p>{court.seating}</p>
              <p className="font-bold">Maintenance:</p>
              <p>{court.maintenance}</p>
              <p className="font-bold">Amenities:</p>
              <p>
                Equipment to rent?{" "}
                {court.amenities.equipmentRental ? "Yes" : "No"}
              </p>
              <p>Showers? {court.amenities.showers ? "Yes" : "No"}</p>
              <p>
                Snack Bar/Restaurant? {court.amenities.snackBar ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
        <img
          src={court.picture}
          alt={court.name}
          className="w-full h-48 object-cover rounded-b-lg p-2"
        />
        <div className="px-4 py-2 bg-gray-100 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourtModal;

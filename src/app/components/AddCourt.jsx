import React, { useState, useEffect } from "react";

function AddCourt({ setFormData, fetchExistingCourts, existingCourts }) {
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [selectedCourts, setSelectedCourts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleCourtSearch = (searchTerm) => {
    if (searchTerm.trim().length > 0) {
      setIsSearching(true); 
    } else {
      setIsSearching(false);
      setFilteredCourts([]);
    }

    const filteredCourts = filterExistingCourts(searchTerm);
    // Removed selected courts from the list
    const availableCourts = filteredCourts.filter(
      (court) =>
        !selectedCourts.find((selected) => selected._id === court._id)
    );

    setFilteredCourts(availableCourts);
  };

  const handleCourtSelect = (court) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      courts: [...prevFormData.courts, court._id],
    }));

    setSelectedCourts((prevSelectedCourts) => [...prevSelectedCourts, court]);

    setFilteredCourts((prevFilteredCourts) =>
      prevFilteredCourts.filter((filtered) => filtered._id !== court._id)
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      courtName: "",
    }));
  };

  const handleCourtRemove = (court) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      courts: prevFormData.courts.filter((id) => id !== court._id),
    }));

    setSelectedCourts((prevSelectedCourts) =>
      prevSelectedCourts.filter((selected) => selected._id !== court._id)
    );

    setFilteredCourts((prevFilteredCourts) => [...prevFilteredCourts, court]);
  };

  const filterExistingCourts = (searchTerm) => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return existingCourts.filter(
      (court) =>
        court.name.toLowerCase().includes(lowercaseSearchTerm)
    );
  };

  useEffect(() => {
    fetchExistingCourts();
  }, []);

  return (
    <div className="flex flex-col justify-start mx-3 mt-6">
      <div className="flex flex-col w-full">
        <label className="font-bold mb-3">Select Home Court(s)</label>
        <input
          type="text"
          placeholder="Search courts"
          onChange={(e) => handleCourtSearch(e.target.value)}
          className="input border mr-3 grow bg-gray-100 shadow-md rounded-md mb-2 placeholder:text-gray-500"
        />
        {isSearching && (
          <div className="mt-2">
            {filteredCourts.map((court) => (
              <div
                key={court._id}
                onClick={() => {
                  handleCourtSelect(court);
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    courtName: "",
                  }));
                }}
                className="cursor-pointer hover:bg-gray-200 px-2 py-1"
              >
                {`${court.name}`}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Selected Courts */}
      <div className="flex justify-start mt-6">
        <div className="flex flex-col w-full">
          <div>
            {selectedCourts.map((court) => (
              <div key={court._id} className="px-2 py-1 flex items-center">
                <div>{`${court.name}`}</div>
                <button
                  type="button"
                  onClick={() => handleCourtRemove(court)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourt;

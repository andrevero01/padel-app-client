import React from "react";

import React, { useState, useEffect } from "react";

{
  /* 

const CreateTeam = () => {
  const [formData, setFormData] = useState({
    name: "",
    players: [],
    captain: null,
    homeCourt: null,
    leagues: [],


  const fetchExistingObjects = async () => {
    try {
      const res = await axios.get("https://misty-stole-lamb.cyclic.app/api/players");
      setExistingObjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

    const [existingObjects, setExistingObjects] = useState([]);

  });

  */
}

function AddElement() {
  return function AddObjects({
    setFormData,
    fetchExistingObjects,
    existingObjects,
  }) {
    const [filteredObjects, setFilteredObjects] = useState([]);
    const [selectedObjects, setSelectedObjects] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleObjectSearch = (searchTerm) => {
      if (searchTerm.trim().length > 0) {
        setIsSearching(true);
      } else {
        setIsSearching(false);
        setFilteredObjects([]);
      }

      const filteredObjects = filterExistingObjects(searchTerm);
      // Removed selected players from the list
      const availableObjects = filteredObjects.filter(
        (object) =>
          !selectedObjects.find((selected) => selected._id === object._id)
      );

      setFilteredObjects(availableObjects);
    };

    const handleObjectSelect = (object) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        objects: [...prevFormData.objects, object._id],
      }));

      setSelectedObjects((prevSelectedObjects) => [
        ...prevSelectedObjects,
        object,
      ]);

      setFilteredObjects((prevFilteredObjects) =>
        prevFilteredObjects.filter((filtered) => filtered._id !== object._id)
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        objectName: "",
      }));
    };

    const handleObjectRemove = (object) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        objects: prevFormData.objects.filter((id) => id !== object._id),
      }));

      setSelectedObjects((prevSelectedObjects) =>
        prevSelectedObjects.filter((selected) => selected._id !== object._id)
      );

      setFilteredObjects((prevFilteredObjects) => [
        ...prevFilteredObjects,
        object,
      ]);
    };

    const filterExistingObjects = (searchTerm) => {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      return existingObjects.filter(
        (object) =>
          object.firstName.toLowerCase().includes(lowercaseSearchTerm) ||
          object.lastName.toLowerCase().includes(lowercaseSearchTerm)
      );
    };

    useEffect(() => {
      fetchExistingObjects();
    }, []);

    return (
      <div className="flex flex-col justify-start mx-3 mt-6">
        <div className="flex flex-col w-full">
          <label className="font-bold mb-3">Invite Players</label>
          <input
            type="text"
            placeholder="Search objects"
            onChange={(e) => handleObjectSearch(e.target.value)}
            className="input border mr-3 grow"
          />
          {isSearching && (
            <div className="mt-2">
              {filteredObjects.map((object) => (
                <div
                  key={object._id}
                  onClick={() => {
                    handleObjectSelect(object);
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      objectName: "",
                    }));
                  }}
                  className="cursor-pointer hover:bg-gray-200 px-2 py-1"
                >
                  {/* {`${player.firstName} ${player.lastName}`} */}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Selected Objects */}
        <div className="flex justify-start mt-6">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Selected Objects</label>
            <div>
              {selectedObjects.map((object) => (
                <div key={object._id} className="px-2 py-1 flex items-center">
                  {/* <div>{`${player.firstName} ${player.lastName}`}</div> */}
                  <button
                    type="button"
                    onClick={() => handleObjectRemove(object)}
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
  };
}

export default AddElement;

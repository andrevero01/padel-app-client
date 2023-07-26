"use client";

import React, { useState } from "react";
import axios from "axios";

const CreateCourt = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    lighting: "Excellent",
    surface: "Excellent",
    seating: "Excellent",
    cleanliness: "Excellent",
    maintenance: "Excellent",
    amenities: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setFormData((prevState) => ({
          ...prevState,
          amenities: [...prevState.amenities, value],
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          amenities: prevState.amenities.filter((amenity) => amenity !== value),
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://misty-stole-lamb.cyclic.app/api/courts",
        formData
      );
      console.log("Court stored successfully!");

      setFormData({
        name: "",
        address: "",
        lighting: "",
        surface: "",
        seating: "",
        cleanliness: "",
        maintenance: "",
        amenities: [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-4 flex flex-col bg-white mb-14">
      <h1 className="text-2xl font-bold mb-4 mx-3">Store Court</h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="flex justify-start mx-3">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Court Name</label>
            <input
              type="text"
              placeholder="The Super-Ultra-Awesome-Paddle COURT"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input border mr-3 grow"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div className="flex justify-start mx-3">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Court Name</label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input border mr-3 grow"
              required
            />
          </div>
        </div>

        {/* Amenities */}
        <div className="flex justify-start mx-3">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Amenities</label>
            <div className="space-y-2">
              {[
                "Restrooms",
                "Showers",
                "Locker rooms",
                "Water fountain",
                "Snack bar",
                "Equipment rental",
                "Scoreboard",
                "First aid kit",
                "Parking",
              ].map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    name="amenities"
                    value={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onChange={handleChange}
                  />
                  <label className="ml-2">{amenity}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lighting */}
        <div className="flex justify-start mx-3">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Lighting</label>
            <select
              name="lighting"
              placeholder="Select lighting condition"
              value={formData.lighting || "Excellent"}
              onChange={handleChange}
              className="input border mr-3 grow"
              required
            >
              <option value="Excellent">Excellent</option>
              <option value="Very good">Very good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
        </div>

        {/* Surface */}
        <div className="flex justify-start mx-3">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Surface</label>
            <select
              name="surface"
              placeholder="Select court surface condition"
              value={formData.surface || "Excellent"}
              onChange={handleChange}
              className="input border mr-3 grow"
              required
            >
              <option value="Excellent">Excellent</option>
              <option value="Very good">Very good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
        </div>

        {/* Seating */}
        <div className="flex justify-start mx-3">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Seating</label>
            <select
              name="seating"
              placeholder="Select seating condition"
              value={formData.seating || "Excellent"}
              onChange={handleChange}
              className="input border mr-3 grow"
              required
            >
              <option value="Excellent">Excellent</option>
              <option value="Very good">Very good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
        </div>

        {/* Cleanliness */}
        <div className="flex justify-start mx-3">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Cleanliness</label>
            <select
              name="cleanliness"
              placeholder="Select cleanliness condition"
              value={formData.cleanliness || "Excellent"}
              onChange={handleChange}
              className="input border mr-3 grow"
              required
            >
              <option value="Excellent">Excellent</option>
              <option value="Very good">Very good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
        </div>

        {/* Maintenance */}
        <div className="flex justify-start mx-3">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Maintenance</label>
            <select
              name="maintenance"
              placeholder="Select maintenance condition"
              value={formData.maintenance || "Excellent"}
              onChange={handleChange}
              className="input border mr-3 grow"
              required
            >
              <option value="Excellent">Excellent</option>
              <option value="Very good">Very good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded mt-4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourt;

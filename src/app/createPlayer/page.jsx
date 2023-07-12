"use client";

import { useState } from "react";
import axios from "axios";

const CreatePlayer = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    nationality: "",
    height: "",
    weight: "",
    dominantHand: "",
    backhandType: "",
    playingStyle: "",
    experienceLevel: "",
    coach: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/players", formData);
      console.log(res.data); // Handle the response as needed
      // Reset the form
      setFormData({
        name: "",
        age: "",
        gender: "",
        nationality: "",
        height: "",
        weight: "",
        dominantHand: "",
        backhandType: "",
        playingStyle: "",
        experienceLevel: "",
        coach: "",
      });
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  return (
    <div className="py-4 flex flex-col bg-white">
      <h1 className="text-2xl font-bold mb-4 mx-3">Create Player</h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}

        <div className="flex justify-start mx-3">
          <div className="flex flex-col w-3/6">
            <label className="font-bold mb-3">First Name</label>
            <input
              type="text"
              placeholder="Jane"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input border border-red-500 mr-3 grow"
              required
            />
          </div>
          <div className="flex flex-col w-3/6">
            <label className="font-bold mb-3">Last Name</label>
            <input
              type="text"
              placeholder="Smith"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input border border-red-500 grow"
              required
            />
          </div>
        </div>

        {/* Age / Height / Weight */}

        <div className="mt-6 mx-3">
          <div className="flex justify-start mt-3">
            <div className="flex flex-col w-1/6 grow">
              <label className="font-bold">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input input-bordered w-15 mr-3 mt-3"
              />
            </div>
            <div className="flex flex-col w-1/6 grow">
              <label className="font-bold">Height</label>
              <input
                placeholder="Cm"
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="input input-bordered mr-3 mt-3"
              />
            </div>
            <div className="flex flex-col w-1/6 grow">
              <label className="font-bold">Weight</label>
              <input
                placeholder="Kg"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="input input-bordered mt-3"
              />
            </div>
          </div>
        </div>

        {/* Gender */}

        <div className="mt-6 mx-3">
          <label className="font-bold">Gender</label>
          <div className="flex justify-start mt-3">
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
              className="radio radio-success"
            />
            <label className="font-bold mr-8 ml-2 align-super">Male</label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
              className="radio radio-success"
            />
            <label className="font-bold mr-8 ml-2 align-super">Female</label>
            <input
              type="radio"
              name="gender"
              value="Prefer not to say"
              onChange={handleChange}
              className="radio radio-success"
            />
            <label className="font-bold mr-8 ml-2 align-super">
              Non-specific
            </label>
          </div>
        </div>

        {/* Nationality */}

        <div className="mt-6 mx-3">
          <label className="font-bold">Nationality</label>
          <div className="flex justify-start mt-3">
            <input
              type="string"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Accordion */}

        <div className=" mx-3 mt-6">
          <div className="collapse bg-base-100 rounded-lg">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">Advanced</div>
            <div className="collapse-content">
              {/* Handedness */}

              <div className="mt-6 mx-3">
                <label className="font-bold">Handedness</label>
                <div className="flex justify-start mt-3">
                  <input
                    type="radio"
                    name="dominantHand"
                    value="Right"
                    onChange={handleChange}
                    className="radio radio-success"
                  />
                  <label className="font-bold mr-8 ml-2 align-super">
                    Right
                  </label>
                  <input
                    type="radio"
                    name="dominantHand"
                    value="Left"
                    onChange={handleChange}
                    className="radio radio-success"
                  />
                  <label className="font-bold mr-8 ml-2 align-super">
                    Left
                  </label>
                  <input
                    type="radio"
                    name="dominantHand"
                    value="Ambidextrous"
                    onChange={handleChange}
                    className="radio radio-success"
                  />
                  <label className="font-bold mr-8 ml-2 align-super">
                    Ambidextreous
                  </label>
                </div>
              </div>

              {/* Backhand */}

              <div className="mt-6 mx-3">
                <label className="font-bold">Backhand Style</label>
                <div className="flex justify-start mt-3">
                  <input
                    type="radio"
                    name="backhandType"
                    value="One-handed backhand"
                    onChange={handleChange}
                    className="radio radio-success"
                  />
                  <label className="font-bold mr-8 ml-2 align-super">
                    One-handed
                  </label>
                  <input
                    type="radio"
                    name="backhandType"
                    value="Two-handed backhand"
                    onChange={handleChange}
                    className="radio radio-success"
                  />
                  <label className="font-bold mr-8 ml-2 align-super">
                    Two-handed
                  </label>
                </div>
              </div>

              {/* Playing Style */}

              <div className="mt-7 mx-3">
                <label className="font-bold">Play Style</label>
                <div className="flex justify-start mt-3">
                  <input
                    type="radio"
                    name="playingStyle"
                    value="Offensive"
                    onChange={handleChange}
                    className="radio radio-success"
                  />
                  <label className="font-bold mr-8 ml-2 align-super">
                    Offensive
                  </label>
                  <input
                    type="radio"
                    name="playingStyle"
                    value="Control"
                    onChange={handleChange}
                    className="radio radio-success"
                  />
                  <label className="font-bold mr-8 ml-2 align-super">
                    Control
                  </label>
                </div>
              </div>

              {/* Coach */}

              <div className="flex flex-col justify-start mt-6 mx-3">
                <label className="font-bold align-super">Coach</label>
                <input
                  type="string"
                  name="coach"
                  value={formData.coach}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Experience Level */}

              <div className="flex flex-col justify-center items-center mt-6 mx-3">
                <label className="text-lg font-bold align-super">
                  Experience
                </label>
                <div className="rating rating-lg rating-half mt-3 mb-3">
                  <input
                    type="radio"
                    name="experienceLevel"
                    value="1"
                    onChange={handleChange}
                    className="bg-green-500 mask mask-star-2 mask-half-1"
                  />
                  <input
                    type="radio"
                    name="experienceLevel"
                    value="2"
                    onChange={handleChange}
                    className="bg-green-500 mask mask-star-2 mask-half-2"
                  />
                  <input
                    type="radio"
                    name="experienceLevel"
                    value="3"
                    onChange={handleChange}
                    className="bg-green-500 mask mask-star-2 mask-half-1"
                  />
                  <input
                    type="radio"
                    name="experienceLevel"
                    value="4"
                    onChange={handleChange}
                    className="bg-green-500 mask mask-star-2 mask-half-2"
                  />
                  <input
                    type="radio"
                    name="experienceLevel"
                    value="5"
                    onChange={handleChange}
                    className="bg-green-500 mask mask-star-2 mask-half-1"
                  />
                  <input
                    type="radio"
                    name="experienceLevel"
                    value="6"
                    onChange={handleChange}
                    className="bg-green-500 mask mask-star-2 mask-half-2"
                  />
                  <input
                    type="radio"
                    name="experienceLevel"
                    value="7"
                    onChange={handleChange}
                    className="bg-green-500 mask mask-star-2 mask-half-1"
                  />
                  <input
                    type="radio"
                    name="experienceLevel"
                    value="8"
                    onChange={handleChange}
                    className="bg-green-500 mask mask-star-2 mask-half-2"
                  />
                  <input
                    type="radio"
                    name="experienceLevel"
                    value="9"
                    onChange={handleChange}
                    className="bg-green-500 mask mask-star-2 mask-half-1"
                  />
                  <input
                    type="radio"
                    name="experienceLevel"
                    value="10"
                    onChange={handleChange}
                    className="bg-green-500 mask mask-star-2 mask-half-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded mt-4"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePlayer;

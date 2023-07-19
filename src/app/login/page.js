"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function loginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };

    axios
      .post("http://localhost:5005/api/players/login", body)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        router.push("/player");
      })
      .catch((error) => {
        const errorDescription = error.message;
        setErrorMessage(errorDescription);
      });

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between items-center mt-8 mb-4 gap-5">
          <div className="flex flex-col w-1/3 mr-2">
            <label className="text-md font-medium mb-2 text-neutral">
              Email:
            </label>
            <input
              className="input input-bordered input-primary w-full shadow-md rounded-md mb-2"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-1/3 mr-2">
            <label className="text-md font-medium mb-2 text-neutral">
              Password:
            </label>
            <input
              className="input input-bordered input-primary w-full shadow-md rounded-md mb-2"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-primary hover:bg-secondary font-bold py-2 px-4 rounded my-4 w-1/6 text-white"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
}

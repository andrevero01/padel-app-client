"use client";

import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "../../context/auth.context";
import { useEffect } from "react";

const LeagueLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const router = useRouter();
  const { storedToken, authenticatePlayer, player, isLoggedIn } =
    useContext(AuthContext);

  useEffect(() => {
    router.prefetch("/leagues");
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };

    axios
      .post("http://localhost:5005/api/auth/login", body)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        storedToken(response.data.authToken);
        authenticatePlayer();
        router.push("/leagues");
      })
      .catch((error) => {
        const errorDescription = error.message;
        setErrorMessage(errorDescription);
      });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen text-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between items-center p-10 gap-5 ">
          <h2 className="font-semibold ">
            Please log in to your account first
          </h2>
          <div className="flex flex-col  mr-2">
            <label className="text-md font-medium mb-2 text-grey-100">
              Email:
            </label>
            <input
              className="input input-bordered input-white w-full shadow-md rounded-md mb-2"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col mr-2">
            <label className="text-md font-medium mb-2  text-grey-100">
              Password:
            </label>
            <input
              className="input input-bordered input-secondary w-full shadow-md rounded-md mb-2"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-primary hover:bg-secondary font-bold py-2 px-4 rounded my-4 w-1/2 text-white"
            type="submit"
          >
            Login
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p>Don't have an account yet?</p>
          <Link
            className="bg-info hover:bg-primary font-bold py-2 px-4 rounded mb-4 w-1/8 text-white"
            href="/createPlayer"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LeagueLogin;

"use client";

import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "../context/auth.context";
import { useEffect } from "react";

export default function loginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const router = useRouter();
  const { storedToken, authenticatePlayer, player, isLoggedIn } =
    useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/player");
    }
  }, [isLoggedIn]);
  if (isLoggedIn) {
  }

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/player");
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
    <div className="h-screen">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between items-center mt-10 mb-4 gap-5 bg-white md:mx-20 rounded-lg ">
          <h2 className="mt-6 text-neutral">Welcome back!</h2>
          <div className="flex flex-col mr-2">
            <label className="text-md font-medium mb-2 text-neutral">
              Email:
            </label>
            <input
              className="input bg-gray-100 shadow-md rounded-md mr-3 text-neutral"
              placeholder="Email@gmail.com"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col mr-2">
            <label className="text-md font-medium mb-2 text-neutral">
              Password:
            </label>
            <input
              className="input bg-gray-100 shadow-md rounded-md text-neutral mr-3"
              placeholder="**********"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-primary hover:bg-primary-focus font-bold py-2 px-10 rounded mt-3 text-white shadow-lg"
            type="submit"
          >
            Login
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p>Don't have an account yet?</p>
          <Link
            className="bg-secondary hover:bg-secondary-focus font-bold py-2 px-10 rounded mb-10 text-white shadow-lg"
            href="/createPlayer"
          >
            {" "}
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

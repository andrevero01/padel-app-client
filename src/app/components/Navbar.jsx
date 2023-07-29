"use client";

import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context.js";

const Navbar = () => {
  const { isLoggedIn, player, logOutPlayer } = useContext(AuthContext);
  return (
    <nav
      className={`navbar lg:static lg:top-0 fixed bottom-0 justify-center bg-neutral text-white w-full z-10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-evenly h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white font-bold">
              <img
                className="w-14"
                src="https://www.usaclicosenza.it/wp-content/uploads/2021/04/Padel-League-Logo.jpeg"
                alt="App logo"
              ></img>
            </Link>
          </div>
          <div>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/rules"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Padel Rules
              </Link>
              <Link
                href="/player"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Player
              </Link>
              <Link
                href="/leagues"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Leagues
              </Link>
              <Link
                href="/gallery"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Gallery
              </Link>
              {isLoggedIn && (
                <Link
                  href="/adminPanel"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Admin Panel
                </Link>
              )}

              {isLoggedIn ? (
                <button
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={logOutPlayer}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/createPlayer"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Signup
                  </Link>
                  <Link
                    href="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

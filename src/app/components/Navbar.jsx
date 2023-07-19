import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          The Padel App
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="leagues">Leagues</Link>
          </li>
          <li>
            <a>Games</a>
          </li>
          <li>
            <a>Teams</a>
          </li>
          <li>
            <a>Gallery</a>
          </li>
          <li>
            <details>
              <summary>Login</summary>
              <ul className="p-2 bg-base-100">
                <li>
                  <a>Logout</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

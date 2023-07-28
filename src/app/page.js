'use client'
import ScrollToTopButton from "./components/ScrollToTop.jsx";
import PlayersMainpage from "./components/PlayersMainpage.jsx";
import { useState, useEffect } from "react";
import CourtsMainpage from "./components/CourtsMainpage.jsx";



export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="px-24 py-10">
        <h1 className="text-center text-4xl font-bold mb-4">
          Play Padel, Unleash Fun!
        </h1>
        <p className="text-center text-lg">Welcome to the Padel League! Join our hobby padel leagues for a fun and competitive experience. Whether you're a beginner or a seasoned player, our leagues are designed to cater to all skill levels. Step on the court, make new friends, and enjoy the thrill of padel!</p>
        <br></br>
        <div>
          <h1 className="text-center text-2xl font-bold">Popular Players:</h1>
          <PlayersMainpage />
        </div>
        <br></br>
        <div>
          <h1 className="text-center text-2xl font-bold">Available Courts:</h1>
          <CourtsMainpage />
        </div>
        <div className="fixed bottom-10 right-10">
          <ScrollToTopButton />
        </div>
      </div>
    </main>
  );
}

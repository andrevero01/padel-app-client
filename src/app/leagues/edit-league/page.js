"use client";

import React, { useEffect, useState } from "react";
import ScrollToTopButton from "../../components/ScrollToTop";
import EditLeague from "../../components/League/EditLeague.jsx";

export default function editLeaguePage() {
  return (
    <div>
      <EditLeague />
      <ScrollToTopButton />
    </div>
  );
}

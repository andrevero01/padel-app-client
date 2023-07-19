"use client";

import React, { useEffect, useState } from "react";
import ScrollToTopButton from "../../components/ScrollToTop";
import EditLeague from "../../components/League/EditLeague.jsx";
import { useRouter } from "next/router";

export default function editLeaguePage() {
  const router = useRouter();
  const { leagueId } = router.query;
  return (
    <div>
      <EditLeague leagueId={leagueId} />
      <ScrollToTopButton />
    </div>
  );
}

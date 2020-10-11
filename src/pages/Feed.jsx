import React, { useEffect, useContext } from "react";
import { WithingsContext } from "../contexts/WithingsContext";
import { getActivities, getSleep } from "../lib/fetchWithings";
import DailyActivity from "../components/DailyActivity";

import { H1 } from '../styles/Types'

function Feed() {
  const { userData, setUserData } = useContext(WithingsContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActivities();
      const sleep = await getSleep();
      console.log('sleep', sleep)
      setUserData({ dailyData: data });
    };

    fetchData();
  }, [setUserData]);

  return (
    <div>
      <H1>Hi there!</H1>
      <DailyActivity />
    </div>
  );
}

export default Feed;

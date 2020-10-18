import React, { useEffect, useContext } from "react";
import { WithingsContext } from "../contexts/WithingsContext";
import { getActivities, getSleep } from "../lib/fetchWithings";
import DailyActivity from "../components/legacy/DailyActivity";
import Sleep from "../components/legacy/Sleep";
import SleepQuality from "../components/legacy/SleepQuality";

import { H1 } from "../styles/Types";
import { HorizontalScroll } from "../styles/HorizontalScroll";

function Feed() {
  const { setUserData } = useContext(WithingsContext);

  useEffect(() => {
    const fetchData = async () => {
      const activities = await getActivities();
      const sleep = await getSleep();
      setUserData({ dailyData: activities, sleep });
    };

    fetchData();
  }, [setUserData]);

  return (
    <div>
      <H1>Hi there!</H1>
      <HorizontalScroll>
        <DailyActivity />
        <SleepQuality />
        <Sleep />
      </HorizontalScroll>
    </div>
  );
}

export default Feed;

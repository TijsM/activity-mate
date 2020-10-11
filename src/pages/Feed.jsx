import React, { useEffect, useContext } from "react";
import { WithingsContext } from "../contexts/WithingsContext";
import { getActivities, getSleep } from "../lib/fetchWithings";
import DailyActivity from "../components/DailyActivity";
import Sleep from "../components/Sleep";

import { H1 } from "../styles/Types";
import { HorizontalScroll } from "../styles/HorizontalScroll";

function Feed() {
  const { userData, setUserData } = useContext(WithingsContext);

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
        <Sleep />
      </HorizontalScroll>
    </div>
  );
}

export default Feed;

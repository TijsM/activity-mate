import React, { createContext, useState, useEffect } from "react";
import { getActivities, getSleep, getWorkouts } from "../lib/fetchWithings";

export const WithingsContext = createContext(null);


export const WithingsProvider = ({children, isAuthenticated}) => {
    const [userData, setUserData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const activities = await getActivities();
      const sleep = await getSleep();
      const workouts = await getWorkouts()
      setUserData({ dailyData: activities, sleep, workouts });
    };

    fetchData();
  }, [isAuthenticated]);


  return  <WithingsContext.Provider value={{ userData, setUserData }}>
      {children}
  </WithingsContext.Provider>

}
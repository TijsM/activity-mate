import React, { createContext, useState, useEffect } from "react";
import { getActivities, getSleep } from "../lib/fetchWithings";

export const WithingsContext = createContext(null);


export const WithingsProvider = ({children, isAuthenticated}) => {
    const [userData, setUserData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const activities = await getActivities();
      const sleep = await getSleep();
      setUserData({ dailyData: activities, sleep });
    };

    fetchData();
  }, [isAuthenticated]);


  return  <WithingsContext.Provider value={{ userData, setUserData }}>
      {children}
  </WithingsContext.Provider>

}
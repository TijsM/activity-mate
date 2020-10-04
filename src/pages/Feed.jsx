import React, { useEffect, useContext } from "react";
import {WithingsContext} from '../contexts/WithingsContext'
import {getActivities} from '../lib/fetchWithings'
import DailyActivity from '../components/DailyActivity'

function Feed() {
  const {userData, setUserData} = useContext(WithingsContext)

  useEffect(() => {
    const fetchData = async () => {
      const data =  await getActivities()
      setUserData({dailyData: data})
    }

    fetchData()
  }, [setUserData])


  return <DailyActivity/>
}

export default Feed
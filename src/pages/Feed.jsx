import React, { useEffect, useContext } from "react";
import {WithingsContext} from '../contexts/WithingsContext'
import {getActivities} from '../lib/fetchWithings'

function Feed() {
  const {userData, setUserData} = useContext(WithingsContext)

  useEffect(() => {
    const fetchData = async () => {
      const data =  await getActivities()
      setUserData({dailyData: data})
    }

    fetchData()
  }, [setUserData])

  console.log('userData', userData)

  return <div>
      yikes, we here
  </div>
}

export default Feed
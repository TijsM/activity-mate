import React, { useEffect } from "react";
import {getActivities} from '../lib/fetchWithings'

function Auth() {

  useEffect(() => {
    const fetchData = async () => {
      const data =  await getActivities()
      console.log('data', data)
    }

    fetchData()
  })

  return <div>
      yikes, we here
  </div>
}

export default Auth
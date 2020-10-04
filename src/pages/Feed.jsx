import React, { useEffect } from "react";
import {getActivity} from '../lib/fetchWithings'

function Auth() {

  useEffect(() => {
    const fetchData = async () => {
      const data =  await getActivity()
      console.log('data', data)
    }

    fetchData()
  })

  return <div>
      yikes, we here
  </div>
}

export default Auth
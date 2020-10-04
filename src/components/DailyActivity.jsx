import React, {useContext, useState, useEffect} from "react";
import {WithingsContext} from '../contexts/WithingsContext'
import {Section} from '../styles/Section'
import {getCustomWithingsDate, getYesterday} from '../lib/getWithingsDate'

function DailyActivity () {
  const {userData} = useContext(WithingsContext)
  const [todayActivity, setTodayActivity] = useState()
  console.log("in super comp", userData)

  useEffect(() => {
    if(userData.dailyData){
      const today = userData.dailyData.find(day => {
        console.log(day.date, getYesterday())
        return day.date === getYesterday()
      })
      setTodayActivity(today)
    }
  }, [userData])

  console.log('yesterday', todayActivity)

  return <Section>
    yyiikes

  </Section>;
};

export default DailyActivity;

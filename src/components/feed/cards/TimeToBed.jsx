import React, { useState, useEffect, useContext } from "react";
import { WithingsContext } from "../../../contexts/WithingsContext";

import getLastDays from '../../../lib/getLastDays'
import getAverageTimeToBed from '../../../lib/getAverageTimeToBed'
import formatTimeFromMinutes from "../../../lib/formatTimeFromMinutes";

import FeedCard from "../Card";

function TimeToBed() {
    const { userData } = useContext(WithingsContext);

    // in minutes
    const [averageTTB, setAverageTTB] = useState(0);

    useEffect(() => {
      if (userData.sleep) {
        setAverageTTB(getAverageTimeToBed(getLastDays(userData.sleep, 1)));
      }
    }, [userData]);



    return (
      <FeedCard
        activity="Sleep"
        title="Time to bed"
        context="Last night, you went to bed at"
        highlight={`${formatTimeFromMinutes(
            Math.round(averageTTB),
            "u ",
            "min"
          )}`}
        detailRoute="/time-to-bed"
      />
    );
  }
  export default TimeToBed;
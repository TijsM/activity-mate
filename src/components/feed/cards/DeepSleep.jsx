import React, { useState, useEffect, useContext } from "react";
import { WithingsContext } from "../../../contexts/WithingsContext";
import getAverageRelativeDeepSleep from "../../../lib/getAverageRelativeDeepSleep";
import getLastDays from '../../../lib/getLastDays'

import FeedCard from "../Card";

function DeepSleep() {
  const { userData } = useContext(WithingsContext);

  // relative, in %
  const [averageDeepSleep, setAverageDeepSleep] = useState(0);

  useEffect(() => {
    if (userData.sleep) {
      setAverageDeepSleep(getAverageRelativeDeepSleep(getLastDays(userData.sleep, 1)));
    }
  }, [userData]);

  return (
    <FeedCard
      activity="Sleep"
      title="Relative deep sleep a night"
      context="Last night, your deep sleep was"
      highlight={`${Math.round(averageDeepSleep)}%`}
      detailRoute="/heart-rate"
    />
  );
}

export default DeepSleep;

import React, { useContext, useEffect, useState } from "react";
import { WithingsContext } from "../contexts/WithingsContext";
import getAverage from "../lib/getAverage";

import { Section } from "../styles/Section";
import { H2, SubTitle } from "../styles/Types";
import {} from "react";

function NightsOut() {
  const { userData } = useContext(WithingsContext);
  const [averageSleepHr, setAverageSleepHr] = useState(0);
  console.log("sleepdata", userData.sleep);

  useEffect(() => {
    if (userData.sleep) {
      setAverageSleepHr(
        getAverage(userData.sleep.map((night) => night.data.hr_average))
      );
    }
  }, [userData]);

  return (
    <Section>
      <H2>Drunk nights</H2>
      <SubTitle>
        By looking at your average heart raten and the time you went to bed we
        can guess if you went out or not
      </SubTitle>
      your average HR during the nights is {Math.round(averageSleepHr)}
    </Section>
  );
}

export default NightsOut;

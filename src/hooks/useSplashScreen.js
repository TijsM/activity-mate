import { useContext, useState, useEffect } from "react";
import { WithingsContext } from "../contexts/WithingsContext";

function useSplashScreen() {
  const { userData } = useContext(WithingsContext);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
    if (Object.keys(userData).length > 1) {
      setDataIsLoaded(true);
    }
  }, [userData]);

  return dataIsLoaded;
}

export default useSplashScreen;

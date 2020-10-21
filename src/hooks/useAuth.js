import { useEffect, useState } from "react";
import getAccessToken from "../lib/getAccessToken";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState();
  const [isExpired, setIsExpired] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get("state");
    const code = urlParams.get("code");

    if (state === "authenticated") {
      getAccessToken(code);
    }

    setUserToken(localStorage.getItem("access_token"));
    const expires = parseInt(localStorage.getItem("token_expiration"), 10);

    setIsExpired(expires < new Date().getTime());
  }, []);

  useEffect(() => {
    setIsAuthenticated(userToken && !isExpired);
  }, [userToken, isExpired]);

  return isAuthenticated;
};

export default useAuth;

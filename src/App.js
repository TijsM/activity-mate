import React, { useEffect } from "react";
import getAccessToken from "./lib/getAccessToken";
import "./App.css";

import Auth from "./pages/Auth";
import Feed from "./pages/Feed";

function App() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get("state");
    const code = urlParams.get("code");
    if (state === "authenticated") {
      getAccessToken(code);
    }
  });

  const isAuthenticated = () => {
    const token = localStorage.getItem("access_token");
    const expires = new Date(localStorage.getItem("token_expiration"))
    const isExpired = expires < new Date();

    return (token && !isExpired)
  };

  return (
    <div className="App">
      {
        isAuthenticated()?<Feed/>:<Auth/>
      }
    </div>
  );
}

export default App;

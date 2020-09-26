import React, { useEffect } from "react";
import Auth from "./pages/Auth";
import getAccessToken from './lib/getAccessToken'
import "./App.css";

function App() {

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get('state')
    const code = urlParams.get('code')
    if(state === 'authenticated'){
      getAccessToken(code)
    }
  })

  return (
    <div className="App">
      <Auth></Auth>
    </div>
  );
}

export default App;

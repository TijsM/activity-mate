import { clientId, consumerSecret } from "../constants";

const getAccessToken = async (code) => {
  console.log("code from lib", code);
  clearUrl();
  
  const res = await fetch("https://wbsapi.withings.net/v2/oauth2", {
    body: `action=requesttoken&grant_type=authorization_code&client_id=${clientId}&client_secret=${consumerSecret}&code=${code}&redirect_uri=http://localhost:3000/`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  const response = await res.json();

  if (response.body && response.status === 0 ) {
    localStorage.setItem("access_token", response.body.access_token);
    localStorage.setItem("userId", response.body.userid);
    localStorage.setItem("refresh_token", response.body.refresh_token);
  }
  else{
    console.log('authentication failed - ', response)
  }
};

const clearUrl = () => {
  if (window.location.href.includes("localhost") === false) {
    window.history.pushState("", "", "/");
  } else {
    console.info("[DEV] not cleaning the url because in dev");
  }
};

export default getAccessToken;

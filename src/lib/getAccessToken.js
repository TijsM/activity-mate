import { clientId, consumerSecret } from "../constants";


const getAccessToken = async (code) => {
  clearUrl();

  const res = await fetch("https://wbsapi.withings.net/v2/oauth2", {
    body: `action=requesttoken&grant_type=authorization_code&client_id=${clientId}&client_secret=${consumerSecret}&code=${code}&redirect_uri=http://localhost:3000/`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",

    },
    method: "POST",
  });

  const response = await res.json();

  if (response.body && response.status === 0) {
    const now = new Date();
    now.setHours((now.getHours() + response.body.expires_in / 60 / 60) % 24);

    localStorage.setItem("access_token", response.body.access_token);
    localStorage.setItem("userId", response.body.userid);
    localStorage.setItem("refresh_token", response.body.refresh_token);
    localStorage.setItem("token_expiration", now);

    window.location.reload()
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
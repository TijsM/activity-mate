const getAccessToken = async (code) => {
  clearUrl();

  const refreshToken = localStorage.getItem("refresh_token");
  let grant_type = "authorization_code";
  let accessString = `code=${code}`;

  if (refreshToken) {
    grant_type = "refresh_token";
    accessString = `refresh_token=${refreshToken}`;
  }

  const body = `action=requesttoken&grant_type=${grant_type}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CONSUMER_SECRET}&${accessString}&redirect_uri=${window.location.href}`;
  console.log("body", body);
  const res = await fetch("https://wbsapi.withings.net/v2/oauth2", {
    body: body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  const response = await res.json();
  console.log("response", response.error);

  if (response?.error?.includes("invalid refresh_token")) {
    localStorage.removeItem("refresh_token")
  }

  if (response.body && response.status === 0) {
    const now = new Date();

    localStorage.setItem("access_token", response.body.access_token);
    localStorage.setItem("userId", response.body.userid);
    localStorage.setItem("refresh_token", response.body.refresh_token);
    localStorage.setItem(
      "token_expiration",
      now.getTime() + response.body.expires_in * 1000
    );

    window.location.reload();
  }
};

const clearUrl = () => {
  if (window.location.href.includes("localhost") === false) {
    window.history.pushState("", "", "/");
  } else {
    window.history.pushState("", "", "/");
    // console.info("[DEV] not cleaning the url because in dev");
  }
};

export default getAccessToken;

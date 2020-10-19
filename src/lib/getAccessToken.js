const getAccessToken = async (code) => {
  clearUrl();

  console.log('code', code)

  const res = await fetch("https://wbsapi.withings.net/v2/oauth2", {
    body: `action=requesttoken&grant_type=authorization_code&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CONSUMER_SECRET}&code=${code}&redirect_uri=${window.location.href}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",

    },
    method: "POST",
  });

  const response = await res.json();
  console.log('res', response)

  console.log('response', response)

  if (response.body && response.status === 0) {
    const now = new Date();
    // now.setHours((now.getHours() + response.body.expires_in / 60 / 60) % 24);

    console.log(response.body.expires_in)


    localStorage.setItem("access_token", response.body.access_token);
    localStorage.setItem("userId", response.body.userid);
    localStorage.setItem("refresh_token", response.body.refresh_token);
    localStorage.setItem("token_expiration", now.getTime()+response.body.expires_in * 1000);

    window.location.reload()
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

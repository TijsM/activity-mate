import React from "react";

function Auth() {
  console.log('process', process.env)

  const url = `http://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&state=authenticated&scope=user.activity&redirect_uri=${window.location.href}`;
  return <a href={url}>Log in with your withings account</a>;
}

export default Auth
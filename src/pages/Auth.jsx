import React from "react";
import { clientId } from "../constants";

function Auth() {
  const url = `http://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=${clientId}&state=authenticated&scope=user.activity&redirect_uri=http://localhost:3000/`;
  return <a href={url}>Log in with your withings account</a>;
}

export default Auth
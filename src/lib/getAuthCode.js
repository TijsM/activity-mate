export default () => {
  const url = `http://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&state=authenticated&scope=user.activity&redirect_uri=${window.location.href}`;

  window.location.href = url
}
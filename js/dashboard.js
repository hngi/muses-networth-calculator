const auth_token = "muse_nwc_auth_token";
const user_name = "muse_nwc_name";
const user_email = "muse_nwc_email";
document.querySelector("#dashboard-main .welcome-message h1").innerHTML =
  "Hello, " + window.localStorage.getItem(user_name);

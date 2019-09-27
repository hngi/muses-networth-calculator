auth_token = "muse_nwc_auth_token";
user_name = "muse_nwc_name";
user_email = "muse_nwc_email";
document.querySelector("#dashboard-main .welcome-message h1").innerHTML =
  "Hello, " + window.localStorage.getItem(user_name);

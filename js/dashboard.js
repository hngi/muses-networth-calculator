auth_token = "muse_nwc_auth_token";
user_name = "muse_nwc_name";
user_email = "muse_nwc_email";
console.log(window.localStorage.getItem(user_name));
if (
  !window.localStorage.getItem(user_name) ||
  window.localStorage.getItem(user_name) == null ||
  window.localStorage.getItem(user_name) == undefined
) {
  window.location.href = "../index.html";
}
document.querySelector("#dashboard-main .welcome-message h1").innerHTML =
  "Hello, " + window.localStorage.getItem(user_name);

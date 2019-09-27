auth_token = "muse_nwc_auth_token";
user_name = "muse_nwc_name";
user_email = "muse_nwc_email";

document.querySelector(".general-header #name-plate")
	.appendChild(document.createTextNode(`${window.localStorage.getItem(user_name)}`));
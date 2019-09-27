auth_token = "muse_nwc_auth_token";
user_name = "muse_nwc_name";
user_email = "muse_nwc_email";

document.querySelector(".general-header #name-plate")
	.appendChild(document.createTextNode(`${window.localStorage.getItem(user_name)}`));

document.querySelector(".general-sidebar > #logout-icon").addEventListener("click", e =>
{
	localStorage.removeItem(auth_token);
	localStorage.removeItem(user_name);
	localStorage.removeItem(user_email);
	location.href = "index.html";
})
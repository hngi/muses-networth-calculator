const auth_token = "muse_nwc_auth_token";
const user_name = "muse_nwc_name";
const user_email = "muse_nwc_email";
//const backendUrl = "http://localhost:3000";	// For local testing
const backendUrl = "https://muses-nwc-api.herokuapp.com";

// Ping heroku backend host. It sleeps after inactive interval and takes around 12 seconds to wake
// So, hasten the process at page load
//
fetch(backendUrl + "/api");


// redirect if logged in
//if (window.localStorage.getItem(auth_token))
//	location.href = "dashboard.html";

const useToken = data =>
{
  window.localStorage.setItem(auth_token, data.token);
  window.localStorage.setItem(user_name, data.name);
  window.localStorage.setItem(user_email, data.email);
}

// Login
document.getElementById("login-button").addEventListener("click", e => 
{
	e.preventDefault();
	let email = document.getElementById("login-email").value;
	let password = document.getElementById("login-password").value;
	let data = {"email": email, "password": password};
	fetch(backendUrl + "/api/login",
	{
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		headers: 
		{
		  'Content-Type': 'application/json',
		  'Origin': 'muse-client',
		  'Authorization': 'Bearer ' + (localStorage.getItem(auth_token) || '')
		},
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	})
	    .then(data => data.json())
	    .then(json => 
	    {
	    	if (json.code == 496)
	    		alert("Email doesn't exist!");
	    	else if (json.code == 419)
	    		alert("Incorrect password");
			else if (json.data && json.data.token)
			{
				useToken(json.data);
				location.href = "dashboard.html";
			}
	    });
});

// Signup
document.getElementById("register-button").addEventListener("click", e => 
{
	e.preventDefault();
	let name = document.getElementById("register-firstname").value;
	let email = document.getElementById("register-email").value;
	let password = document.getElementById("register-password").value;
	let data = {"name": name, "email": email, "password": password};
	fetch(backendUrl + "/api/signup",
	{
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		headers: 
		{
		  'Content-Type': 'application/json',
		  'Origin': 'muse-client',
		  'Authorization': 'Bearer ' + (localStorage.getItem(auth_token) || '')
		},
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	})
	    .then(data => data.json())
	    .then(json => 
	    {
	    	if (json.code == 427)
	    		alert("Email already exists!");
			else if (json.data && json.data.token)
			{
				useToken(json.data);
				location.href = "dashboard.html";
			}
	    });
});
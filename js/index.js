auth_token = "muse_nwc_auth_token";
user_name = "muse_nwc_name";
user_email = "muse_nwc_email";
//const backendUrl = "http://localhost:3000";	// For local testing
const backendUrl = "https://muses-nwc-api.herokuapp.com";

// Ping heroku backend host. It sleeps after inactive interval and takes around 12 seconds to wake
// So, hasten the process at page load
//
fetch(backendUrl + "/api");


// redirect if logged in
if (window.localStorage.getItem(auth_token))
	location.href = "dashboard.html";

const useToken = data =>
{
  window.localStorage.setItem(auth_token, data.token);
  window.localStorage.setItem(user_name, data.name);
  window.localStorage.setItem(user_email, data.email);
}

// Login
document.getElementById("login-button").addEventListener("click", e => 
{
	let email = document.getElementById("login-email").value;
	let password = document.getElementById("login-password").value;

	if (/\w+@\w+/.test(email) && password.length)
		e.preventDefault();
	else
		return;

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
				if ( json.code == 496 )
					// Change alert to nice error message
					// alert("Email doesn't exist!");
					unknownEmail();
					// console.log('email doesnt exist bruh')
				else if ( json.code == 419 )
					// Change alet to nice error message
					// alert("Incorrect password");
					incorrectPassword();
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
	let name = document.getElementById("register-firstname").value;
	let email = document.getElementById("register-email").value;
	let password = document.getElementById("register-password").value;

	if (name.length && /\w+@\w+/.test(email) && password.length)
		e.preventDefault();
	else
		return;

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
					// alert("Email already exists!");
					takenEmail();
			else if (json.data && json.data.token)
			{
				useToken(json.data);
				location.href = "dashboard.html";
			}
	    });
});

// Error messages if user inputs wrong or unexpected data
const unknownEmail = () => {
	const login = document.getElementById( "loginHeader" )
	const error = document.createElement( 'p' )
	error.id = "unknownEmail";
	error.style.background = "red";
	error.style.padding = "0.7rem 1rem";
	error.style.textAlign = "center";
	error.style.borderRadius = "10px";
	error.style.marginBottom = "2rem";
	error.style.color = "#fff";

	error.innerText = "Email doesn't exist!";
	if ( !document.getElementById( "unknownEmail" )) {
			login.parentNode.insertBefore(error, login.nextSibling);
		}
	setTimeout(() => {
		error.remove();
	}, 3000);
}

const incorrectPassword = () => {
	const login = document.getElementById( "loginHeader" );
	const error = document.createElement( "p" );
	error.id = "incorrectPassword";
  error.style.background = "red";
  error.style.padding = "0.7rem 1rem";
  error.style.textAlign = "center";
  error.style.borderRadius = "10px";
  error.style.marginBottom = "2rem";
  error.style.color = "#fff";

  error.innerText = "Incorrect password!";
	if ( !document.getElementById( "incorrectPassword" ) ) {
		login.parentNode.insertBefore(error, login.nextSibling);
	}
  setTimeout(() => {
    error.remove();
  }, 3000);
}

const takenEmail = () => {
	const register = document.getElementById( "registerHeader" );
	const error = document.createElement( "p" );
	error.id = "takenEmail";
  error.style.background = "red";
  error.style.padding = "0.7rem 1rem";
  error.style.textAlign = "center";
  error.style.borderRadius = "10px";
  error.style.marginBottom = "2rem";
  error.style.color = "#fff";

  error.innerText = "Email has already been taken!";
	if ( !document.getElementById( "takenEmail" )) {
		register.parentNode.insertBefore(error, register.nextSibling);
	}
  setTimeout(() => {
    error.remove();
  }, 3000);
}


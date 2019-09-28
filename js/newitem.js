auth_token = "muse_nwc_auth_token";
overview_mode = "muse_nwc_overview_mode";
const backendUrl = "https://muses-nwc-api.herokuapp.com";

// Ping heroku backend host. It sleeps after inactive interval and takes around 12 seconds to wake
// So, hasten the process at page load
//
fetch(backendUrl + "/api");

const applyMode = () =>
{
	let mode = localStorage.getItem(overview_mode);
	document.getElementById("intro-spec").textContent = mode === "ASSET" ?
		"Add Asset" : "Add Liability";
	document.getElementById("item-type").value = mode.toLowerCase();
	document.getElementById("item-value").setAttribute("placeholder", mode === "ASSET" ?
		"Positive value for asset" : "Negative value for liability");
}

applyMode();

document.getElementById("item-type").addEventListener("change", e =>
{
	localStorage.setItem(overview_mode, e.target.value.toUpperCase());
	applyMode();
})

document.getElementById("item-value").addEventListener("input", ({target}) =>
{
	target.value = target.value.split("").filter((a, i) => /\d/.test(a) || (i === 0 && /-/.test(a))).join("");
});

document.getElementById("intro-title").addEventListener("click", () => location.href = "overview.html");

document.getElementById("newitem-submit").addEventListener("click", e =>
{
	let type = document.getElementById("item-type").value;
	let description = document.getElementById("item-desc").value;
	let value = document.getElementById("item-value").value;

	if (!value.length || !description.length)
		return;
	else
		e.preventDefault();

	let data = {type, description, value};
	fetch(backendUrl + "/api/items",
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
		if (json.code)
			console.log(`Error! ${json.code}: ${json.errors}`)
		else
		{
			document.getElementById("newitem-info").style.opacity = 100;
			setTimeout(() => location.href = "overview.html", 2000);
		}
	});
})
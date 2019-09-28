auth_token = "muse_nwc_auth_token";
overview_mode = "muse_nwc_overview_mode";
item_edit = "muse_nwc_item_edit";
const backendUrl = "https://muses-nwc-api.herokuapp.com";


const table = document.querySelector("table");
let items = [];
let selectedItems = [];
let displayedCBs = [];
if (!localStorage.getItem(overview_mode)) 
	localStorage.setItem(overview_mode, "ASSET");

const powerUp = () =>
{
	let mode = localStorage.getItem(overview_mode);
	fetch(backendUrl + "/api/items",
	{
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		headers: 
		{
		  'Content-Type': 'application/json',
		  'Origin': 'muse-client',
		  'Authorization': 'Bearer ' + (localStorage.getItem(auth_token) || '')
		},
	})
	.then(data => data.json())
	.then(json => 
	{
		if (json.code)
			console.log(`Error! ${json.code}: ${json.errors}`)
		else
		{
			items = json;
			populateTable(items);
		}
	});
	document.getElementById("overview-info").style.display = "block";
	document.getElementById("overview-info").textContent = "Items loading. Please wait. . .";

	switch (mode)
	{
		case "ASSET":
			document.getElementById("liabilities-switch").classList.remove("item-switch-active");
			document.getElementById("assets-switch").classList.add("item-switch-active");
			document.getElementById("overview-add-item").textContent = "Add Asset";
			break;
		case "LIABILITY":
			document.getElementById("liabilities-switch").classList.add("item-switch-active");
			document.getElementById("assets-switch").classList.remove("item-switch-active");
			document.getElementById("overview-add-item").textContent = "Add Liability";
			break;
	}
}


powerUp();

document.getElementById("overview-select-all").checked = false;

const updateControlFocus = () =>
{
	if (selectedItems.length)
		document.getElementById("overview-controls-delete").classList.add("overview-controls-focus");
	else
		document.getElementById("overview-controls-delete").classList.remove("overview-controls-focus");

	if (selectedItems.length === 1)
		document.getElementById("overview-controls-edit").classList.add("overview-controls-focus");
	else
		document.getElementById("overview-controls-edit").classList.remove("overview-controls-focus");
}

const selectRow = e =>
{
	let cb = e.target.getAttribute("type") == "checkbox" ? 
		e.target : 
		document.getElementById(e.target.parentElement.getAttribute("data-id"));
	if (e.target != cb)
		cb.checked = !cb.checked;
	if (cb.checked)
		selectedItems.push(items.find(a => cb.id == a.id));
	else
		selectedItems = selectedItems.filter(a => cb.id != a.id);
	document.getElementById("overview-select-all").checked = false;
	updateControlFocus();
}

const populateTable = (items) =>
{
	let mode = localStorage.getItem(overview_mode);
	selectedItems = [];
	displayedCBs = [];
	let th = table.firstChild;
	while (table.childNodes[2])
		table.removeChild(table.childNodes[2]);

	table.appendChild(th);
	for (let item of items)
	{
		if (item.type.toLowerCase() !== mode.toLowerCase())
			continue;
		let row = document.createElement("tr");
		row.setAttribute("data-id", item.id);
		let cbtd = document.createElement("td");
		let cb = document.createElement("input");
		cb.setAttribute("type", "checkbox");
		cb.setAttribute("id", item.id);
		cbtd.appendChild(cb);
		displayedCBs.push(cb);

		let type = document.createElement("td");
		type.appendChild(document.createTextNode(item.type.toUpperCase()));

		let desc = document.createElement("td");
		desc.appendChild(document.createTextNode(item.description));

		let value = document.createElement("td");
		value.appendChild(document.createTextNode(item.value));

		row.addEventListener("click", selectRow);

		row.appendChild(cbtd);
		row.appendChild(type);
		row.appendChild(desc);
		row.appendChild(value);

		table.appendChild(row);
	}
	if (!displayedCBs.length)
	{
		document.getElementById("overview-info").style.display = "block";
		document.getElementById("overview-info").textContent = `You have not added any ${mode === "ASSET" ? 
			"assets" : "liabilities"}`;
	}
	else
		document.getElementById("overview-info").style.display = "none";
}

document.getElementById("assets-switch").addEventListener("click", e =>
{
	localStorage.setItem(overview_mode, localStorage.getItem(overview_mode) === "ASSET" ?
		"LIABILITY" : "ASSET");
	e.target.classList.add("item-switch-active");
	document.getElementById("liabilities-switch").classList.remove("item-switch-active");
	document.getElementById("overview-add-item").textContent = "Add Asset";
	document.getElementById("overview-select-all").checked = false;
	selectedItems = [];
	updateControlFocus();
	populateTable(items);
});

document.getElementById("liabilities-switch").addEventListener("click", e =>
{
	localStorage.setItem(overview_mode, localStorage.getItem(overview_mode) === "ASSET" ?
		"LIABILITY" : "ASSET");
	e.target.classList.add("item-switch-active");
	document.getElementById("assets-switch").classList.remove("item-switch-active");
	document.getElementById("overview-add-item").textContent = "Add Liability";
	document.getElementById("overview-select-all").checked = false;
	selectedItems = [];
	updateControlFocus();
	populateTable(items);
});

document.getElementById("overview-select-all").addEventListener("click", e =>
{
	selectedItems = [];
	for (let cb of displayedCBs)
	{
		cb.checked = e.target.checked;
		if (e.target.checked)
			selectedItems.push(items.find(a => cb.id == a.id));
	}
	updateControlFocus();
});

document.getElementById("overview-controls-edit").addEventListener("click", e =>
{
	e.preventDefault();
	if (!selectedItems.length)
		return;
	localStorage.setItem(item_edit, JSON.stringify(selectedItems[0]));
	location.href = "newitem.html";
});

document.getElementById("overview-controls-delete").addEventListener("click", e =>
{
	e.preventDefault();
});

document.getElementById("overview-controls-sort").addEventListener("click", e =>
{
	e.preventDefault();
});

document.getElementById("overview-add-item").addEventListener("click", e =>
{
	location.href = "newitem.html";
})
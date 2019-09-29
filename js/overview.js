auth_token = "muse_nwc_auth_token";
overview_mode = "muse_nwc_overview_mode";
item_edit = "muse_nwc_item_edit";
overview_sort = "muse_nwc_sort";
liability_value = "muse_nwc_liability";
asset_value = "muse_nwc_asset";

const backendUrl = "https://muses-nwc-api.herokuapp.com";


const table = document.querySelector("table");
let items = [];
let selectedItems = [];
let displayedCBs = [];
if (!localStorage.getItem(overview_mode)) 
	localStorage.setItem(overview_mode, "ASSET");
if (!localStorage.getItem(overview_sort))
	localStorage.setItem(overview_sort, "ta");
document.querySelector("#overview-controls-sort select").value = localStorage.getItem(overview_sort);
document.getElementById("overview-select-all").checked = false;

const powerUp = () =>
{
	localStorage.removeItem(item_edit);
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

const updateControlFocus = () =>
{
	let del = document.getElementById("overview-controls-delete");
	let edit = document.getElementById("overview-controls-edit");
	if (selectedItems.length)
	{
		del.classList.add("overview-controls-focus");
		del.setAttribute("title", "Delete item" + (selectedItems.length > 1 ? "s" : ""));
	}
	else
	{
		del.classList.remove("overview-controls-focus");
		del.setAttribute("title", "You must select one or more rows in order to delete");
	}

	if (selectedItems.length === 1)
	{
		edit.classList.add("overview-controls-focus");
		edit.setAttribute("title", "Edit item");
	}
	else
	{
		edit.classList.remove("overview-controls-focus");
		edit.setAttribute("title", "You must select a row in order to edit");
	}

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

const deleteItem = () =>
{
	document.getElementById("overview-modal-container").style.display = "none";
	if (!selectedItems.length) return;
	for (let i of selectedItems)
	{
		fetch(backendUrl + "/api/items",
		{
			method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
			headers: 
			{
			  'Content-Type': 'application/json',
			  'Origin': 'muse-client',
			  'Authorization': 'Bearer ' + (localStorage.getItem(auth_token) || '')
			},
			body: JSON.stringify({item_id: i.id}) // body data type must match "Content-Type" header
		});
	}

	selectedItems = [];
	updateControlFocus();
	setTimeout(() => powerUp(), 400);
}

const populateTable = (items) =>
{
	let mode = localStorage.getItem(overview_mode);
	let sort = localStorage.getItem(overview_sort);
	let sortedItems = items.slice();

	switch(sort)
	{
		case "ta": sortedItems = items.reverse();
		break;
		case "da": sortedItems.sort((a, b) => a.description.localeCompare(b.description));
		break;
		case "dd": sortedItems.sort((a, b) => b.description.localeCompare(a.description));
		break;
		case "va": sortedItems.sort((a, b) => a.value - b.value);
		break;
		case "vd": sortedItems.sort((a, b) => b.value - a.value);
		break;
		default: sortedItems = items.slice();
	}

	let search = document.getElementById("overview-search").value;
	let filteredItems = search.length ? sortedItems.filter(a => 
		a.description.toLowerCase().includes(search)) : sortedItems;

	selectedItems = [];
	displayedCBs = [];
	updateControlFocus();
	document.getElementById("overview-select-all").checked = false;
	let th = table.firstChild;
	while (table.childNodes[2])
		table.removeChild(table.childNodes[2]);

	table.appendChild(th);
	for (let item of filteredItems)
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
		document.getElementById("overview-info").textContent = document.getElementById("overview-search").value.length ? 
		`You have no ${mode === "ASSET" ? "assets" : "liabilities"}  matching that description` : 
		`You have not added any ${mode === "ASSET" ? 
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
	if(!selectedItems.length)
		return;

	document.getElementById("overview-modal-container").style.display = "block";
	document.getElementById("overview-delete-query").textContent = "Are you sure you want to delete " + 
		(selectedItems.length > 1 ? "these items?" : "this item?");
	document.addEventListener("keydown", e => 
	{
		if (document.getElementById("overview-modal-container").style.display == "block")
		{
			if (e.code == "Enter")
				deleteItem();
			else (e.code == "Escape")
				document.getElementById("overview-modal-container").style.display = "none";
		}
	})
	document.getElementById("overview-delete-yes").addEventListener("click", e => 
	{
		deleteItem();
	});
	document.getElementById("overview-delete-cancel").addEventListener("click", e => 
	{
		document.getElementById("overview-modal-container").style.display = "none";
	});
	document.getElementById("overview-modal-container").addEventListener("click", e => 
	{
		if (e.path && e.path[0] == document.getElementById("overview-modal-container"))
			document.getElementById("overview-modal-container").style.display = "none";
	});
});

document.getElementById("overview-add-item").addEventListener("click", e =>
{
	location.href = "newitem.html";
});
document.querySelector("#overview-controls-sort select").addEventListener("change", e =>
{
	localStorage.setItem(overview_sort, e.target.value);
	populateTable(items);
});
document.getElementById("overview-search").addEventListener("input", e =>
{
	selectedItems = [];
	updateControlFocus();
	populateTable(items);
})
document.getElementById("overview-calculate").addEventListener("click", e =>
{
	localStorage.setItem(asset_value, items.reduce((total, a) => total + 
		((a.type == "asset") ? parseInt(a.value) : 0), 0));
	localStorage.setItem(liability_value, items.reduce((total, a) => total + 
		((a.type == "liability") ? parseInt(a.value) : 0), 0));
	console.log(items);
	console.log(localStorage.getItem(asset_value));
	console.log(localStorage.getItem(liability_value));
	location.href = "portfolio.html";
})
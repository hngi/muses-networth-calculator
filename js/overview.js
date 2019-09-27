const dummyItems = 
[
	{
		id: "sarstas23",
		type: "ASSET",
		description: "Mercedes car",
		value: 3000000
	},
	{
		id: "sarstas231",
		type: "LIABILITY",
		description: "Mercedes car",
		value: -13000000
	},
	{
		id: "sarstas2312",
		type: "LIABILITY",
		description: "Mercedes car",
		value: -50000
	},
	{
		id: "sarstas23454",
		type: "LIABILITY",
		description: "Mercedes car",
		value: -3000000
	},
	{
		id: "sarstas23ds",
		type: "ASSET",
		description: "Cattle Ranch",
		value: 30000000
	},
	{
		id: "sarstas23as",
		type: "ASSET",
		description: "House",
		value: 3000000
	},
	{
		id: "sarstas2398",
		type: "ASSET",
		description: "Mercedes car",
		value: 3000000
	},
];

const selectRow = e =>
{

	let cb = document.getElementById(e.target.parentElement.getAttribute("data-id"));
	cb.checked = !cb.checked;
}

const populateTable = (items) =>
{
	const table = document.querySelector("table");
	let th = table.firstChild;
	while (table.childNodes[2])
		table.removeChild(table.childNodes[2]);

	table.appendChild(th);
	const mode = table.getAttribute("data-mode");
	for (let item of items)
	{
		if (item.type !== mode)
			continue;
		let row = document.createElement("tr");
		row.setAttribute("data-id", item.id);
		let cbtd = document.createElement("td");
		let cb = document.createElement("input");
		cb.setAttribute("type", "checkbox");
		cb.setAttribute("id", item.id);
		cbtd.appendChild(cb);

		let type = document.createElement("td");
		type.appendChild(document.createTextNode(item.type));

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
}

populateTable(dummyItems);

document.getElementById("assets-switch").addEventListener("click", e =>
{
	document.querySelector("table").setAttribute("data-mode", e.target.getAttribute("data-switch-value"));
	e.target.classList.add("item-switch-active");
	document.getElementById("liabilities-switch").classList.remove("item-switch-active");
	document.getElementById("overview-add-item").textContent = "Add Asset";
	populateTable(dummyItems);
});
document.getElementById("liabilities-switch").addEventListener("click", e =>
{
	document.querySelector("table").setAttribute("data-mode", e.target.getAttribute("data-switch-value"));
	e.target.classList.add("item-switch-active");
	document.getElementById("assets-switch").classList.remove("item-switch-active");
	document.getElementById("overview-add-item").textContent = "Add Liability";
	populateTable(dummyItems);
});
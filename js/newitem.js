document.getElementById("item-value").addEventListener("input", ({target}) =>
{
	target.value = target.value.split("").filter((a, i) => /\d/.test(a) || (i === 0 && /-/.test(a))).join("");
})
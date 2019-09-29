liability_value = "muse_nwc_liability";
asset_value = "muse_nwc_asset";

let asset = localStorage.getItem(asset_value) || 0;
let liability = localStorage.getItem(liability_value) || 0;
asset = parseInt(asset);
liability = parseInt(liability);
const networth = asset + liability;


const percentiles = 
[
  408, 612, 816, 977, 1202, 
  1428, 1701, 1995, 2381, 2835, 
  3502, 4127, 5080, 6350, 10142, 
  30455, 53948, 80638, 100143, 100000
];

const convertToString = n =>
{
  let output = "";
  if (Math.floor(Math.abs(n) / 1000000000000) >= 1)
  {
    let x = Math.floor(n / 1000000000000);
    let y = Math.floor(n / 100000000000).toString();
    let mod = y[y.length - 1];
    output += x + "." + mod + " TRN";
    return output;
  }
  else if (Math.floor(Math.abs(n) / 1000000000) >= 1)
  {
    let x = Math.floor(n / 1000000000);
    let y = Math.floor(n / 100000000).toString();
    let mod = y[y.length - 1];
    output += x + "." + mod + " BN";
    return output;
  }
  else if (Math.floor(Math.abs(n) / 1000000) >= 1)
  {
    let x = Math.floor(n / 1000000);
    let y = Math.floor(n / 100000).toString();
    let mod = y[y.length - 1];
    output += x + "." + mod + " M";
    return output;
  }
  else return n.toString();
}


const getPercentile = n => 
{
  let dollar = Math.ceil(n / 360);
  if (dollar >= 100000000)
    return 95;
  if (dollar >= 10000000)
    return 93;
  if (dollar >= 1000000)
  return 92;
  if (dollar >= 100000)
  return 91;
  if (dollar < 5)
  return 1;
  if (dollar < 10)
  return 2;
  if (dollar < 20)
  return 3;  
  let index = percentiles.indexOf(percentiles.find(n => n > dollar));
  if (index == -1 || index == 19)
    return 98;
  return (index + 1) * 5;
}


document.getElementById("stats-assets-value").textContent = convertToString(asset);
document.getElementById("stats-liabilities-value").textContent = convertToString(liability);
document.getElementById("stats-networth-value").textContent = "₦" + convertToString(networth);
let percentile = getPercentile(networth).toString();
let pString = percentile;
if (percentile[percentile.length - 1] == "1")
  pString += "st";
else if (percentile[percentile.length - 1] == "2")
  pString += "nd";
else if (percentile[percentile.length - 1] == "3")
  pString += "rd";
else
  pString += "th";
document.getElementById("stats-percentile-value").textContent = pString;

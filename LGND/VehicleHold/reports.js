'use strict';

let buffer = [];

function reportTitle () {
	const ind = "        ";
	buffer = [];

	let plate = document.getElementById('plate').value;
	let vehicle = document.getElementById('vehiclename').value;
	buffer.push(`Vehicle Hold: ${vehicle} | ${plate}`);

	return document.getElementById('reportBody2').innerHTML = buffer.join("\n");
}

function report() {
	let callsign = document.getElementById('yourself').value.trim();
	if (callsign) localStorage.setItem('callsign', callsign);
	if (!callsign) callsign = '[missing]';
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');

	buffer = [];

	let holdreason = document.getElementById('holdreason').value;
	let holdtype = "";
	let holdtime = "";
	
	if (holdreason === "Involuntary Manslaughter") {
		holdtype = "A"
		holdtime = "12 Hours"
	}
	if (holdreason === "Voluntary Manslaughter") {
		holdtype = "A"
		holdtime = "12 Hours"
	}
	if (holdreason === "First Degree Murder") {
		holdtype = "A"
		holdtime = "12 Hours"
	}
	if (holdreason === "Second Degree Murder") {
		holdtype = "A"
		holdtime = "12 Hours"
	}
	if (holdreason === "Terrorism") {
		holdtype = "A"
		holdtime = "12 Hours"
	}
	if (holdreason === "Felony Evading (Second time being charged for the day)") {
		holdtype = "B"
		holdtime = "360 Minutes"
	}
	if (holdreason === "Robbery of a Stockade, Bank, J-Store") {
		holdtype = "B"
		holdtime = "360 Minutes"
	}
	if (holdreason === "Kidnapping") {
		holdtype = "B"
		holdtime = "360 Minutes"
	}
	if (holdreason === "Shooting, or commission of a crime associated") {
		holdtype = "B"
		holdtime = "360 Minutes"
	}
	if (holdreason === "Weapons Trafficking") {
		holdtype = "B"
		holdtime = "360 Minutes"
	}
	if (holdreason === "Reckless Driving while Street Racing") {
		holdtype = "B"
		holdtime = "360 Minutes"
	}
	if (holdreason === "Robbery of a Store") {
		holdtype = "C"
		holdtime = "240 Minutes"
	}
	if (holdreason === "Armed Robbery of a Person") {
		holdtype = "C"
		holdtime = "240 Minutes"
	}
	if (holdreason === "Drug Trafficking Class A/B") {
		holdtype = "C"
		holdtime = "240 Minutes"
	}
	if (holdreason === "Driving Under the Influence") {
		holdtype = "D"
		holdtime = "180 Minutes"
	}
	if (holdreason === "Felony Evading (First time being charged for the day)") {
		holdtype = "D"
		holdtime = "180 Minutes"
	}

	buffer.push("[REPORTING OFFICER]:");
	buffer.push(callsign);
	buffer.push('');
	
	let incident = document.getElementById('incidentnr').value;
	if (incident) buffer.push(`Incident Report Nr: ${incident}`);
	if (incident) buffer.push('');
	
	if (holdtype) buffer.push(`Hold Class Type: ${holdtype}`);
	if (holdtype) buffer.push('');

	if (holdreason) buffer.push(`Hold Reason: ${holdreason}`);
	if (holdreason) buffer.push('');

	if (holdtime) buffer.push(`Hold Time: ${holdtime}`);
	if (holdtime) buffer.push('');

	let vin = document.getElementById('vin').value;
	if (vin) buffer.push(`Vehicle VIN Nr: ${vin}`);
	if (vin) buffer.push('');
	
	let plate = document.getElementById('plate').value;
	if (plate) buffer.push(`Vehicle Plate Nr: ${plate}`);
	if (plate) buffer.push('');
	
	let owner = document.getElementById('owner').value;
	if (owner) buffer.push(`Vehicle Owner: ${owner}`);
	if (owner) buffer.push('');

	let vehicle = document.getElementById('vehiclename').value;
	if (vehicle) buffer.push(`Vehicle Model/Name: ${vehicle}`);
	if (owner) buffer.push('');

	let color = document.getElementById('vehiclecolor').value;
	if (color) buffer.push(`Vehicle Color: ${color}`);
//////////////////////////////////////////////////////////////////

	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

let inputs = document.querySelectorAll('input[type="text"], input[type="text2"], input[type="number"], textarea');
inputs.forEach(i => i.addEventListener('keyup', report, false));

let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', report, false));

let selectOptions = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', report, false));

let inputs2 = document.querySelectorAll('input[type="text"], input[type="text2"], input[type="number"], textarea');
inputs.forEach(i => i.addEventListener('keyup', reportTitle, false));

let checkboxes2 = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', reportTitle, false));

let selectOptions2 = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', reportTitle, false));

function loadName() {
	let callsign = '';
	if (localStorage.getItem('callsign')) callsign = localStorage.getItem('callsign');
	document.getElementById('yourself').value = callsign;
}

function showCopiedPopup() {
	let popup = document.getElementById("myPopup");
	popup.classList.toggle("show");
	setTimeout(function() {
		popup.classList.toggle("show");
	}, 3500);
}

document.getElementById('copyReport').addEventListener('click', copy, false);
function clearSelection() {
	if (window.getSelection) {
		window.getSelection().removeAllRanges();
	} else if (document.selection) {
		document.selection.empty();
	}
}
document.getElementById('copyTitle').addEventListener('click', copy2, false);
function clearSelection() {
	if (window.getSelection) {
		window.getSelection().removeAllRanges();
	} else if (document.selection) {
		document.selection.empty();
	}
}
function copy2() {
	document.getElementById('reportBody2').select();
	try {
		document.execCommand('copy');
		showCopiedPopup();
		clearSelection();
	} catch(e) {
		console.log("Copy error: " + e);
	}
}
function copy() {
	document.getElementById('reportBody').select();
	try {
		document.execCommand('copy');
		showCopiedPopup();
		clearSelection();
	} catch(e) {
		console.log("Copy error: " + e);
	}
}
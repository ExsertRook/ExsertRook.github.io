'use strict';

let buffer = [];
let officersInvolved = new Set();
let darkmodeState;
let alreadySpecifiedRobbery = false;
let ROBBERY_STATE = 'JEWLERY';

function report() {
	let callsign = document.getElementById('yourself').value.trim();
	if (callsign) localStorage.setItem('callsign', callsign);
	if (!callsign) callsign = '[missing]';
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');

	buffer = [];
	buffer.push("[REPORTING OFFICER]:");
	buffer.push(callsign);
	buffer.push('');
	
	let incident = document.getElementById('incidentnr').value;
	if (incident) incident = `Incident Report Nr: ${incident}`;
	buffer.push('');
	
	let holdtypeSelected = document.getElementById('holdtype');
	let holdtypeInformation = {
		'A': {
			text: 'Hold Class Type: A',
		},
		'B': {
			text: 'Hold Class Type: B',
		},
		'C': {
			text: 'Hold Class Type: C',
		},
		'D': {
			text: 'Hold Class Type: D',
		}
	};
	let holdtype = holdtypeSelected.options[holdtypeSelected.selectedIndex].text;
	buffer.push(holdtypeInformation[holdtype].text);
	buffer.push('');
	
	let holdtimeSelected = document.getElementById('holdtime');
	let holdtimeInformation = {
		'12 Hours': {
			text: 'Hold Time: 12 Hours',
		},
		'90 Minutes': {
			text: 'Hold Time: 90 Minutes',
		},
		'60 Minutes': {
			text: 'Hold Time: 60 Minutes',
		},
		'30 Minutes': {
			text: 'Hold Time: 30 Minutes',
		}
	};
	let holdtime = holdtimeSelected.options[holdtimeSelected.selectedIndex].text;
	buffer.push(holdtimeInformation[holdtime].text);
	buffer.push('');
	
	let vin = document.getElementById('vin').value;
	if (vin) vin = `Vehicle VIN Nr: ${vin}`;
	buffer.push('');
	
	let plate = document.getElementById('plate').value;
	if (plate) plate = `Vehicle Plate Nr: ${plate}`;
	buffer.push('');
	
	let owner = document.getElementById('owner').value;
	if (owner) owner = `Vehicle Owner: ${owner}`;
	buffer.push('');

	let vehicle = document.getElementById('vehiclename').value;
	if (vehicle) vehicle = `Vehicle Model/Name: ${vehicle}`;
	buffer.push('');

	
	
	let curDarkmode = document.getElementById('darkmode').checked;
	if (curDarkmode) {
		if (darkmodeState === 'false') updateDarkmode();
	} else if (!curDarkmode) {
		if (darkmodeState === 'true') updateDarkmode();
	}

	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

let inputs = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
inputs.forEach(i => i.addEventListener('keyup', report, false));

let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', report, false));

let selectOptions = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', report, false));

function loadName() {
	let callsign = '';
	if (localStorage.getItem('callsign')) callsign = localStorage.getItem('callsign');
	document.getElementById('yourself').value = callsign;
}

// Listen for a click on the button
function updateDarkmode() {
	// Then toggle (add/remove) the .dark-theme class to the body
	let darkmode = document.getElementById('darkmode').checked;
	if (darkmode) {
		localStorage.setItem("darkmode", true);
		darkmodeState = 'true';
	} else if (!darkmode) {
		localStorage.setItem("darkmode", false);
		darkmodeState = 'false';
	}
	document.body.classList.toggle('dark-theme');
}

function loadDarkmode() {
	let darkmodeSetting = localStorage.getItem("darkmode");
	if (!darkmodeSetting || darkmodeSetting === 'undefined' || darkmodeSetting === 'false') {
		localStorage.setItem("darkmode", false);
		darkmodeState = 'false';
	}
	if (darkmodeSetting == 'true') {
		document.getElementById('darkmode').checked = true;
		document.body.classList.toggle('dark-theme');
		darkmodeState = 'true';
	}
	loadName();
	if (ROBBERY_STATE === 'JEWLERY') {
		document.getElementById('whatFleeca').style.display = 'none';
		document.getElementById('whatStore').style.display = 'none';
	}
	//loadOfficers();
}

let officers = null;
let matched = [];

const replaceNames = {
	'Bucky Killbourne': 'Bucky Langston',
	'Xander Langston': 'Xander Killbourne'
};

function loadOfficers() {
	let cachedOfficers = localStorage.getItem("officers");
	if (!officers) {
		let xhr = new XMLHttpRequest();
		try {
			xhr.open("GET", "https://celestial.network/legacyrp/sasp", false);
			xhr.send(null);

			officers = JSON.parse(xhr.responseText).data;
			officers = officers.map(officer => officer.callsign + ' ' +
				(replaceNames[officer.full_name] ? replaceNames[officer.full_name] : officer.full_name));
			localStorage.setItem('officers', xhr.responseText);
		} catch (e) {
			if (cachedOfficers) {
				cachedOfficers = JSON.parse(cachedOfficers).data;
				officers = cachedOfficers.map(officer => officer.callsign + ' ' + officer.full_name);
				alert('Failed to load officers data from roster; using cached officers data...');
			} else {
				alert('Failed to load officers data from roster & no cache value stored!');
			}
		}
	}
}

function searchOfficer(search) {
	if (!search) {
		document.getElementById('officerslist').innerHTML = '';
		return;
	}
	search = search.toLowerCase();

	if (!officers) loadOfficers();

	let results = officers.filter(officer => officer.toLowerCase().includes(search));
	let resultsCap = 5;
	let count = 0;
	let finalResults = [];
	results.forEach(result => {
		count++;
		if (count > resultsCap) return;
		result = result.trim();
		finalResults.push("<button title='Add this officer to the list of officers involved' onClick='toggleOfficer(\"" + result + "\")'>" + result + "</button>");
	});
	document.getElementById('officerslist').innerHTML = finalResults.join("<br />");
}

function toggleOfficer(id) {
	if (officersInvolved.has(id)) {
		console.log("Removing " + id + "...");
		officersInvolved.delete(id);
	} else {
		console.log("Adding " + id + "...");
		officersInvolved.add(id);

		document.getElementById('officersearch').value = "";
	}
	report();
	updateOfficers();
}

function updateOfficers() {
	let output = "";
	for (let id of officersInvolved.values()) {
		output += `<div class="chip">\n`;
		output += `<img src="images/hat2.png" width="96" height="96">\n`;
		output += `${id}\n`;
		output += `<span class="closebtn" title="Remove this officer from the list of officers involved" style="cursor: default;" onclick='toggleOfficer(\"${id}\")'><i class="fa fa-times-circle-o" aria-hidden="true"></i>
</span>\n`;
		output += `</div>`
	}

	document.getElementById('officersAdded').innerHTML = "<br />" + output;
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

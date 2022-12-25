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
	
	buffer.push(`[DESCRIBE INCIDENT]:`);
	let location = document.getElementById('location').value;
	if (location) buffer.push(`During routine patrol, we had a dispatch call come in about an Armored Stockade Bank Truck requesting immediate assitance over by their location which was ${location}.`);
	
	let hostages = document.getElementById('hostages').value;
	let robberstotal = document.getElementById('robberstotal').value;
	buffer.push(`Upon arriving on scene, we immediately counted a total of ${robberstotal} armed individuals looking to rob the Stockade Truck. Accompanying them were a total of ${hostages} hostages they had held at gunpoint.`);
	buffer.push('');
	
	let coderedselected = document.getElementById('codered');
	let coderedInformation = {
		'Yes': {
			text: 'After assessing the active robbery scene, we had came to a conclusion and deemed the suspects code red, reason being they had shot the armored Stockade security guards.',
		},
		'No': {
			text: 'After assessing the active robbery scene, we had come to a conclusion and did not deem the suspects code red because at the time, they did not shoot any of the armored Stockade security guards.',
		}
	};
	let codered = coderedselected.options[coderedselected.selectedIndex].text;
	buffer.push(coderedInformation[codered].text);
	
	let resultsSelected = document.getElementById('results');
	let resultsInformation = {
		'All suspects downed': {
			text: 'Once they were deemed code red, we had opened fire upon them. Eventually after a gunfight between the suspects and officers occured, our officers managed to incapacitate all of the suspects.',
		},
		'One suspect escaped': {
			text: 'Once they were deemed code red, we had opened fire upon them. Eventually after a gunfight between the suspects and officers occured, our officers managed to incapacitate all exept for one of the suspects. The one suspect who was not caught managed to sneak out of the area.',
		},
		'All Surrendered': {
			text: 'After some convincing, and offering the suspects a good deal, they decided to surrender. All the suspects were placed under police custody and no one was harmed.',
		}
	};
	let results = resultsSelected.options[resultsSelected.selectedIndex].text;
	buffer.push(resultsInformation[results].text);
	buffer.push('');

	buffer.push(`[VEHICLE DESCRIPTION]:`);
	let plate = document.getElementById('vehicleplate').value;
	let vehicledesc = document.getElementById('vehicledesc').value;
	let vehiclereg = document.getElementById('vehiclereg').value;
	if (vehicledesc) vehicledesc = ` a ${vehicledesc}${(plate ? ' (PLATE: ' + plate + ')' : '')}`;
	buffer.push(`The vehicle they were planning on using for getaway was${vehicledesc}. The vehicle was registered to an individual named ${vehiclereg}.`);
	buffer.push('');

	let towSelected = document.getElementById('tow');
	let towInformation = {
		'Normal Tow': {
			text: 'Once the scene was secured enough, we texted the mechanic and tow line to see if there was an available tow truck that could come and tow the armored truck. Eventually one did came and a police escort was provided until the Stockade had reached an impound lot.',
		},
		'Local Tow': {
			text: 'Once the scene was secured enough, we texted the mechanic and tow line to see if there was an available tow truck that could come and tow the armored truck. After waiting for a bit of time, we got no response back and had called a local tow instead.',
		}
	};
	let tow = towSelected.options[towSelected.selectedIndex].text;
	buffer.push(towInformation[tow].text);
	buffer.push('');

	let medneedsus = document.getElementById('medneedsus').value;
	let medneedpd = document.getElementById('medneedpd').value;
	let hospitalname = document.getElementById('hospitalname').value;
	let processed = document.getElementById('processedat').value;

	if (document.getElementById('medneed').checked) {
		buffer.push(`[MEDICAL ATTENTION]:`);
		buffer.push(`After we apprehended the suspects, they were in need of medical attention. We brought the injured people (Suspects Total: ${medneedsus} | PD Total: ${medneedpd}) to ${hospitalname}.`);
		buffer.push(`Once everyone got medical treatment, we started heading back towards the PD.`)
	} else {
		buffer.push(`[MEDICAL ATTENTION]:`);
		buffer.push(`Due to no suspects or officers having any major injuries, everyone waved their rights to medical attention.`);
	}

	buffer.push('');
	buffer.push('[PROCESSED]:');
	buffer.push(`All of the apprehended suspects were processed at ${processed}.`);
	
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

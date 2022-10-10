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
	
	let location = document.getElementById('location').value;
	buffer.push(`[LOCATION]:`);
	if (location) buffer.push(`${location}`);
	buffer.push('');
	
	buffer.push(`[DESCRIBE INCIDENT]:`);
	let discoveryselected = document.getElementById('discovery');
	let discoveryInformation = {
		'10-32 Calls': {
			text: 'During routine patrol, we had recieved a few 10-32 (Person with a gun) dispatch calls.',
		},
		'10-71 / 31 Calls': {
			text: 'During routine patrol, we had recieved a few 10-71 / 31 Calls (Reported Shots Fired) dispatch calls.',
		},
		'10-66 Calls': {
			text: 'During routine patrol, we had recieved a few 10-66 (Suspicious Person) dispatch calls.',
		},
		'Audible shots': {
			text: 'During routine patrol, we had heard some audible automatic shots fired.',
		},
		'911 Call': {
			text: 'During routine patrol, we had recieved a 911 call from an individual stating that there are people actively shooting at eachother.',
		}
	};
	let discovery = discoveryselected.options[discoveryselected.selectedIndex].text;
	
	
	let location = document.getElementById('location').value;
	if (location) buffer.push(`During routine patrol, we had a dispatch call come in from an Armored Stockade Bank Truck requesting immediate assitance over by ${location}.`);
	
	let hostages = document.getElementById('hostages').value;
	let robberstotal = document.getElementById('robberstotal').value;
	buffer.push(`Upon arriving on scene, we immediately counted a total of ${robberstotal} armed robbers. Accompanying them were a total of ${hostages} hostages.`);
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
	buffer.push('');

	buffer.push(`[VEHICLE DESCRIPTION]:`);
	let plate = document.getElementById('vehicleplate').value;
	let vehicledesc = document.getElementById('vehicledesc').value;
	let vehiclereg = document.getElementById('vehiclereg').value;
	if (vehicledesc) vehicledesc = ` a ${vehicledesc}${(plate ? ' (PLATE: ' + plate + ')' : '')}`;
	buffer.push(`The vehicle was${vehicledesc}. The vehicle was registered to an individual named ${vehiclereg}. Once everyone was ready, the chase started and they attempted to evade from police recklessly.`);
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
	buffer.push('');

	let medicalSelected = document.getElementById('medicalattention');
	let medicalInformation = {
		'Was requested by multiple suspects': {
			label: 'WAS REQUESTED',
			text: 'After we apprehended the suspects, they requested medical attention. We then transported them to Saint Fiacre where they got further medical attention.',
		},
		'Was requested by one suspect': {
			label: 'ONE REQUESTED',
			text: 'After we apprehended the suspects, one of them requested or needed medical attention. We then transported that suspect to Saint Fiacre where they got further medical attention.',
		},
		'Was not requested or needed': {
			label: 'WAS NOT REQUESTED',
			text: 'After we apprehended the suspects, they did not request or need any medical attention.',
		}
	};
	let medical = medicalSelected.options[medicalSelected.selectedIndex].text;
	buffer.push(`[MEDICAL ATTENTION | ${medicalInformation[medical].label}]:`);
	buffer.push(medicalInformation[medical].text);
	buffer.push('');

	let processed = document.getElementById('processedat').value;
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

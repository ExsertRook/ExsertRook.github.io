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
	
	let colors = document.getElementById('colors').value;
	
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
			text: 'During routine patrol, we had recieved a few 10-32 (Person with a gun) dispatch calls over by the location mentioned above.',
		},
		'10-71 / 31 Calls': {
			text: 'During routine patrol, we had recieved a few 10-71 / 31 Calls (Reported Shots Fired) dispatch calls over by the location mentioned above.',
		},
		'10-66 Calls': {
			text: 'During routine patrol, we had recieved a few 10-66 (Suspicious Person) dispatch calls over by the location mentioned above.',
		},
		'Audible shots': {
			text: 'During routine patrol, we had heard some audible automatic shots fired over by the location mentioned above.',
		},
		'911 Call': {
			text: 'During routine patrol, we had recieved a 911 call from an individual stating that there are people actively shooting at eachother over by the location mentioned above.',
		}
	};
	let discovery = discoveryselected.options[discoveryselected.selectedIndex].text;
	buffer.push(discoveryInformation[discovery].text);
	buffer.push('');
	
	buffer.push(`At first glance, we noticed that the two gangs who were fighting eachother were wearing the following colors: ${colors}`);
	buffer.push('');
	
	let medicalSelected = document.getElementById('medicalattention');
	let medicalInformation = {
		'All recieved at Saint Fiacre': {
			label: 'ALL SAINT FIACRE',
			text: 'After we collected enough initial evidence, we collected the suspects and then transported all of them to Saint Fiacre where they got further medical attention.',
		},
		'All recieved at Mount Zonah': {
			label: 'ALL MOUNT ZONAH',
			text: 'After we collected enough initial evidence, we collected the suspects and then transported all of them to Saint Fiacre where they got further medical attention.',
		},
		'1 Gang at Saint Fiacre, other at Mount Zonah': {
			label: 'SEPERATED',
			text: 'After we collected enough initial evidence, we collected the suspects and then transported them to 2 different hospitals where they got further medical attention. One gang got transported to Saint Fiacre and the other gang was transported to Mount Zonah. We seperated them to avoid any potential conflict between the 2 gangs at the hospital.',
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

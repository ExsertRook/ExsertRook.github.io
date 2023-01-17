'use strict';

let buffer = [];
let officersInvolved = new Set();
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
	
	buffer.push(`[DETAILS OF THE INCIDENT]:`);
	buffer.push(`While taking a small break from patrolling, we had noticed an individual who was not an officer on the premises of MRPD where they should not be.`);
	
	let locationSelected = document.getElementById('location');
	let locationInformation = {
		'Inside of MRPD': {
			text: 'We initially spotted the trespasser inside of MRPD.',
		},
		'Roof': {
			text: 'We initially spotted the trespasser on the roof of MRPD.',
		},
		'Side Parking Lot': {
			text: 'We initially spotted the trespasser outside at the side parking lot.',
		},
		'Carpool': {
			text: 'We initially spotted the trespasser downstairs inside the carpool.',
		},
		'Back Parking Lot': {
			text: 'We initially spotted the trespasser outside at the parking lot behind MRPD where we bring in suspects.',
		}
	};
	
	let locationresult = locationSelected.options[locationSelected.selectedIndex].text;
	buffer.push(locationInformation[locationresult].text);
	
	let warnedSelected = document.getElementById('warned');
	let warnedInformation = {
		'Yes': {
			text: 'The individual who was trespassing was warned to leave the area otherwise he would get arrested.',
		},
		'No': {
			text: 'Since the indivudal was posing a threat, we skipped warning him and went in for the arrest as the suspect themselves knew that they were trespassing.',
		}
	};
	
	let warnedresult = warnedSelected.options[warnedSelected.selectedIndex].text;
	buffer.push(warnedInformation[warnedresult].text);
	buffer.push('');
	
	let susranSelected = document.getElementById('susran');
	let susranInformation = {
		'Yes': {
			text: 'Since the trespasser refused to leave the area, we moved in to detain and arrest the suspect. They made an attempt to run but they were eventually apprehended anyway and placed under arrest.',
		},
		'No': {
			text: 'Since the trespasser refused to leave the area, we moved in to detain and arrest the suspect. They did not make an attempt to run and we had them detained and placed under arrest.',
		}
	};
	
	let susranresult = susranSelected.options[susranSelected.selectedIndex].text;
	buffer.push(susranInformation[susranresult].text);
	buffer.push('');
	
	let medneedsus = document.getElementById('medneedsus').value;
	let medneedpd = document.getElementById('medneedpd').value;
	let hospitalname = document.getElementById('hospitalname').value;
	if (document.getElementById('medneed').checked) {
		buffer.push(`[MEDICAL ATTENTION]:`);
		buffer.push(`After we apprehended the suspects, they were in need of medical attention. We brought the injured people (Suspects Total: ${medneedsus} | PD Total: ${medneedpd}) to ${hospitalname}.`);
		buffer.push(`Once everyone got medical treatment, we started heading back towards the PD.`)
	} else {
		buffer.push(`[MEDICAL ATTENTION]:`);
		buffer.push(`Due to no suspects or officers having any major injuries, everyone waved their rights to medical attention.`);
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

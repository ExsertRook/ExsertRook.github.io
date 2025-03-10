'use strict';

let buffer = [];
let officersInvolved = new Set();
let alreadySpecifiedRobbery = false;

function report() {
	let callsign = document.getElementById('yourself').value.trim();
	if (callsign) localStorage.setItem('callsign', callsign);
	if (!callsign) callsign = '[missing]';
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');

	buffer = [];
	buffer.push("RGV3");
	buffer.push("[REPORTING OFFICER]:");
	buffer.push(callsign);	

	let location = document.getElementById('location').value;
	let weapon = document.getElementById('weapon').value;
	buffer.push('');
	
	buffer.push(`[DETAILS OF THE INCIDENT]:`);
	if (location) buffer.push(`While being out on regular patrol, we responded to a 10-32 dispatch call of a person with a gun at ${location}. `);
	if (weapon) buffer.push(`Upon arriving there, we noticed an individual brandishing a weapon. The weapon in question was a ${weapon}.`);

	let fleeattemptSelected = document.getElementById('fleeattempt');
	let fleeattemptInformation = {
		'Yes': {
			text: 'After we made contact with the individual, they attempted to flee.',
		},
		'No': {
			text: 'After we made contact with the individual, they did not attempt to flee.',
		}
	};
	let fleeattempt = fleeattemptSelected.options[fleeattemptSelected.selectedIndex].text;
	buffer.push(fleeattemptInformation[fleeattempt].text);

	let didTheyShootSelected = document.getElementById('didtheyshoot');
	let didTheyShootInfo = {
		'Yes': {
			text: 'After a bit of time the suspect(s) decided to open fire on officers. Eventually all suspects were apprehended.',
		},
		'No': {
			text: 'After a bit of time, all the suspect(s) were eventually apprehended.',
		}
	};
	let didtheyshoot = didTheyShootSelected.options[didTheyShootSelected.selectedIndex].text;
	buffer.push(didTheyShootInfo[didtheyshoot].text);
	buffer.push('');

	buffer.push(`[VEHICLE INFORMATION]:`);
	let plate = document.getElementById('vehicleplate').value;
	let vehicledesc = document.getElementById('vehicledesc').value;
	let vehiclereg = document.getElementById('vehiclereg').value;
	let vehiclecolor = document.getElementById('carcolor').value;
	if (vehicledesc || vehiclecolor) vehicledesc = ` ${vehiclecolor} in colored ${vehicledesc}${(plate ? ' (PLATE: ' + plate + ')' : '')}`;
	if (vehiclereg) vehiclereg = `The vehicle was registered to an individual named ${vehiclereg}. `;
	if (!vehiclereg) vehiclereg = '';
	buffer.push(`The vehicle in question was a${vehicledesc}. ${vehiclereg}`);
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
	if (document.getElementById('runhospital').checked) {
		buffer.push(`The suspect attempted to flee at the hospital but was apprehended.`);
	}
	buffer.push('');
	buffer.push('[PROCESSED]:');
	buffer.push(`All of the apprehended suspects were processed at ${processed}.`);

	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

let inputs = document.querySelectorAll('input[type="text"], input[type="text2"], input[type="number"], textarea');
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

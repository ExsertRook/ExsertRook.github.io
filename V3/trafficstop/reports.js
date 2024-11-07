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
	buffer.push('');
	
	buffer.push(`[STOP INFORMATION]:`);
	let location = document.getElementById('location').value;
	if (location) buffer.push(`During routine patrol, we pulled over a vehicle next to ${location}.`);
	
	let stopreasonSelected = document.getElementById('stopreason');
	let stopreasonInformation = {
		'Excessive Speeding (30Mph Over Limit)': {
			text: 'The reason for us pulling over the vehicle was because we caught them excessively speeding.',
		},
		'Flagged Plate': {
			text: 'The reason for us pulling over the vehicle was because after running the plate of the vehicle, it came back as flagged.',
		},
		'On-Going BOLO': {
			text: 'The reason for us pulling over the vehicle was because the vehicle matched the description of a vehicle that had an active BOLO on it.',
		},
		'Reckless Driving': {
			text: 'The reason for us pulling over the vehicle was because we caught the driver of the vehicle driving really recklessly and we wanted to check their well-being.',
		},
		'Stolen Vehicle (10-31)': {
			text: 'The reason for us pulling over the vehicle was because we witnessed the vehicle being stolen by the individual that was the driver of the vehicle.',
		}
	};
	let stopreason = stopreasonSelected.options[stopreasonSelected.selectedIndex].text;
	buffer.push(stopreasonInformation[stopreason].text);
	
	let speed = document.getElementById('speed').value;
	if (speed) buffer.push(`The exact speed we clocked the vehicle travelling at was ${speed} mph.`);
	buffer.push('');
	
	let arrestreasonSelected = document.getElementById('arrestreason');
	let arrestreasonInformation = {
		'Suspended License': {
			text: 'After analyzing the whole situation and checking the drivers license, we realised that the driver of the vehicle was driving the vehicle with a suspecnded license. We asked them to step out of the car and they complied. From there the driver was placed in handcuffs and under police custody.',
		},
		'Driving Under Influence (DUI)': {
			text: 'After analyzing the whole situation, we noticed that the driver did not seem as sober as they should be. We politely asked them to step out and performed a breathalyzer test on the driver. The results of the test came back and it showed that the driver was not completely sober. We came to the conclusion that the driver was driving under the influence of alcohol and placed them in handcuffs and under police custody.',
		},
		'Excessive Speeding': {
			text: 'After analyzing the whole situation and also taking into account that the driver was exceeding the speed limit enough to get arrested, we asked the driver to step out of the vehicle. From there the driver was placed in handcuffs and under police custody.',
		},
		'Vehicle Flagged Stolen': {
			text: 'After analyzing the whole situation, we came to a realization that after running the plate of the vehicle, the vehicle was flagged as stolen. From there we escalated the situation and asked the vehicle occupants to step out one at a time. From there the driver was placed in handcuffs and under police custody.',
		},
		'Vehicle Flagged by Other Officer': {
			text: 'After analyzing the whole situation, we came to a realization that after running the plate of the vehicle, the vehicle was flagged by another officer for a situation from earlier that the vehicle had fled from. From there we escalated the situation and asked the vehicle occupants to step out one at a time. From there the driver was placed in handcuffs and under police custody.',
		},
		'Joyriding': {
			text: 'After analyzing the whole situation, we came to a realization that after running the plate of the vehicle, the name of the owner of the vehicle did not match the name on the driving license we were provided. We asked the driver to step out of the vehicle and from there the driver was placed in handcuffs and under police custody for joyriding.',
		},
		'Brandishing a Class 2': {
			text: 'After pulling the person over, we had conducted a Code 5 due to the fact that the individual was brandishing a Class 2 weapon. From there we escalated the situation and asked the vehicle occupants to step out one at a time. From there the driver was placed in handcuffs and under police custody.',
		},
		'Brandishing a Class 3': {
			text: 'After pulling the person over, we had conducted a Code 5 due to the fact that the individual was brandishing a Class 3 weapon. From there we escalated the situation and asked the vehicle occupants to step out one at a time. From there the driver was placed in handcuffs and under police custody.',
		}
	};
	let arrestreason = arrestreasonSelected.options[arrestreasonSelected.selectedIndex].text;
	buffer.push(`[ARREST INFORMATION]:`);
	buffer.push(arrestreasonInformation[arrestreason].text);
	buffer.push('');
	
	buffer.push(`[VEHICLE DESCRIPTION]:`);
	let plate = document.getElementById('vehicleplate').value;
	let vehicledesc = document.getElementById('vehicledesc').value;
	let vehiclereg = document.getElementById('vehiclereg').value;
	if (vehicledesc) vehicledesc = ` a ${vehicledesc}${(plate ? ' (PLATE: ' + plate + ')' : '')}`;
	buffer.push(`The vehicle was${vehicledesc}. The vehicle was registered to an individual named ${vehiclereg}. Once everyone was ready, the chase started and they attempted to evade from police recklessly.`);
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

let inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="text2"], textarea');
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

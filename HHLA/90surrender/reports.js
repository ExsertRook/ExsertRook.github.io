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

	let scenecommand = document.getElementById('scenecommand').value;
	let negotiator = document.getElementById('negotiator').value;
    buffer.push('');
	
	if (scenecommand || negotiator) buffer.push(`[SCENE ASSIGNMENT]:`);
	if (scenecommand) buffer.push(`Scene Command: ${scenecommand}`);
	if (negotiator) buffer.push(`Negotiator: ${negotiator}`);
    if (scenecommand || negotiator) buffer.push('');

	let robbery = document.getElementById('robberytype').value;
	let robberyString = '';

	if (robbery.trim() === 'Fleeca Bank') {
		document.getElementById('whatStore').style.display = 'none';
		document.getElementById('whatFleeca').style.display = 'block';
		let specific = document.getElementById('specificBank').value;
		robberyString = `${robbery} at ${specific}`;
		ROBBERY_STATE = 'FLEECA';
	}
	if (robbery.trim() === '24/7 Store') {
		document.getElementById('whatFleeca').style.display = 'none';
		document.getElementById('whatStore').style.display = 'block';
		let specific = document.getElementById('specificStore').value;
		robberyString = `${robbery} at ${specific}`;
		ROBBERY_STATE = '24/7';
	} 
	if (robbery.trim() === 'Jewelry Store') {
		document.getElementById('whatFleeca').style.display = 'none';
		document.getElementById('whatStore').style.display = 'none';
		robberyString = robbery;
		ROBBERY_STATE = 'JEWLERY';
	}

    buffer.push(`[ROBBERY TYPE]:`);
    buffer.push(`${robberyString}`);
    buffer.push('');

	buffer.push(`[DESCRIBE INCIDENT]:`);
	buffer.push(`During normal patrol, we had received a report from dispatch of an alarm going off at the ${robberyString}.`);
	buffer.push(`After arriving on scene of the robbery, we made initial contact.`);

    let plate = document.getElementById('vehicleplate').value;
	let vehicledesc = document.getElementById('vehicledesc').value;
	let vehiclereg = document.getElementById('vehiclereg').value;
    if (plate || vehicledesc || vehiclereg) buffer.push('');
	if (plate || vehicledesc || vehiclereg) buffer.push(`[VEHICLE DESCRIPTION]:`);
	
    if (vehicledesc) vehicledesc = `was a ${vehicledesc}${(plate ? ' (PLATE: ' + plate + ')' : '')}`;
	if (plate || vehicledesc || vehiclereg) buffer.push(`The vehicle parked outside ${vehicledesc}. The vehicle was registered to an individual named ${vehiclereg}.`);
	if (plate || vehicledesc || vehiclereg) buffer.push('');

    let endingSelected = document.getElementById('ending');
    let endingInfo = {
        'Surrendered': {
            text: 'After the suspect(s) realised that there was no chance of them being able to flee the robbery, they decided to peacefully surrender.',
        },
        'Had no Hostage': {
            text: 'After the officers on scene noticed that the individuals robbing the place did not have a hostage, we made the move and convinced them to surrender.',
        },
        'Had a Hostage': {
            text: 'After the officers on scene noticed that the individuals robbing the place did have a hostage, we convinced them during negotiations to surrender.',
        },
        'Breached | Peaceful': {
            text: 'After attempting to convince the robbers, the suspects refused to surrender peacefully. Since we did not get anywhere with the negotiations, we went ahead and breached. The suspects did end up putting up a bit of resistance but all of them were apprehended.',
        },
        'Breached | Shot': {
            text: 'After attempting to convince the robbers, the suspects refused to surrender by us asking them nicely so we had to breach them. As we breached, the suspects did not show any sign of resistance and the breach was peaceful.',
        }
    }
    let ending = endingSelected.options[endingSelected.selectedIndex].text;
    buffer.push(endingInfo[ending].text);
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
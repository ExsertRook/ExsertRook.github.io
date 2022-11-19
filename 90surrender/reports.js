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
            text: 'After the officers on scene noticed that the individuals robbing the place did not have , we made the move and convinced them to surrender.',
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

function updateDarkmode() {
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
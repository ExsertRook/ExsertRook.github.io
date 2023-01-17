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
    //let breach = document.getElementById('breach').value;
    //let fleeattempt = document.getElementById('fleeattempt').value;

    
    buffer.push('[INCIDENT DETAILS]');
    if (location) buffer.push(`While being out on regular patrol, we responded to a 10-31 dispatch call of someone reporting a burglary near the area of ${location}.`);
    
	buffer.push(`Upon arriving near the immediate area, we began looking for an individual that might be lurking around the area acting suspicious.`);
    buffer.push('');

    let breachSelected = document.getElementById('breach');
    let breachInfo = {
        'Yes': {
            text: 'While still looking for any potential suspects, we did manage to witness an individual lockpick into one of the houses in the near area. Once they were in there, we had prepared to breach the house and we entered.',
        },
        'No': {
            text: 'While still looking for any potential suspects, we did manage to witness an individual lockpick into one of the houses in the near area. Once they were in there, we had waited outside of the house until the suspect came outside.',
        }
    };
    let breach = breachSelected.options[breachSelected.selectedIndex].text;
    buffer.push(breachInfo[breach].text);
    buffer.push('');

	buffer.push('Once we had eyes on the suspect, we had went ahead and placed the suspect into handcuffs.');
	
	let fleeSelected = document.getElementById('fleeattempt');
    let fleeInfo = {
        'Yes': {
            text: 'The suspect did make an attempt to flee, but was apprehended',
        },
        'No': {
            text: 'The suspect did not make an attempt to flee.',
        }
    };
    let fleeattempt = fleeSelected.options[fleeSelected.selectedIndex].text;
    buffer.push(fleeInfo[fleeattempt].text);
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

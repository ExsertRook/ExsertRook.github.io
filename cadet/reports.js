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
	buffer.push(`**${callsign}**`);
	buffer.push('');
	
	let phase = document.getElementById('phase').value;
	buffer.push(`**Phase:** ${phase}`);
	
	let hours = document.getElementById('hours').value;
	buffer.push(`**Hours:** ${hours}`);
	
	let activities = [];
	let activitiesText = '';
	if (document.getElementById('10-80a').checked) activities.push("10-80 - Primary");
	if (document.getElementById('10-80b').checked) activities.push("10-80 - Secondary");
	if (document.getElementById('10-80c').checked) activities.push("10-80 - Tertiary");
	if (document.getElementById('10-80d').checked) activities.push("10-80 - Parallel");
	if (document.getElementById('10-11').checked) activities.push("10-11");
	if (document.getElementById('10-90').checked) activities.push("10-90");
	if (document.getElementById('negotiations').checked) activities.push("Negotiations");
	if (document.getElementById('PIT').checked) activities.push("PIT");
	if (document.getElementById('911').checked) activities.push("911 Call");
	if (document.getElementById('code5').checked) activities.push("Code 5");
	if (document.getElementById('arrest').checked) activities.push("Arrest");
	buffer.push('');
    	if (activities.length > 1) {
		const lastActivity = activities.pop();
		activitiesText += `${activities.join("\n")} \n${lastActivity}`;
	} else {
		activitiesText = activities;
	}
    	buffer.push("**Cadet Logger - Successful activities ticked off**");
    	buffer.push(activitiesText);
    	buffer.push('');
    
	let notes = document.getElementById('notes').value;
	
    	buffer.push("**Notes:**")
   	buffer.push(notes)
	
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

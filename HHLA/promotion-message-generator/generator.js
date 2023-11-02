'use strict';

let buffer = [];
let officersInvolved = new Set();
let darkmodeState;

function report() {
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');
    buffer = []

    let messages = document.getElementById('messageType');
	let callsign = document.getElementById('callsign');
	let msgInfo = {
		'Promotion': {
            row1: '**PROMOTED**',
			row2: '',
			row3: '@',
			row4: '',
			row5: '',
		},
		'Cadet Promotion': {
            row1: '**PROMOTED**',
			row2: '',
			row3: '@',
			row4: '',
			row5: '**Congratulations!** On behalf of command, you have passed your cadet phase and have been promoted to a **Probationary Trooper!**',
			row6: '',
		},
		'Demotion': {
			row1: '**DEMOTED**',
			row2: '',
			row3: '@',
			row4: '',
			row5: '',
		},
		'FTP - Accepted': {
			row1: '**FTP - ACCEPTED**',
			row2: '',
			row3: '@',
			row4: '',
			row5: '',
		},
		'FTP - On Hold': {
			row1: '**FTP - ON HOLD**',
			row2: '',
			row3: '@',
			row4: '',
			row5: '',
		},
		'FTP - Declined': {
			row1: '**FTP - DECLINED**',
			row2: '',
			row3: '@',
			row4: '',
			row5: '',
		},
		'SWAT - Accepted': {
			row1: '**SWAT - ACCEPTED**',
			row2: '',
			row3: '@',
			row4: '',
			row5: '',
		},
		'SWAT - On Hold': {
			row1: '**SWAT - ON HOLD**',
			row2: '',
			row3: '@',
			row4: '',
			row5: '',
		},
		'SWAT - Declined': {
			row1: '**SWAT - DECLINED**',
			row2: '',
			row3: '@',
			row4: '',
			row5: '',
		},
		'SASP Application - Accepted': {
			row1: '**ACCEPTED**',
			row2: '',
			row3: '',
			row4: '',
			row5: '',
		},
		'SASP Application - Declined': {
			row1: '**DECLINED**',
			row2: '',
			row3: '',
			row4: '',
			row5: '',
		}
	}
	let currentmsg = messages.options[messages.selectedIndex].text;
	buffer.push(msgInfo[currentmsg].row1);
	buffer.push(msgInfo[currentmsg].row2);
	buffer.push(msgInfo[currentmsg].row3);
	buffer.push(msgInfo[currentmsg].row4);
	buffer.push(msgInfo[currentmsg].row5);
	buffer.push(msgInfo[currentmsg].row6);

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
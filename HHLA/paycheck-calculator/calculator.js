'use strict';

let buffer = [];
let officersInvolved = new Set();
let darkmodeState;

function report() {
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');
    buffer = []

    let ranks = document.getElementById('pdrank');
	let rankInfo = {
		'Cadet': {
            ranktitle: 'Current rank: Cadet',
		},
		'Trooper': {
			ranktitle: 'Current rank: Trooper',
		},
		'Trooper First Class': {
			ranktitle: 'Current rank: Trooper First Class',
		},
		'Senior Trooper': {
			ranktitle: 'Current rank: Senior Trooper',
		},
		'Corporal': {
			ranktitle: 'Current rank: Corporal',
		},
		'Sergeant': {
			ranktitle: 'Current rank: Sergeant',
		},
        'Sergeant First Class': {
            ranktitle: 'Current rank: Sergeant First Class',
        },
        'Lieutenant': {
            ranktitle: 'Current rank: Lieutenant',
        },
        'Captain': {
            ranktitle: 'Current rank: Captain',
        },
        'Chief': {
            ranktitle: 'Current rank: Chief',
        }
	}
	let currentrank = ranks.options[ranks.selectedIndex].text;
	buffer.push(rankInfo[currentrank].ranktitle);

    let hours = document.getElementById('hoursread').value;
	let rankmoney = document.getElementById('pdrank').value;
    let moneymade = (12 * hours * rankmoney);

    buffer.push(`Money made: $${moneymade}`);

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
'use strict';

let buffer = [];
let officersInvolved = new Set();
let darkmodeState;

function report() {
	let callsign = document.getElementById('yourself').value.trim();
	if (!callsign) callsign = '[missing]';

	buffer = [];
	/// Pull Info
	let susname = document.getElementById('suspectname').value;
    let susid = document.getElementById('suspectcid').value;
    let incidentnr = document.getElementById('incidentnr').value;
	let icudate = document.getElementById('icudate').value;
	/// Push Info
    buffer.push(`**ICU**`);
    buffer.push('');
    if (susname) buffer.push(`**Name of Patient:** ${susname}`);
    if (susid) buffer.push(`**Patient's CID:** ${susid}`);
    if (icudate) buffer.push(`**ICU Date:** ${icudate}`);
	if (susname, susid, icudate) buffer.push(`**Arresting Officer:** ${callsign}`);
    if (incidentnr) buffer.push(`**Incident Report Nr:** ${incidentnr}`);
	buffer.push('');
	if (susname, susid, icudate, incidentnr) buffer.push('Charges they need to recieve:');
	buffer.push('');
	/// CHARGES
	let c1 = document.getElementById('charge1').value;
	let c2 = document.getElementById('charge2').value;
	let c3 = document.getElementById('charge3').value;
	let c4 = document.getElementById('charge4').value;
	let c5 = document.getElementById('charge5').value;
	let c6 = document.getElementById('charge6').value;

	if (c1) buffer.push(`- ${c1}`);		
	if (c2) buffer.push(`- ${c2}`);	
	if (c3) buffer.push(`- ${c3}`);	
	if (c4) buffer.push(`- ${c4}`);	
	if (c5) buffer.push(`- ${c5}`);	
	if (c6) buffer.push(`- ${c6}`);
	
	buffer.push('');
	///	Other Info
	let other = document.getElementById('otherinfo').value;
	if (other) buffer.push(`**Other Information:**`)
	if (other) buffer.push(`${other}`);
    /////

	let curDarkmode = document.getElementById('darkmode').checked;
	if (curDarkmode) {
		if (darkmodeState === 'false') updateDarkmode();
	} else if (!curDarkmode) {
		if (darkmodeState === 'true') updateDarkmode();
	}

	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

let inputs = document.querySelectorAll('input[type="text"], input[type="text2"], input[type="text3"], input[type="text4"], input[type="number"], textarea');
inputs.forEach(i => i.addEventListener('keyup', report, false));

let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"], input[type="date"]');
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
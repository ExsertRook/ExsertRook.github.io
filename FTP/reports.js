'use strict';

let buffer = [];
let officersInvolved = new Set();
let alreadySpecifiedRobbery = false;
let ROBBERY_STATE = 'JEWLERY';

function report() {
	let callsign = document.getElementById('yourself').value.trim();
	if (callsign) {
		localStorage.setItem('callsign', callsign);
	}
	if (!callsign) callsign = '[Insert Callsign]';
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');

	buffer = [];
	buffer.push("**[TRAINING OFFICER]:**");
	buffer.push(callsign);
	buffer.push(``);
	/// INFO
	let cadetname = document.getElementById('cadet').value;
	let phase = document.getElementById('phase').value;
	let timestart = document.getElementById('timestart').value;
	let timeend = document.getElementById('timeend').value;
	let timezone = document.getElementById('timezone').value;

	let activities = document.getElementById('activitiescompleted').value;
	let activities2 = document.getElementById('activitiescompleted2').value;
	let activities3 = document.getElementById('activitiescompleted3').value;
	let activities4 = document.getElementById('activitiescompleted4').value;
	let activities5 = document.getElementById('activitiescompleted5').value;
	let activities6 = document.getElementById('activitiescompleted6').value;
	let activities7 = document.getElementById('activitiescompleted7').value;
	let notes = document.getElementById('notes').value;
	let patrolwork = document.getElementById('patrolwork').value;

	if (cadetname) {
		buffer.push(`**[CADET]:**`);
		buffer.push(`${cadetname}`);
		buffer.push(``);
	}
	if (phase) { 
		buffer.push(`**Phase:** ${phase}`);
		buffer.push(``);
	}
	if (timestart) {
		buffer.push(`**Patrol Started:** ${timestart} ${timezone}`);
		buffer.push(`**Patrol Ended:** ${timeend} ${timezone}`)
		buffer.push(``);
	}
	if (activities) {
		buffer.push(`**Activities Completed Successfully:**`);
		buffer.push(`*${activities}*`);
	}
	if (activities2) {
		buffer.push(`*${activities2}*`);
	}
	if (activities3) {
		buffer.push(`*${activities3}*`);
	}
	if (activities4) {
		buffer.push(`*${activities4}*`);
	}
	if (activities5) {
		buffer.push(`*${activities5}*`);
	}
	if (activities6) {
		buffer.push(`*${activities6}*`);
	}
	if (activities7) {
		buffer.push(`*${activities7}*`);
	}
	
	buffer.push(``);
	if (notes) {
		buffer.push(`**Notes:**`);
		buffer.push(`${notes}`);
		buffer.push(``);
	}
	
	if (patrolwork) {
		buffer.push(`Overall the cadet did ${patrolwork} while being on duty.`)
		buffer.push(``);
	}
	
	if (document.getElementById('cadetlogger').checked) {
		buffer.push(`**Cadet Logger - Updated**`);
	} else {
		buffer.push(`**Cadet Logger - Not Updated**`);
	}
	
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

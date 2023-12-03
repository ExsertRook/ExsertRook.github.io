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

	let citationType = document.getElementById('citationType').value;
	let location = document.getElementById('location').value;
	let reason = document.getElementById('reason').value;
	let fineAmount = document.getElementById('fineAmount').value;
	let fineStatus = document.getElementById('fineStatus').value;
	let recipient = document.getElementById('recipient').value;
	let department = document.getElementById('department').value;

	buffer.push(`${citationType}`);
	buffer.push('');
	buffer.push(`Location: ${location}`);
	buffer.push(`Reason: ${reason}`);
	buffer.push('');
	buffer.push(`Fine Amount: ${fineAmount}`);
	buffer.push(`Fine Status: ${fineStatus}`);
	buffer.push(``);
	buffer.push(`Recipient: ${recipient}`);
	buffer.push('');
	buffer.push('');
	buffer.push('');
	buffer.push('');
	buffer.push(`Officer: ${callsign}`);
	buffer.push(`Department:`);
	buffer.push(`${department}`);

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

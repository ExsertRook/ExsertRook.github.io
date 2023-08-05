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
	loadName();

	buffer = [];
	
	let title = document.getElementById('title').value;
	if (title) {
		buffer.push(`**${title}**`);
		buffer.push(``);
	};
	let titleother = document.getElementById('titleother').value;
	if (titleother) buffer.push(`**${titleother}**`);

	let patientname = document.getElementById('patientname').value;
	let patientbirth = document.getElementById('patientbirth').value;
	let patientnumber = document.getElementById('patientnumber').value;
	let patientEC1 = document.getElementById('patientEC1').value;
	let patientEC2 = document.getElementById('patientEC2').value;
	let patientEC3 = document.getElementById('patientEC3').value;
	let patientallergies = document.getElementById('patientallergies').value;
	let bloodtype = document.getElementById('bloodtype').value;
	let patientroom = document.getElementById('patientroom').value;
	let patientICUtime = document.getElementById('patientICUtime').value;
	let patientDOAtime = document.getElementById('patientDOAtime').value;

	if (patientname) buffer.push(`**Name:** ${patientname}`);
	if (patientbirth) buffer.push(`**DOB:** ${patientbirth}`);
	if (patientnumber) buffer.push(`**Number:** ${patientnumber}`);
	if (patientEC1) buffer.push(`**EC #1:** ${patientEC1}`);
	if (patientEC2) buffer.push(`**EC #2:** ${patientEC2}`);
	if (patientEC3) buffer.push(`**EC #3:** ${patientEC3}`);
	if (patientallergies) buffer.push(`**Allergies:** ${patientallergies}`);
	if (bloodtype) buffer.push(`**BloodType:** ${bloodtype}`);
	if (patientroom) buffer.push(`**ICU Room:** ${patientroom}`);
	if (patientICUtime) buffer.push(`**Intake Time:**${patientICUtime}`);
	if (patientDOAtime) buffer.push(`**DOA Time:** ${patientDOAtime}`);

	let summary = document.getElementById('summary').value;
	if (summary) {
		buffer.push(``);
		buffer.push(`**Summary:**`);
		buffer.push(`${summary}`);
	}

	if (callsign) {
		buffer.push(``);
		buffer.push(`**Signed,**`);
		buffer.push(`${callsign}`);
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

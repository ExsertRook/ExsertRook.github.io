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
	buffer.push("[REPORTING OFFICER]:");
	buffer.push(callsign);	

	let location = document.getElementById('location').value;
	let processedat = document.getElementById('processedat').value;
	buffer.push('');
	
	buffer.push(`[DETAILS OF THE INCIDENT]:`);
	if (location) buffer.push(`While being out on regular patrol, we responded to shots fired dispatch calls near ${location}. `);
	if (processedat) buffer.push(`Once we arrived on scene we started to look for casings in the general area. Upon successfully finding casings on the ground, we collected them in evidence bags and took them to ${processedat} and processed them for further information.`);
	buffer.push('');
	
	let weaponname1 = document.getElementById('weaponname1').value;
	let serial1 = document.getElementById('serial1').value;
	let weaponname2 = document.getElementById('weaponname2').value;
	let serial2 = document.getElementById('serial2').value;
	let weaponname3 = document.getElementById('weaponname3').value;
	let serial3 = document.getElementById('serial3').value;
	let weaponname4 = document.getElementById('weaponname4').value;
	let serial4 = document.getElementById('serial4').value;
	let weaponname5 = document.getElementById('weaponname5').value;
	let serial5 = document.getElementById('serial5').value;
	let weaponname6 = document.getElementById('weaponname6').value;
	let serial6 = document.getElementById('serial6').value;
    let weaponname7 = document.getElementById('weaponname7').value;
	let serial7 = document.getElementById('serial7').value;
    let weaponname8 = document.getElementById('weaponname8').value;
	let serial8 = document.getElementById('serial8').value;
	
	if (weaponname1 || serial1) buffer.push(`[WEAPON INFORMATION]:`);
	if (weaponname1 || serial1) buffer.push(`Weapon: ${weaponname1} | Serial Number: ${serial1}`);
	if (weaponname2 || serial2) buffer.push(`Weapon: ${weaponname2} | Serial Number: ${serial2}`);
	if (weaponname3 || serial3) buffer.push(`Weapon: ${weaponname3} | Serial Number: ${serial3}`);
	if (weaponname4 || serial4) buffer.push(`Weapon: ${weaponname4} | Serial Number: ${serial4}`);
	if (weaponname5 || serial5) buffer.push(`Weapon: ${weaponname5} | Serial Number: ${serial5}`);
	if (weaponname6 || serial6) buffer.push(`Weapon: ${weaponname6} | Serial Number: ${serial6}`);
    if (weaponname7 || serial7) buffer.push(`Weapon: ${weaponname7} | Serial Number: ${serial7}`);
    if (weaponname8 || serial8) buffer.push(`Weapon: ${weaponname8} | Serial Number: ${serial8}`);
	buffer.push('');
	
	let charge = document.getElementById('charge').value;
	let charge2 = document.getElementById('2nd charge').value;
	
	buffer.push(`[CHARGES]:`);
	if (charge) buffer.push(`Once a suspect is apprehended and they are in possessions of those weapons with the same serial numbers, they are to be brought to the interrogation room and questioned about the situation.`);
	if (charge) buffer.push(`If the interrogation verdict allows to, the suspect is to be charged with (alongside the obvious possession charge):`);
	buffer.push('');
	if (charge) buffer.push(`${charge}`);
	if (charge2) buffer.push(`${charge2}`); 

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

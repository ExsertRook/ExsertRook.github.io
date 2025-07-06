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
	buffer.push("RGV3");
	buffer.push("[REPORTING OFFICER]:");
	buffer.push(callsign);	

	let location = document.getElementById('location').value;
	let processedat = document.getElementById('processedat').value;
	buffer.push('');
	if (location) {
		buffer.push(`[LOCATION]:`)
		buffer.push(`The scene of the casings was located at ${location}.`);
		buffer.push('');
	}
	buffer.push(`[DETAILS OF THE INCIDENT]:`);

	let shotsSelected = document.getElementById('typeofcall');
	let shotsInformation = {
		'10-71 Calls': {
			text: 'While being out on regular patrol, we responded to shots fired dispatch calls. Once we arrived on scene we started to look for casings in the general area. Upon successfully finding casings on the ground, we collected them in evidence bags.',
		},
		'Officers Shot at': {
			text: 'While being out on regular patrol, we had criminals open fire on officers. Eventually the suspects managed to flee the area and we secured a perimeter. We then started to look for casings in the general area. Upon successfully finding casings on the ground, we collected them in evidence bags.',
		}
	};
	let shotstype = shotsSelected.options[shotsSelected.selectedIndex].text;
	if (shotsSelected) buffer.push(shotsInformation[shotstype].text);
	if (processedat) buffer.push(`Once we collected the evidence, we took them to ${processedat} and processed them for further information.`);
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
	
	let charge1 = document.getElementById('charge1').value;
	let enhancement1 = document.getElementById('enhancement1').value;
	let charge2 = document.getElementById('charge2').value;
	let enhancement2 = document.getElementById('enhancement2').value;
	let charge3 = document.getElementById('charge3').value;
	let enhancement3 = document.getElementById('enhancement3').value;
	let chargewhole1 = '';
	let chargewhole2 = '';
	let chargewhole3 = '';
	let chargecount1 = document.getElementById('chargecount1').value;
	let chargecount2 = document.getElementById('chargecount2').value;
	let chargecount3 = document.getElementById('chargecount3').value;

	buffer.push(`[CHARGES]:`);
	if (charge1) buffer.push(`Once a suspect is apprehended and they are in possessions of those weapons with the same serial numbers, they are to be brought to the interrogation room and questioned about the situation.`);
	if (charge1) buffer.push(`If the interrogation verdict allows to, the suspect is to be charged with (alongside the obvious possession charge):`);
	buffer.push('');
	if (charge1) chargewhole1 = (`${charge1} ${chargecount1}`);
	if (charge1 || enhancement1) chargewhole1 = (`${charge1} with the ${enhancement1} enhancement ${chargecount1}`);
	if (!enhancement1) chargewhole1 = (`${charge1} ${chargecount1}`);
	if (chargewhole1) buffer.push(`${chargewhole1}`);

	if (charge2) chargewhole2 = (`${charge2} ${chargecount2}`);
	if (charge2 || enhancement2) chargewhole2 = (`${charge2} with the ${enhancement2} enhancement ${chargecount2}`);
	if (!enhancement2) chargewhole2 = (`${charge2} ${chargecount2}`);
	if (chargewhole2) buffer.push(`${chargewhole2}`);

	if (charge3) chargewhole3 = (`${charge3} ${chargecount3}`);
	if (charge3 || enhancement3) chargewhole3 = (`${charge3} with the ${enhancement3} enhancement ${chargecount3}`);
	if (!enhancement3) chargewhole3 = (`${charge3} ${chargecount3}`);
	if (chargewhole3) buffer.push(`${chargewhole3}`);
	
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

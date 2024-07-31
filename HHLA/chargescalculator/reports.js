'use strict';

let buffer = [];
let officersInvolved = new Set();
let alreadySpecifiedRobbery = false;

function report() {
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');

	buffer = [];
	
	let charge1 = document.getElementById('charge1').value;
	let enhancement1 = document.getElementById('enhancement1').value;
	let charge2 = document.getElementById('charge2').value;
	let enhancement2 = document.getElementById('enhancement2').value;
	let charge3 = document.getElementById('charge3').value;
	let enhancement3 = document.getElementById('enhancement3').value;
	let charge4 = document.getElementById('charge4').value;
	let enhancement4 = document.getElementById('enhancement4').value;
	let charge5 = document.getElementById('charge5').value;
	let enhancement5 = document.getElementById('enhancement5').value;
	let charge6 = document.getElementById('charge6').value;
	let enhancement6 = document.getElementById('enhancement6').value;
	let charge7 = document.getElementById('charge7').value;
	let enhancement7 = document.getElementById('enhancement7').value;
	let charge8 = document.getElementById('charge8').value;
	let enhancement8 = document.getElementById('enhancement8').value;
	let chargewhole1 = '';
	let chargewhole2 = '';
	let chargewhole3 = '';
	let chargewhole4 = '';
	let chargewhole5 = '';
	let chargewhole6 = '';
	let chargewhole7 = '';
	let chargewhole8 = '';
	let chargecount1 = document.getElementById('chargecount1').value;
	let chargecount2 = document.getElementById('chargecount2').value;
	let chargecount3 = document.getElementById('chargecount3').value;
	let chargecount4 = document.getElementById('chargecount4').value;
	let chargecount5 = document.getElementById('chargecount5').value;
	let chargecount6 = document.getElementById('chargecount6').value;
	let chargecount7 = document.getElementById('chargecount7').value;
	let chargecount8 = document.getElementById('chargecount8').value;

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
	
	if (charge4) chargewhole4 = (`${charge4} ${chargecount4}`);
	if (charge4 || enhancement4) chargewhole4 = (`${charge4} with the ${enhancement4} enhancement ${chargecount4}`);
	if (!enhancement4) chargewhole4 = (`${charge4} ${chargecount4}`);
	if (chargewhole4) buffer.push(`${chargewhole4}`);

	if (charge5) chargewhole5 = (`${charge5} ${chargecount5}`);
	if (charge5 || enhancement5) chargewhole5 = (`${charge5} with the ${enhancement5} enhancement ${chargecount5}`);
	if (!enhancement5) chargewhole5 = (`${charge5} ${chargecount5}`);
	if (chargewhole5) buffer.push(`${chargewhole5}`);

	if (charge6) chargewhole6 = (`${charge6} ${chargecount6}`);
	if (charge6 || enhancement6) chargewhole6 = (`${charge6} with the ${enhancement6} enhancement ${chargecount6}`);
	if (!enhancement6) chargewhole6 = (`${charge6} ${chargecount6}`);
	if (chargewhole6) buffer.push(`${chargewhole6}`);

	if (charge7) chargewhole7 = (`${charge7} ${chargecount7}`);
	if (charge7 || enhancement7) chargewhole7 = (`${charge7} with the ${enhancement7} enhancement ${chargecount7}`);
	if (!enhancement7) chargewhole7 = (`${charge7} ${chargecount7}`);
	if (chargewhole7) buffer.push(`${chargewhole7}`);

	if (charge8) chargewhole8 = (`${charge8} ${chargecount8}`);
	if (charge8 || enhancement8) chargewhole8 = (`${charge8} with the ${enhancement8} enhancement ${chargecount8}`);
	if (!enhancement8) chargewhole8 = (`${charge8} ${chargecount8}`);
	if (chargewhole8) buffer.push(`${chargewhole8}`);

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

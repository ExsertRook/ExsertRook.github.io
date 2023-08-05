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
	/// INFO
	
	let aselected = document.getElementById('listpromotions');
	let aInfo = {
		'P5 > Trooper': {
			text: '',
			text2: '',
			text3: '**PROMOTED**',
			text4: '',
			text5: 'Due to successfully passing your final evaluation you are now promoted to a Trooper! Congratulations! Your new call sign is T-619',
		},
		'Junior Trainer > Trainer': {
			text: '',
			text2: '',
			text3: '**PROMOTED**',
			text4: '',
			text5: 'Due to your outstanding work & dedication to the Field Training Division, you have been promoted to **Field Trainer**. Keep up the amazing work! :cowboyHyperS:',
		},
		'D': {
			text: 'Line 1',
			text2: 'Line 2',
		}
	}
	let a = aselected.options[aselected.selectedIndex].text;
	buffer.push(aInfo[a].text);
	buffer.push(aInfo[a].text2);
	buffer.push(aInfo[a].text3);
	buffer.push(aInfo[a].text4);
	buffer.push(aInfo[a].text5);


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

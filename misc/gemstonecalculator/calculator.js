'use strict';

let buffer = [];
let darkmodeState;

function report() {
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');
    buffer = []

    let emerald = document.getElementById('emerald').value;
	let sapphire = document.getElementById('ruby').value;
	let ruby = document.getElementById('sapphire').value;
	let morganite = document.getElementById('morganite').value;

	let emeraldmin = (140);
	let sapphiremin = (399);
	let rubymin = (830);
	let morganitemin = (4600);
	let emeraldmax = (215);
	let sapphiremax = (520);
	let rubymax = (910);
	let morganitemax = (6500);

	let emeraldfinmin = (emerald * emeraldmin);
	let sapphirefinmin = (sapphire * sapphiremin);
	let rubyfinmin = (ruby * rubymin);
	let morganitefinmin = (morganite * morganitemin);

	let emeraldfinmax = (emerald * emeraldmax);
	let sapphirefinmax = (sapphire * sapphiremax);
	let rubyfinmax = (ruby * rubymax);
	let morganitefinmax = (morganite * morganitemax);

	let finmin = (emeraldfinmin + sapphirefinmin + rubyfinmin + morganitefinmin);
	let finmax = (emeraldfinmax + sapphirefinmax + rubyfinmax + morganitefinmax);

    if (finmin) buffer.push(`Minimum Price for all: $${finmin}`);
	if (finmax) buffer.push(`Maximum Price for all: $${finmax}`);

	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

let inputs = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
inputs.forEach(i => i.addEventListener('keyup', report, false));

let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', report, false));

let selectOptions = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', report, false));



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
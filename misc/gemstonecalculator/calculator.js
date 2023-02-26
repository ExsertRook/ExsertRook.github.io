'use strict';

let buffer = [];

function report() {
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');
    buffer = []
	/// Pull from HTML
    let emerald = document.getElementById('emerald').value;
	let sapphire = document.getElementById('sapphire').value;
	let ruby = document.getElementById('ruby').value;
	let morganite = document.getElementById('morganite').value;
	let drills = document.getElementById('drill').value;
	/// Values Minimum
	let emeraldmin = (120);
	let sapphiremin = (399);
	let rubymin = (830);
	let morganitemin = (4600);
	/// Values Max
	let emeraldmax = (229);
	let sapphiremax = (520);
	let rubymax = (910);
	let morganitemax = (6500);
	/// Misc Values
	let drillprice = (268);
	let refinetime = (30)
	/// Minimum Calculations
	let emeraldfinmin = (emerald * emeraldmin);
	let sapphirefinmin = (sapphire * sapphiremin);
	let rubyfinmin = (ruby * rubymin);
	let morganitefinmin = (morganite * morganitemin);
	/// Maximum Calculations
	let emeraldfinmax = (emerald * emeraldmax);
	let sapphirefinmax = (sapphire * sapphiremax);
	let rubyfinmax = (ruby * rubymax);
	let morganitefinmax = (morganite * morganitemax);
	/// Calculations
	let drilltotal = (drills * drillprice);1
	let timeSpentRefiningSeconds = (((emerald * refinetime) + (sapphire * refinetime) + (ruby * refinetime) + (morganite * refinetime)));
	let timeSpentRefiningMinutes = (((emerald * refinetime) + (sapphire * refinetime) + (ruby * refinetime) + (morganite * refinetime)) / 60);
	/// Price without drills
	let finmin = (emeraldfinmin + sapphirefinmin + rubyfinmin + morganitefinmin);
	let finmax = (emeraldfinmax + sapphirefinmax + rubyfinmax + morganitefinmax);
	let finavg = ((finmin + finmax) / 2);
	/// Price with drills included
	let finminprofit = (finmin - drilltotal);
	let finmaxprofit = (finmax - drilltotal);
	let finavgprofit = (finavg - drilltotal);
	/// ReportBody Information Text
	buffer.push(`Rough Prices for Gemstones:`);
    buffer.push(`Minimum for gems: $${finmin}`);
	buffer.push(`Maximum for gems: $${finmax}`);
	buffer.push(`Expected for gems: $${finavg}`);
	buffer.push('');
	if (drills) buffer.push(`Actual Profit Made (Minus Tool Prices):`);
	if (drills) buffer.push(`Minimum profit: $${finminprofit}`);
	if (drills) buffer.push(`Maximum profit: $${finmaxprofit}`);
	if (drills) buffer.push(`Expected profit: $${finavgprofit}`);
	buffer.push('');
	if (drills) buffer.push(`Money spent on Drills: $${drilltotal}`);
	buffer.push(`Time Spent Refining: ${timeSpentRefiningSeconds} seconds | ${timeSpentRefiningMinutes} minutes`);

	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

let inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="emerald"] textarea');
inputs.forEach(i => i.addEventListener('keyup', report, false));

let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', report, false));

let selectOptions = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', report, false));

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

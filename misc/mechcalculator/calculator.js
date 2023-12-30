'use strict';

let buffer = [];

function report() {
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');
    buffer = []
	/// Pull from HTML
	let aluminum = document.getElementById('aluminum').value;
	let steel = document.getElementById('steel').value;
	let scrap = document.getElementById('scrap').value;
	let rubber = document.getElementById('rubber').value;
	let glass = document.getElementById('glass').value;
	let oil = document.getElementById('oil').value;

	let percentage = document.getElementById('percentage').value;
	/// Base values
	let aluminumBaseValue = 90
	let steelBaseValue = 115
	let scrapBaseValue = 65
	let rubberBaseValue = 15
	let glassBaseValue = 40
	let oilBaseValue = 500
	/// Profit values
	let aluminumProfitValue = ((aluminumBaseValue * percentage) + aluminumBaseValue);
	let steelProfitValue = ((steelBaseValue * percentage) + steelBaseValue);
	let scrapProfitValue = ((scrapBaseValue * percentage) + scrapBaseValue);
	let rubberProfitValue = ((rubberBaseValue * percentage) + rubberBaseValue);
	let glassProfitValue = ((glassBaseValue * percentage) + glassBaseValue);
	let oilProfitValue = ((oilBaseValue * percentage) + oilBaseValue);

	/// Calculations base
	let aluminumBaseFinal = (aluminumBaseValue * aluminum);
	let steelBaseFinal = (steelBaseValue * steel);
	let scrapBaseFinal = (scrapBaseValue * scrap);
	let rubberBaseFinal = (rubberBaseValue * rubber);
	let glassBaseFinal = (glassBaseValue * glass);
	let oilBaseFinal = (oilBaseValue * oil);

	let aluminumProfitFinal = (aluminumProfitValue * aluminum);
	let steelProfitFinal = (steelProfitValue * steel);
	let scrapProfitFinal = (scrapProfitValue * scrap);
	let rubberProfitFinal = (rubberProfitValue * rubber);
	let glassProfitFinal = (glassProfitValue * glass);
	let oilProfitFinal = (oilProfitValue * oil);
	/// Calculate Total
	let MechanicValuetotalbase = (aluminumBaseFinal + steelBaseFinal + scrapBaseFinal + rubberBaseFinal + glassBaseFinal + oilBaseFinal);
	let MechanicValuetotalprofit = (aluminumProfitFinal + steelProfitFinal + scrapProfitFinal + rubberProfitFinal + glassProfitFinal + oilProfitFinal);
	/// Print out text
	buffer.push('Total Materials:');
	buffer.push('');
	buffer.push(`Aluminum: ${aluminum}`);
	buffer.push(`Glass: ${glass}`);
	buffer.push(`Rubber: ${rubber}`);
	buffer.push(`Scrap: ${scrap}`);
	buffer.push(`Steel: ${steel}`);
	buffer.push(`Oil: ${oil}`);
	buffer.push('');
	buffer.push(`Total Purchase Value: $${MechanicValuetotalbase}`);
	buffer.push(`Total Profit Value: $${MechanicValuetotalprofit}`);
	/// Return it to HTML page
	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}
/// Allow inputs from webpage
let inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="emerald"] textarea');
inputs.forEach(i => i.addEventListener('keyup', report, false));
/// Allow checkboxes from webpage
let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', report, false));
/// Allow select options
let selectOptions = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', report, false));
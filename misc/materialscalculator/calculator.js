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
	/// Warehouse values
	let aluminumWarehouseValue = 50
	let steelWarehouseValue = 60
	let scrapWarehouseValue = 30
	let rubberWarehouseValue = 8
	let glassWarehouseValue = 20
	/// Mechanic Average Price values
	let aluminumMechanicValue = 0
	let steelMechanicValue = 0
	let scrapMechanicValue = 0
	let rubberMechanicValue = 0
	let glassMechanicValue = 0
	/// Calculations warehouse
	let aluminumWarehouseFinal = (aluminumWarehouseValue * aluminum);
	let steelWarehouseFinal = (steelWarehouseValue * steel);
	let scrapWarehouseFinal = (scrapWarehouseValue * scrap);
	let rubberWarehouseFinal = (rubberWarehouseValue * rubber);
	let glassWarehouseFinal = (glassWarehouseValue * glass);
	/// Calculations mechanic
	let aluminumMechanicFinal = (aluminumMechanicValue * aluminum);
	let steelMechanicFinal = (steelMechanicValue * steel);
	let scrapMechanicFinal = (scrapMechanicValue * scrap);
	let rubberMechanicFinal = (rubberMechanicValue * rubber);
	let glassMechanicFinal = (glassMechanicValue * glass);
	/// Calculate weight in lbs
	let weight = ((aluminum * 5) + (steel * 5) + (scrap * 5) + (rubber * 5) + (glass * 5));
	/// Print out text
	buffer.push('Money you would make from selling:');
	buffer.push('');
	buffer.push('Aluminum:');
	buffer.push(`Warehouse: $${aluminumWarehouseFinal} | Mechanic: $${aluminumMechanicFinal}`);
	buffer.push('');
	buffer.push('Steel:');
	buffer.push(`Warehouse: $${steelWarehouseFinal} | Mechanic: $${steelMechanicFinal}`);
	buffer.push('');
	buffer.push(`Scrap:`);
	buffer.push(`Warehouse: $${scrapWarehouseFinal} | Mechanic: $${scrapMechanicFinal}`);
	buffer.push('');
	buffer.push(`Rubber:`);
	buffer.push(`Warehouse: $${rubberWarehouseFinal} | Mechanic: $${rubberMechanicFinal}`);
	buffer.push(``);
	buffer.push(`Glass:`);
	buffer.push(`Warehouse: $${glassWarehouseFinal} | Mechanic: $${glassMechanicFinal}`);
	buffer.push('');
	buffer.push(`Total weight of materials: ${weight}lbs`);
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
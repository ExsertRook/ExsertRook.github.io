'use strict';

let buffer = [];
let darkmodeState;

function report() {
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');
    buffer = []

    let amount = document.getElementById('amount').value;

    let paint_bucket = (amount * 1);
    let paint_water = (amount * 2);
    let paint_resin = (amount * 3);
    let paint_charcoal = (amount * 3);
    let paint_acetone = (amount * 1);
    let paint_vodka = (amount * 1);
    
    let grip_screws = (amount * 4);
    let grip_rubber = (amount * 2);
    let grip_aluminum_rods = (amount * 3);

    let scope_aluminum_rod = (amount * 1);
    let scope_aluminum_plates = (amount * 2);
    let scope_lens = (amount * 2);
    let scope_screws = (amount * 4);
    let scope_wires = (amount * 2);
    let scope_resin = (amount * 2);
    let scope_knob = (amount * 2);

    let pistolholo_aluminum_plates = (amount * 1);
    let pistolholo_lens = (amount * 1);
    let pistolholo_screws = (amount * 2);
    let pistolholo_wires = (amount * 1);
    let pistolholo_resin = (amount * 1);

    let arholo_aluminum_plates = (amount * 3);
    let arholo_lens = (amount * 1);
    let arholo_screws = (amount * 2);
    let arholo_wires = (amount * 1);
    let arholo_resin = (amount * 1);

    let pistolmag_aluminum_plates = (amount * 3);
    let pistolmag_springs = (amount * 1);
    let pistolmag_screws = (amount * 4);
    let pistolmag_resin = (amount * 1);
    let pistolmag_glass = (amount * 1);

    let smgmag_aluminum_plates = (amount * 4);
    let smgmag_springs = (amount * 2);
    let smgmag_screws = (amount * 6);
    let smgmag_resin = (amount * 1);
    let smgmag_glass = (amount * 1);

    let armag_aluminum_plates = (amount * 4);
    let armag_springs = (amount * 2);
    let armag_screws = (amount * 6);
    let armag_resin = (amount * 1);
    let armag_glass = (amount * 1);

    let drummag_aluminum_plates = (amount * 5);
    let drummag_springs = (amount * 2);
    let drummag_screws = (amount * 6);
    let drummag_resin = (amount * 2);

    let supressor_aluminum_plates = (amount * 3);
    let supressor_aluminum_rods = (amount * 4);
    let supressor_screws = (amount * 6);
    let supressor_resin = (amount * 1);
    
    let armag_steel = (amount * 5);
    let armag_aluminum = (amount * 4);
    let armag_rubber = (amount * 4);
    let pistolmag_steel = (amount * 3);
    let pistolmag_aluminum = (amount * 3);
    let pistolmag_rubber = (amount * 1);
    let smgmag_steel = (amount * 5);
    let smgmag_aluminum = (amount * 4);
    let smgmag_rubber = (amount * 1);
    let grip_steel = (amount * 2);
    let grip_aluminum = (amount * 2);
    let supressor_steel = (amount * 3);
    let supressor_aluminum = (amount * 8);
    let supressor_rubber = (amount * 2);

    if (document.getElementById('paint').checked) {
        buffer.push(`Attachment Selected: Paint`);
        buffer.push('');
        buffer.push(`Buckets: ${paint_bucket}x`);
        buffer.push(`Water: ${paint_water}x`);
        buffer.push(`Resin: ${paint_resin}x`);
        buffer.push(`Charcoal: ${paint_charcoal}x`);
        buffer.push(`Acetone: ${paint_acetone}x`);
        buffer.push(`Vodka: ${paint_vodka}x`);
    }
    if (document.getElementById('grip').checked) {
        buffer.push(`Attachment Selected: Grip`);
        buffer.push('');
        buffer.push(`Screws: ${grip_screws}x`);
        buffer.push(`Rubber: ${grip_rubber}x`);
        buffer.push(`Aluminum Rods: ${grip_aluminum_rods}x`);
        buffer.push('');
        buffer.push(`Steel: ${grip_steel}x`);
        buffer.push(`Aluminum: ${grip_aluminum}x`);
    }
    if (document.getElementById('scope').checked) {
        buffer.push(`Attachment Selected: Scope`);
        buffer.push('');
        buffer.push(`Aluminum Rods: ${scope_aluminum_rod}x`);
        buffer.push(`Aluminum Plates: ${scope_aluminum_plates}x`);
        buffer.push(`Lenses: ${scope_lens}x`);
        buffer.push(`Screws: ${scope_screws}x`);
        buffer.push(`Wires: ${scope_wires}x`);
        buffer.push(`Resin: ${scope_resin}x`);
        buffer.push(`Knobs: ${scope_knob}x`);
    }
    if (document.getElementById('pistolholo').checked) {
        buffer.push(`Attachment Selected: Pistol Holo Sight`);
        buffer.push('');
        buffer.push(`Aluminum Plates: ${pistolholo_aluminum_plates}x`); 
        buffer.push(`Lens: ${pistolholo_lens}x`); 
        buffer.push(`Screws: ${pistolholo_screws}x`); 
        buffer.push(`Wires: ${pistolholo_wires}x`); 
        buffer.push(`Resin: ${pistolholo_resin}x`); 
    }
    if (document.getElementById('arholo').checked) {
        buffer.push(`Attachment Selected: AR Holo Sight`);
        buffer.push('');
        buffer.push(`Aluminum Plates: ${arholo_aluminum_plates}x`);
        buffer.push(`Lens: ${arholo_lens}x`);
        buffer.push(`Screws: ${arholo_screws}x`);
        buffer.push(`Wires: ${arholo_wires}x`);
        buffer.push(`Resin: ${arholo_resin}x`);
    }
    if (document.getElementById('pistolmag').checked) {
        buffer.push(`Attachment Selected: Pistol Magazine`);
        buffer.push('');
        buffer.push(`Aluminum Plates: ${pistolmag_aluminum_plates}x`);
        buffer.push(`Springs: ${pistolmag_springs}x`);
        buffer.push(`Screws: ${pistolmag_screws}x`);
        buffer.push(`Resin: ${pistolmag_resin}x`);
        buffer.push(`Glass: ${pistolmag_glass}x`);
        buffer.push('');
        buffer.push(`Steel: ${pistolmag_steel}`);
        buffer.push(`Aluminum: ${pistolmag_aluminum}`);
        buffer.push(`Rubbwer: ${pistolmag_rubber}`);
    }
    if (document.getElementById('smgmag').checked) {
        buffer.push(`Attachment Selected: SMG Magazine`);
        buffer.push('');
        buffer.push(`Aluminum Plates: ${smgmag_aluminum_plates}x`);
        buffer.push(`Springs: ${smgmag_springs}x`);
        buffer.push(`Screws: ${smgmag_screws}x`);
        buffer.push(`Resin: ${smgmag_resin}x`);
        buffer.push(`Glass: ${smgmag_glass}x`);
        buffer.push('');
        buffer.push(`Steel: ${smgmag_steel}x`);
        buffer.push(`Aluminum: ${smgmag_aluminum}x`);
        buffer.push(`Rubber: ${smgmag_rubber}x`);
    }
    if (document.getElementById('armag').checked) {
        buffer.push(`Attachment Selected: AR Magazine`);
        buffer.push('');
        buffer.push(`Aluminum Plates: ${armag_aluminum_plates}x`);
        buffer.push(`Springs: ${armag_springs}x`);
        buffer.push(`Screws: ${armag_screws}x`);
        buffer.push(`Resin: ${armag_resin}x`);
        buffer.push(`Glass: ${armag_glass}x`);
        buffer.push('');
        buffer.push(`Steel: ${armag_steel}x`);
        buffer.push(`Aluminum: ${armag_aluminum}x`);
        buffer.push(`Rubber: ${armag_rubber}x`);
    }
    if (document.getElementById('drummag').checked) {
        buffer.push(`Attachment Selected: Drum Magazine`);
        buffer.push('');
        buffer.push(`Aluminum Plates: ${drummag_aluminum_plates}x`);
        buffer.push(`Springs: ${drummag_springs}x`);
        buffer.push(`Screws: ${drummag_screws}x`);
        buffer.push(`Resin: ${drummag_resin}x`);
    }
    if (document.getElementById('supressor').checked) {
        buffer.push(`Attachment Selected: Supressor`);
        buffer.push('');
        buffer.push(`Aluminum Plates: ${supressor_aluminum_plates}x`);
        buffer.push(`Aluminum Rods: ${supressor_aluminum_rods}x`);
        buffer.push(`Screws: ${supressor_screws}x`);
        buffer.push(`Resin: ${supressor_resin}x`);
        buffer.push('');
        buffer.push(`Screws: ${supressor_steel}x`);
        buffer.push(`Aluminum: ${supressor_aluminum}x`);
        buffer.push(`Rubber: ${supressor_rubber}x`);
    }

	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

let inputs = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
inputs.forEach(i => i.addEventListener('keyup', report, false));

let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', report, false));

let selectOptions = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', report, false));
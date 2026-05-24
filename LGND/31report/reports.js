'use strict';

let buffer = [];
let officersInvolved = new Set();
let alreadySpecifiedRobbery = false;

function report() {
    let callsign = document.getElementById('yourself').value.trim();
    if (callsign) localStorage.setItem('callsign', callsign);
    if (!callsign) callsign = '[missing]';

    buffer = [];
    buffer.push("RGV3");
    buffer.push("[REPORTING OFFICER]:");
    buffer.push(callsign);  
    buffer.push('');

    let location = document.getElementById('location').value;
    let weapon = document.getElementById('weapon')?.value || "";

    buffer.push(`[DETAILS OF THE INCIDENT]:`);
    if (location) buffer.push(`While being out on regular patrol, we responded to a 10-31 dispatch call of a holdup at ${location}. `);
    if (weapon) buffer.push(`Upon arriving there, we noticed an individual brandishing a weapon. The weapon in question was a ${weapon}.`);

    let suspectonscene = document.getElementById('suspectonscene').value;
    buffer.push(suspectonscene === "Yes" ? "There was a suspect on scene." : "There was no suspect on scene.");

    let fleeattempt = document.getElementById('fleeattempt').value;
    if (suspectonscene === "Yes")
        buffer.push(fleeattempt === "Yes"
            ? "After we made contact with the individual, they attempted to flee."
            : "After we made contact with the individual, they did not attempt to flee."
        );

    let didtheyshoot = document.getElementById('didtheyshoot')?.value || "No";

	if (suspectonscene === "Yes") {
		buffer.push(
			didtheyshoot === "Yes"
			? "After a bit of time the suspect(s) decided to open fire on officers. Eventually all suspects were apprehended."
			: "After a bit of time, all the suspect(s) were eventually apprehended."
		);
	}


    buffer.push('');

    // VEHICLE
    let plate = document.getElementById('vehicleplate').value.trim();
    let vehicledesc = document.getElementById('vehicledesc').value.trim();
    let vehiclereg = document.getElementById('vehiclereg').value.trim();
    let vehiclecolor = document.getElementById('carcolor').value.trim();

    let vehicleParts = [];
    if (vehiclecolor) vehicleParts.push(vehiclecolor);
    if (vehicledesc) vehicleParts.push(vehicledesc);

    let vehicleLine = 'The vehicle in question';

    if (vehicleParts.length > 0) {
        vehicleLine += ' was a ' + vehicleParts.join(' ');
        if (plate) vehicleLine += ` (PLATE: ${plate})`;
        vehicleLine += '.';
    } else if (plate) {
        vehicleLine += ` had the plate ${plate}.`;
    } else {
        vehicleLine += ' could not be described.';
    }

    let regLine = vehiclereg ? ` The vehicle was registered to an individual named ${vehiclereg}.` : "";

    buffer.push("[VEHICLE INFORMATION]:");
    buffer.push(vehicleLine + regLine);
    buffer.push('');

    // MEDICAL
    let medneedsus = document.getElementById('medneedsus').value;
    let medneedpd = document.getElementById('medneedpd').value;
    let hospitalname = document.getElementById('hospitalname').value;

    buffer.push(`[MEDICAL ATTENTION]:`);
    if (document.getElementById('medneed').checked) {
        buffer.push(`After we apprehended the suspects, they were in need of medical attention. We brought the injured people (Suspects Total: ${medneedsus} | PD Total: ${medneedpd}) to ${hospitalname}.`);
        buffer.push(`Once everyone got medical treatment, we started heading back towards the PD.`);
    } else {
        buffer.push(`Due to no suspects or officers having any major injuries, everyone waved their rights to medical attention.`);
    }

    if (document.getElementById('runhospital').checked) {
        buffer.push(`The suspect attempted to flee at the hospital but was apprehended.`);
    }

    buffer.push('');
    buffer.push('[PROCESSED]:');
    buffer.push(`All of the apprehended suspects were processed at ${document.getElementById('processedat').value}.`);

    document.getElementById('reportBody').value = buffer.join("\n");
}

// Visibility logic
function updateVisibility() {
    const suspect = document.getElementById('suspectonscene').value;
    const flee = document.getElementById('fleeattempt').value;

    document.getElementById('fleeWrapper').style.display =
        suspect === 'Yes' ? 'block' : 'none';

    document.getElementById('gotAwayWrapper').style.display =
        (suspect === 'Yes' && flee === 'Yes') ? 'block' : 'none';

    document.getElementById('weaponWrapper').style.display =
        suspect === 'Yes' ? 'block' : 'none';
}

// Attach listeners
let inputs = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
inputs.forEach(i => i.addEventListener('input', report));

let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', report));

let selectOptions = document.querySelectorAll('select');
selectOptions.forEach(i => {
    i.addEventListener('change', report);
    i.addEventListener('change', updateVisibility);
});

// Copy popup
function showCopiedPopup() {
    let popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    setTimeout(() => popup.classList.toggle("show"), 3500);
}

document.getElementById('copyReport').addEventListener('click', copy);

function clearSelection() {
    if (window.getSelection) window.getSelection().removeAllRanges();
    else if (document.selection) document.selection.empty();
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

'use strict';

let buffer = [];
let officersInvolved = new Set();
let darkmodeState;
let alreadySpecifiedRobbery = false;
let ROBBERY_STATE = 'JEWLERY';

function report() {
	let callsign = document.getElementById('yourself').value.trim();
	if (callsign) localStorage.setItem('callsign', callsign);
	if (!callsign) callsign = '[missing]';
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');

	buffer = [];
	buffer.push("[REPORTING OFFICER]:");
	buffer.push(callsign);	
	
	let primary = document.getElementById('primary').value;
	let secondary = document.getElementById('secondary').value;
	let tertiary = document.getElementById('tertiary').value;
	let parallel = document.getElementById('parallel').value;
	let airunit = document.getElementById('airunit').value;
	let bikeunit = document.getElementById('bikeunit').value;
	buffer.push('');
	
	buffer.push(`[INVOLVED IN PURSUIT]:`);
	if (primary) buffer.push(`Primary: ${primary}`);
	if (secondary) buffer.push(`Secondary: ${secondary}`);
	if (tertiary) buffer.push(`Tertiary: ${tertiary}`);
	if (parallel) buffer.push(`Parallel: ${parallel}`);
	if (airunit) buffer.push(`Air-1: ${airunit}`);
	if (bikeunit) buffer.push(`Bike-Unit: ${bikeunit}`);
	buffer.push('');
	
	let locationstart = document.getElementById('start').value;
	let locationend = document.getElementById('end').value;
	
	buffer.push(`[LOCATION]:`);
	if (locationstart) buffer.push(`Pursuit Began / Initial Location: ${locationstart}`);
	if (locationend) buffer.push(`Pursuit Ended: ${locationend}`);
	buffer.push('');

	
	let pursuitSelected = document.getElementById('pursuittype');
	let pursuitInformation = {
		'Refusing to pull over': {
			text: 'During regular patrol, we noticed that there was a vehicle breaking traffic laws. Upon attempting to pull them over, they did not even acknowledge it and refused to pull over their vehicle. With that they initiated a 10-80A with us pursuing the vehicle.',
		},
		'Excessive Speeding': {
			text: 'During regular patrol, we noticed that there was a vehicle who excessively sped past us. In an attempt to pull the vehicle over for a welfare check, they did not even pull over, initating a 10-80A.',
		},
		'Drug-Sales': {
			text: 'During regular patrol, we responded to some drug sale calls. Upon arrival, an individual that was in the area noticed the patrol vehicle and decided to get into their car and flee, initiating a 10-80A.',
		},
		'Drug-Sales (Confirmed Handoff)': {
			text: 'During regular patrol, we responded to some drug sale calls. Upon arrival, we notice and confirm an individual doing a handoff to a pedestrian passing by. Once we made a move and go up to the suspect, they got into their vehicle and fled, initiating a 10-80A.',
		},
		'10-11': {
			text: 'During regular patrol, we pulled over a vehicle that had broken a traffic law. While questioning the suspect, they decided to turn their vehicle back on and evade from us, initiating a 10-80A.',
		},
		'10-11 (Code 5)': {
			text: 'During regular patrol, we pulled over vehicle. Later realizing that the vehicle had a BOLO (Be On the Look Out) on it, we performed a Code 5 felony stop on them. The moment the occupants in the vehicle noticed that weapons are being drawn at them by the police, they quickly switched the engine on and fled the scene, initiating a 10-80A.',
		},
		'House Burglary': {
			text: 'During regular patrol, we responded to 10-31 house burglary calls at the location mentioned earlier. Upon arrival, an individual ran from a house that was in the area into their vehicle and fled the scene, initiating a 10-80A.',
		},
		'10-66': {
			text: 'During regular patrol, we responded to some 10-66 calls. Once arriving there, we noticed an individual acting suspicious so we approached them for further investigation. Upon approaching them, they then decided to get into their vehicle and flee, initiating a 10-80A.',
		},
		'BOLO Vehicle': {
			text: 'During regular patrol, we had eyes on a vehicle that was marked down as a "BOLO Vehicle". Once we attempted to stop the vehicle, they had increased their speed and initiated a 10-80A.',
		},
		'Kidnapping': {
			text: 'During regular patrol, we had a 10-72 situation occur at the location mentioned above. The hostage was placed into the vehicle and the drove off with the hostage, initiating a 10-80A.',
		},
		'10-67': {
			text: 'During regular patrol, we responded to a 10-67 (Grand Theft Auto) call of a car being stolen. Once we got on scene, and had eyes on the vehicle, the driver then decided to evade from us, initiating a 10-80A.',
		},
		'Brandishing a weapon': {
			text: 'During regular patrol, we had noticed an individual brandishing a weapon in a public area. Upon approaching the individual, they decided to get into a vehicle and evade from police, initiating a 10-80A.',
		},
		'911 Call': {
			text: 'During regular patrol, we responded to a 911 text from an individual in need of assistance. When we got to the scene of the 911 call, the person that was in question of commiting a crime decided to evade from the police in their vehicle, initiating a 10-80A.',
		},
		'GTA (HoldUp)': {
			text: 'During regular patrol, we noticed an individual holding up a driver of a vehicle for the keys. The suspect then grabbed the keys to the vehicle and initiated a 10-80A.',
		}
	};
	let pursuit = pursuitSelected.options[pursuitSelected.selectedIndex].text;
	
	
	
	buffer.push(`[PURSUIT INFORMATION]:`);
	buffer.push(pursuitInformation[pursuit].text);
	buffer.push('');
	
	let chaseSelected = document.getElementById('chaseend');
	let chaseInformation = {
		'Vehicle disabled | Ran on foot': {
			text: 'The chase lasted for a bit of time until their car had disabled from crashing it too many times. From there they got out of the disabled vehicle and ran on foot in hopes of getting away. The suspects were apprehended and placed under police custody.',
		},
		'Vehicle disabled | Surrendered': {
			text: 'The chase lasted for a bit of time until their car had disabled from crashing it too many times. From there they were smart enough to surrender and not flee on foot. The suspects were apprehended and placed under police custody.',
		},
		'Vehicle disabled | Vehicle swap': {
			text: 'The chase lasted for a bit of time until their car had disabled from crashing it too many times. From there they hopped out and got into a swap/transfer vehicle and the chase continued from there. Eventually after that pickup vehicle, the suspects were apprehended and placed under police custody.',
		},
		'Attempted Vehicle swap': {
			text: 'The chase lasted for a bit of time until they attempted to swap into a different vehicle but failed in the process. Shortly after the fleeing suspects had been apprehended and placed under police custody.',
		},
		'Vehicle swap x1': {
			text: 'The chase lasted for a bit of time until they hopped out and got into a swap/transfer vehicle and the chase continued from there. Eventually after that pickup vehicle, the suspects were apprehended and placed under police custody.',
		},
		'Vehicle swap x2': {
			text: 'The chase lasted for a bit of time until they hopped out and got into a swap/transfer vehicle and the chase continued from there. Eventually after that pickup vehicle, the suspects had another vehicle swap/transfer and the chase continued from there on. Eventually after that pickup vehicle, the suspects were apprehended and placed under police custody.',
		},
		'Bike swap': {
			text: 'The chase lasted for a bit of time until the hopped out of the car and got onto a bike that was set ready for them. The bike was then pursued and eventually the occupants fell off of the bike. The suspects were apprehended and placed under police custody.',
		},
		'Vehicle ran out of fuel': {
			text: 'The chase lasted for a bit of time until their vehicle had ran out of fuel and they got out on foot. Eventually the suspects were apprehended and placed under police custody.',
		},
		'Vehicle turtled | Ran on foot': {
			text: 'The chase lasted for a bit of time until their car had flipped and landed on their roof from crashing it. From there they got out of the turtled vehicle and ran on foot in hopes of getting away. The suspects were apprehended and placed under police custody.',
		},
		'Vehicle turtled | Surrendered': {
			text: 'The chase lasted for a bit of time until their car had flipped and landed on their roof from crashing it. From there they were smart enough to surrender and not flee on foot. The suspects were apprehended and placed under police custody.',
		}
	};
	let chase = chaseSelected.options[chaseSelected.selectedIndex].text;
	buffer.push(chaseInformation[chase].text);
	buffer.push('');
	
	let occupantscaught = document.getElementById('occupantscaught').value;
	if (occupantscaught) buffer.push(`${occupantscaught} of the suspects were apprehended by the end of the pursuit.`);
	buffer.push('');
	
	buffer.push(`[VEHICLE INFORMATION]:`);
	let plate = document.getElementById('vehicleplate').value;
	let vehicledesc = document.getElementById('vehicledesc').value;
	let vehiclereg = document.getElementById('vehiclereg').value;
	let occupants = document.getElementById('occupants').value;
	if (vehicledesc) vehicledesc = ` was a ${vehicledesc}${(plate ? ' (PLATE: ' + plate + ')' : '')}`;
	buffer.push(`The vehicle we were pursuing${vehicledesc}. The vehicle was registered to an individual named ${vehiclereg}. There were a total of ${occupants} occupants inside of the vehicle.`);
	buffer.push('');
	

	let medicalSelected = document.getElementById('medicalattention');
	let medicalInformation = {
		'Was requested by multiple suspects': {
			label: 'WAS REQUESTED',
			text: 'After we apprehended the suspects, they requested or needed medical attention due to the injuries they have sustained. We then transported them to Saint Fiacre Medical where they got further medical attention.',
		},
		'Was requested by one suspect': {
			label: 'ONE REQUESTED',
			text: 'After we apprehended the suspects, one of them requested or needed medical attention due to sustaining injuries. We then transported that suspect to Saint Fiacre Medical where they got further medical attention.',
		},
		'Was not requested or needed': {
			label: 'WAS NOT REQUESTED',
			text: 'After we apprehended the suspects, they did not request or need any medical attention.',
		}
	};
	let medical = medicalSelected.options[medicalSelected.selectedIndex].text;
	buffer.push(`[MEDICAL ATTENTION | ${medicalInformation[medical].label}]:`);
	buffer.push(medicalInformation[medical].text);
	buffer.push('');

	let processed = document.getElementById('processedat').value;
	buffer.push('[PROCESSED]:');
	buffer.push(`All of the apprehended suspects were processed at ${processed}.`);
	
	let curDarkmode = document.getElementById('darkmode').checked;
	if (curDarkmode) {
		if (darkmodeState === 'false') updateDarkmode();
	} else if (!curDarkmode) {
		if (darkmodeState === 'true') updateDarkmode();
	}

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

// Listen for a click on the button
function updateDarkmode() {
	// Then toggle (add/remove) the .dark-theme class to the body
	let darkmode = document.getElementById('darkmode').checked;
	if (darkmode) {
		localStorage.setItem("darkmode", true);
		darkmodeState = 'true';
	} else if (!darkmode) {
		localStorage.setItem("darkmode", false);
		darkmodeState = 'false';
	}
	document.body.classList.toggle('dark-theme');
}

function loadDarkmode() {
	let darkmodeSetting = localStorage.getItem("darkmode");
	if (!darkmodeSetting || darkmodeSetting === 'undefined' || darkmodeSetting === 'false') {
		localStorage.setItem("darkmode", false);
		darkmodeState = 'false';
	}
	if (darkmodeSetting == 'true') {
		document.getElementById('darkmode').checked = true;
		document.body.classList.toggle('dark-theme');
		darkmodeState = 'true';
	}
	loadName();
	if (ROBBERY_STATE === 'JEWLERY') {
		document.getElementById('whatFleeca').style.display = 'none';
		document.getElementById('whatStore').style.display = 'none';
	}
	//loadOfficers();
}

let officers = null;
let matched = [];

const replaceNames = {
	'Bucky Killbourne': 'Bucky Langston',
	'Xander Langston': 'Xander Killbourne'
};

function loadOfficers() {
	let cachedOfficers = localStorage.getItem("officers");
	if (!officers) {
		let xhr = new XMLHttpRequest();
		try {
			xhr.open("GET", "https://celestial.network/legacyrp/sasp", false);
			xhr.send(null);

			officers = JSON.parse(xhr.responseText).data;
			officers = officers.map(officer => officer.callsign + ' ' +
				(replaceNames[officer.full_name] ? replaceNames[officer.full_name] : officer.full_name));
			localStorage.setItem('officers', xhr.responseText);
		} catch (e) {
			if (cachedOfficers) {
				cachedOfficers = JSON.parse(cachedOfficers).data;
				officers = cachedOfficers.map(officer => officer.callsign + ' ' + officer.full_name);
				alert('Failed to load officers data from roster; using cached officers data...');
			} else {
				alert('Failed to load officers data from roster & no cache value stored!');
			}
		}
	}
}

function searchOfficer(search) {
	if (!search) {
		document.getElementById('officerslist').innerHTML = '';
		return;
	}
	search = search.toLowerCase();

	if (!officers) loadOfficers();

	let results = officers.filter(officer => officer.toLowerCase().includes(search));
	let resultsCap = 5;
	let count = 0;
	let finalResults = [];
	results.forEach(result => {
		count++;
		if (count > resultsCap) return;
		result = result.trim();
		finalResults.push("<button title='Add this officer to the list of officers involved' onClick='toggleOfficer(\"" + result + "\")'>" + result + "</button>");
	});
	document.getElementById('officerslist').innerHTML = finalResults.join("<br />");
}

function toggleOfficer(id) {
	if (officersInvolved.has(id)) {
		console.log("Removing " + id + "...");
		officersInvolved.delete(id);
	} else {
		console.log("Adding " + id + "...");
		officersInvolved.add(id);

		document.getElementById('officersearch').value = "";
	}
	report();
	updateOfficers();
}

function updateOfficers() {
	let output = "";
	for (let id of officersInvolved.values()) {
		output += `<div class="chip">\n`;
		output += `<img src="images/hat2.png" width="96" height="96">\n`;
		output += `${id}\n`;
		output += `<span class="closebtn" title="Remove this officer from the list of officers involved" style="cursor: default;" onclick='toggleOfficer(\"${id}\")'><i class="fa fa-times-circle-o" aria-hidden="true"></i>
</span>\n`;
		output += `</div>`
	}

	document.getElementById('officersAdded').innerHTML = "<br />" + output;
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

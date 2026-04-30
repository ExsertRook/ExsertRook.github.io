'use strict';

let buffer = [];
let officersInvolved = new Set();
let alreadySpecifiedRobbery = false;
let ROBBERY_STATE = 'JEWLERY';

function reportTitle () {
	const ind = "        ";
	buffer = [];

	let robberyString = document.getElementById("robberyFinal").value || "";
	

	let vehicle = document.getElementById('vehicledesc').value;
	buffer.push(`10-90 | ${robberyString} | ${vehicle}`);

	return document.getElementById('reportBody2').innerHTML = buffer.join("\n");
}

function report() {
	let callsign = document.getElementById('yourname').value.trim();
	if (callsign) {
		localStorage.setItem('callsign', callsign);
	}
	if (!callsign) callsign = '[Insert Callsign]';
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');

	buffer = [];
	buffer.push("RGV3");
	buffer.push("[REPORTING OFFICER]:");
	buffer.push(callsign);	

	let scenecommand = document.getElementById('scenecommand').value;
	let negotiator = document.getElementById('negotiator').value;
	let pictures = document.getElementById('pictures').value;
	let hostagestayer = document.getElementById('hostagestayer').value;
// Pull Drivers List
	let primary = document.getElementById('primary').value;
	let secondary = document.getElementById('secondary').value;
	let tertiary = document.getElementById('tertiary').value;
	let parallel = document.getElementById('parallel').value;
	let airunit = document.getElementById('airunit').value;
	let bikeunit = document.getElementById('bikeunit').value;
// Pull passengers List
	let primaryp = document.getElementById('primaryp').value;
	let secondaryp = document.getElementById('secondaryp').value;
	let tertiaryp = document.getElementById('tertiaryp').value;
	let parallelp = document.getElementById('parallelp').value;
	let airp = document.getElementById('airp').value;

	if (scenecommand || negotiator) buffer.push('');
	
	if (scenecommand || negotiator || hostagestayer) buffer.push(`[SCENE ASSIGNMENT]:`);
	if (scenecommand) buffer.push(`Scene Commander: ${scenecommand}`);
	if (negotiator) buffer.push(`Negotiator: ${negotiator}`);
	if (pictures) buffer.push(`Pictures: ${pictures}`);
	if (hostagestayer) buffer.push(`Hostage Taker: ${hostagestayer}`);
	
	buffer.push('');
	if (primary || secondary || tertiary || parallel || bikeunit || airunit) buffer.push(`[PURSUIT ORDER]:`);

	let primaryfinal = ''
	if (primary || !primaryp) primaryfinal = (`${primary}`);
	if (primaryp) primaryfinal = (`${primary} & ${primaryp}`);
	if (primaryfinal) buffer.push(`Primary: ${primaryfinal}`);
	
	let secondaryfinal = ''
	if (secondary || !secondaryp) secondaryfinal = (`${secondary}`);
	if (secondaryp) secondaryfinal = (`${secondary} & ${secondaryp}`);
	if (secondaryfinal) buffer.push(`Secondary: ${secondaryfinal}`);

	let tertiaryfinal = ''
	if (tertiary || !tertiaryp) tertiaryfinal = (`${tertiary}`);
	if (tertiaryp) tertiaryfinal = (`${tertiary} & ${tertiaryp}`);
	if (tertiaryfinal) buffer.push(`Tertiary: ${tertiaryfinal}`);

	let parallelfinal = ''
	if (parallel || !parallelp) parallelfinal = (`${parallel}`);
	if (parallelp) parallelfinal = (`${parallel} & ${parallelp}`);
	if (parallelfinal) buffer.push(`Parallel: ${parallelfinal}`);

	let airfinal = ''
	if (airunit || !airp) airfinal = (`${airunit}`);
	if (airp) airfinal = (`${airunit} & ${airp}`);
	if (airfinal) buffer.push(`Air-1: ${airfinal}`);

	if (bikeunit) buffer.push(`Bike-Unit: ${bikeunit}`);
	if (primary || secondary || tertiary || parallel || bikeunit || airunit) buffer.push('');

	// NEW robbery location system
let robberyString = document.getElementById("robberyFinal").value || "Unknown Location";

// Determine ROBBERY_STATE based on popup selection
if (robberyString.startsWith("Fleeca Bank")) {
    ROBBERY_STATE = "FLEECA";
}
else if (robberyString.startsWith("24/7 Store")) {
    ROBBERY_STATE = "24/7";
}
else if (robberyString.startsWith("Jewelry Store")) {
    ROBBERY_STATE = "JEWELRY";
}
else if (robberyString.startsWith("Pacific Bank")) {
    ROBBERY_STATE = "PACIFIC";
}
else {
    ROBBERY_STATE = "UNKNOWN";
}

	buffer.push(`[SCENE DETAILS]:`);
	buffer.push(`Whilst on duty, we received a dispatch call regarding an alarm going off at the ${robberyString}. Once units arrived on scene and a scene commander was established, they assigned officer ${callsign} to create and write the incident report.`);
	buffer.push('');
	let hostages = document.getElementById('hostages').value;
	let robbersinside = document.getElementById('robbersinside').value;
	let robbersoutside = document.getElementById('robbersoutside').value;
	buffer.push(`After securing a perimeter, we began negotiations. During negotiations, we learned that there were a total of:`);
	buffer.push(`Robbers Inside: ${robbersinside}`);
	buffer.push(`Robbers Outside: ${robbersoutside}`);
	buffer.push(`Hostages: ${hostages}`);
	buffer.push('');
	
	let demands = [];
	let demandsText = '';
	if (document.getElementById('fpassagensp').checked) demands.push("free passage with no spike strips on the perimeter");
	if (document.getElementById('fpassagensf').checked) demands.push("free passage with no spike strips on the whole chase");
	if (document.getElementById('nair').checked) demands.push("no helicopter/air1");
	if (document.getElementById('nspeed').checked) demands.push("no speed unit");
	if (document.getElementById('nbike').checked) demands.push("no bike unit");
	let otherDemands = document.getElementById('otherdemands').value.trim();
	if (otherDemands) demands.push(...otherDemands.split(','));
	if (demands.length > 1) {
		const lastDemand = demands.pop();
		demandsText += `${demands.join(', ')} and ${lastDemand}`;
	} else {
		demandsText = demands;
	}

	let stayedBack = (hostagestayer ? hostagestayer.trim() : 'a unit');
	buffer.push(`The ${robbersinside} suspect(s) demanded ${demandsText} for the safety of the ${hostages} hostage(s).` +
		` Once the suspect(s) confirmed that they were ready on the inside, scene commander prepared a pursuit lineup. Scene commander assigned ${stayedBack} to collect the hostage and their contact information. After the hostage was safe, the ${robberyString} building was cleared out.`);
	buffer.push('');

	buffer.push(`[VEHICLE | CHASE]:`);
	let plate = document.getElementById('vehicleplate').value;
	let vehicledesc = document.getElementById('vehicledesc').value;
	let vehiclereg = document.getElementById('vehiclereg').value
	let vehiclecolor = document.getElementById('carcolor').value;
	if (vehicledesc || vehiclecolor) vehicledesc = `which was a ${vehiclecolor} in colored ${vehicledesc}${(plate ? ' (PLATE: ' + plate + ')' : '')}`;
	if (vehiclereg) vehiclereg = `The vehicle was registered to an individual named ${vehiclereg}.`;
	if (!vehiclereg) vehiclereg = '';
	buffer.push(`We then let them get into their vehicle ${vehicledesc}. ${vehiclereg} Once everyone was ready, the chase started and they attempted to evade police recklessly.`);
	buffer.push('');

	let chaseSelected = document.getElementById('chaseend');
	let chaseInformation = {
		'Write Custom Ending': {
			text: 'The chase lasted for a bit of time until ...',
		},
		'Units lost eyes | Escaped': {
			text: 'The chase lasted for a bit of time until our pursuing units lost eyes on the suspects vehicle. After performing a search near the area where we lost eyes, we did not manage to find them.',
		},
		'Suspects caught | General Ending': {
			text: 'The chase lasted for a bit of time until our pursuing units managed to apprehend the suspects.',
		},
		'Surrendered | General Ending': {
			text: 'The chase lasted for a bit of time until the suspects fleeing decided to surrender.',
		},
		'Got out of vehicle | Ran on foot | Caught': {
			text: 'The chase lasted for a bit of time until they had stopped their car and stepped out of it. The suspects initiated a 10-81 and attempted to evade on foot. Our pursuing units eventually managed to apprehend the suspects and place them under police custody.',
		},
		'Got out of vehicle | Ran on foot | Escaped': {
			text: 'The chase lasted for a bit of time until they had stopped their car and stepped out of it. The suspects initiated a 10-81 and attempted to evade on foot.',
		},
		'Vehicle disabled | Ran on foot | Caught': {
			text: 'The chase lasted for a bit of time until their car had disabled from crashing it too many times. From there they got out of the disabled vehicle and ran on foot in hopes of getting away. The suspects were eventually apprehended and placed under police custody.',
		},
		'Vehicle disabled | Ran on foot | Escaped': {
			text: 'The chase lasted for a bit of time until their car had disabled from crashing it too many times. From there they got out of the disabled vehicle and ran on foot in hopes of getting away. The suspects then managed to out maneuver our ground units and eventually escape police custody.',
		},
		'Vehicle disabled | Vehicle swap | Caught': {
			text: 'The chase lasted for a bit of time until their car had disabled from crashing it too many times. From there they got out of the disabled vehicle and made a run for a vehicle that attempted to pick them up and assist them. Both the vehicle that attempted to pick them up and the original suspects were eventually apprehended and placed under police custody.',
		},
		'Vehicle disabled | Vehicle swap | Escaped': {
			text: 'The chase lasted for a bit of time until their car had disabled from crashing it too many times. From there they got out of the disabled vehicle and made a run for a vehicle that attempted to pick them up and assist them. After us losing eyes on them and performing a Code 6 of the general vicinity, both the vehicle that attempted to pick them up and the original suspects eventually escaped police custody.',
		},
		'Vehicle disabled | Surrendered': {
			text: 'The chase lasted for a bit of time until their vehicle had disabled from crashing it too many times. From there they were smart enough to surrender and not flee on foot. The suspects were eventually apprehended and placed under police custody.',
		},
		'Vehicle boxed in | Ran on foot | Caught': {
			text: 'The chase lasted for a bit of time until our pursuing ground units managed to pin the vehicle and box it in to where they could not move anymore. From there they got out of the boxed in vehicle and ran on foot in hopes of getting away. The suspects were eventually apprehended and placed under police custody.',
		},
		'Vehicle boxed in | Ran on foot | Escaped': {
			text: 'The chase lasted for a bit of time until our pursuing ground units managed to pin the vehicle and box it in to where they could not move anymore. From there they got out of the boxed in vehicle and ran on foot in hopes of getting away. After us losing eyes on them and performing a Code 6 of the general vicinity, the suspects eventually escaped police custody.',
		},
		'Vehicle boxed in | Surrendered': {
			text: 'The chase lasted for a bit of time until our pursuing ground units managed to pin the vehicle and box it in to where they could not move anymore. From there they were smart enough to surrender and not flee on foot. The suspects were eventually apprehended and placed under police custody.',
		},
		'Attempted Vehicle swap | Caught': {
			text: 'The chase lasted for a bit of time until they attempted to swap into a different vehicle but failed in the process. Shortly after the fleeing suspects had been apprehended and placed under police custody.',
		},
		'Vehicle swap x1 | Caught': {
			text: 'The chase lasted for a bit of time until they hopped out and got into a swap/transfer vehicle and the chase continued from there. Eventually after that pickup vehicle, the suspects were apprehended and placed under police custody.',
		},
		'Vehicle swap x1 | Escaped': {
			text: 'The chase lasted for a bit of time until they hopped out and got into a swap/transfer vehicle and the chase continued from there. Eventually after that pickup vehicle, the suspects were able to outdrive our pursuing units and making us lose eyes on the suspects. After an indepth search of the immediate area we did not find the suspects and called out VCB & UTL.',
		},
		'Vehicle swap x2 | Caught': {
			text: 'The chase lasted for a bit of time until they hopped out and got into a swap/transfer vehicle and the chase continued from there. Eventually after that pickup vehicle, the suspects had another vehicle swap/transfer and the chase continued from there on. Eventually after that pickup vehicle, the suspects were apprehended and placed under police custody.',
		},
		'Vehicle swap x2 | Escaped': {
			text: 'The chase lasted for a bit of time until they hopped out and got into a swap/transfer vehicle and the chase continued from there. Eventually after that pickup vehicle, the suspects had another vehicle swap/transfer and the chase continued from there on. Eventually after the 2nd pickup vehicle, the suspects were able to outdrive our pursuing units and making us lose eyes on the suspects. After an indepth search of the immediate area we did not find the suspects and called out VCB & UTL.',
		},
		'Vehicle swap x3 | Caught': {
			text: 'The chase lasted for a bit of time until they hopped out and got into a swap/transfer vehicle and the chase continued from there. Eventually after that pickup vehicle, the suspects had another vehicle swap/transfer and the chase continued from there on. Eventually after that pickup vehicle, they had another pickup and continued evading. Eventually the suspects were apprehended and placed under police custody.',
		},
		'Vehicle swap x3 | Escaped': {
			text: 'The chase lasted for a bit of time until they hopped out and got into a swap/transfer vehicle and the chase continued from there. Eventually after that pickup vehicle, the suspects had another vehicle swap/transfer and the chase continued from there on. Eventually after that pickup vehicle, they had another pickup and continued evading. Eventually after the 3rd pickup vehicle, the suspects were able to outdrive our pursuing units and making us lose eyes on the suspects. After an indepth search of the immediate area we did not find the suspects and called out VCB & UTL.',
		},
		'Bike swap | Caught': {
			text: 'The chase lasted for a bit of time until the hopped out of the car and got onto a bike that was set ready for them. The bike was then pursued and eventually the occupants fell off of the bike. The suspects were apprehended and placed under police custody.',
		},
		'Bike swap | Escaped': {
			text: 'The chase lasted for a bit of time until the hopped out of the car and got onto a bike that was set ready for them. The bike was then pursued and eventually our ground units had lost eyes on them. After a Code 6 was performed, we did not manage to find the suspects and called the pursuit Code 4.',
		},
		'Vehicle ran out of fuel | Ran on foot | Transfer vehicle | Caught': {
			text: 'The chase lasted for a bit of time until their vehicle had ran out of fuel and they got out on foot. Eventually the suspects got into a vehicle that had picked them up. From there another pursuit was initiated. Shortly after those suspects were apprehended and placed under police custody.',
		},
		'Vehicle ran out of fuel | Ran on foot | Transfer vehicle | Escaped': {
			text: 'The chase lasted for a bit of time until their vehicle had ran out of fuel and they got out on foot. Eventually the suspects got into a vehicle that had picked them up. From there another pursuit was initiated. After some time had passed and us losing eyes on them, we performed a Code 6 of the general vicinity. Since we did not manage the find the suspects, we called the situation all clear.',
		},
		'Vehicle ran out of fuel | Ran on foot | Caught': {
			text: 'The chase lasted for a bit of time until their vehicle had ran out of fuel and they got out on foot. Eventually the suspects were apprehended and placed under police custody.',
		},
		'Vehicle ran out of fuel | Ran on foot | Escaped': {
			text: 'The chase lasted for a bit of time until their vehicle had ran out of fuel and they got out on foot. After us losing eyes on them and performing a Code 6 of the general vicinity, the suspects eventually escaped police custody.',
		},
		'Vehicle ran out of fuel | Surrendered': {
			text: 'The chase lasted for a bit of time until their vehicle had ran out of fuel and they got out on foot. From there they were smart enough to surrender and not flee on foot. The suspects were eventually apprehended and placed under police custody.',
		},
		'Vehicle turtled | Ran on foot | Transfer vehicle | Caught': {
			text: 'The chase lasted for a bit of time until they managed to drive so recklessly to the point that their car had ended up turtling. The suspects then climbed out of the vehicle and began fleeing on foot. Eventually the fleeing suspects then managed to get into a vehicle that was ready to pick them up. Our ground units eventually managed to apprehend the suspects and place them under police custody.',
		},
		'Vehicle turtled | Ran on foot | Transfer vehicle | Escaped': {
			text: 'The chase lasted for a bit of time until they managed to drive so recklessly to the point that their car had ended up turtling. The suspects then climbed out of the vehicle and began fleeing on foot. Eventually the fleeing suspects then managed to get into a vehicle that was ready to pick them up. Our ground units eventually lost eyes on the pickup vehicle.',
		},
		'Vehicle turtled | Ran on foot | Caught': {
			text: 'The chase lasted for a bit of time until they managed to drive so recklessly to the point that their car had ended up turtling. The suspects then climbed out of the vehicle and began fleeing on foot. Eventually our pursuing units managed to detain the running suspects and place them under police custody.',
		},
		'Vehicle turtled | Ran on foot | Escaped': {
			text: 'The chase lasted for a bit of time until they managed to drive so recklessly to the point that their car had ended up turtling. The suspects then climbed out of the vehicle and began fleeing on foot. Eventually our pursuing units managed to lose eyes on the suspects and we called the chase VCB.',
		},
		'Vehicle turtled | Surrendered': {
			text: 'The chase lasted for a bit of time until their vehicle had gotten stuck on the roof, turtling. The suspects then climbed out of the vehicle and were smart enough not to run but instead surrender. From there, the suspects were apprehended and placed under police custody.',
		},
		'Vehicle Stuck | Ran on foot | Caught': {
			text: 'The chase lasted for a bit of time until their vehicle had gotten stuck in a confined space and were physically unable to drive out of there. The suspects then got out of the vehicle and ran on foot in hopes of getting away. The suspects were eventually apprehended and placed under police custody.',
		},
		'Vehicle Stuck | Ran on foot | Escaped': {
			text: 'The chase lasted for a bit of time until their vehicle had gotten stuck in a confined space and were physically unable to drive out of there. The suspects then got out of their vehicle and ran on foot in hopes of getting away. After us losing eyes on them and performing a Code 6 of the general vicinity, the suspects eventually escaped police custody.',
		},
		'Vehicle Stuck | Surrendered': {
			text: 'The chase lasted for a bit of time until their vehicle had gotten stuck in a confined space and were physically unable to drive out of there. The suspects then got out of their vehicle and decided to surrender and they were placed under police custody.',
		},
		'Vehicle was sent into water | Caught': {
			text: 'The chase lasted for a bit of time until they had drove their vehicle into the water. Eventually after pursuing the suspects in the water, they were all apprehended and placed under police custody.',
		},
		'Vehicle was sent into water | Escaped': {
			text: 'The chase lasted for a bit of time until they had drove their vehicle into the water. Eventually after pursuing the suspects in the water, we lost eyes on all the fleeing suspects and they have escaped under police custody.',
		},
		'Vehicle blew up': {
			text: 'The chase lasted for a bit of time until they had drove so recklessly to the point where they had accidentally hit an explosive and blew up their vehicle. After receiving medical attention, the suspects were apprehended and placed under police custody.',
		},
		'Vehicle took a jump | Escaped': {
			text: 'The chase lasted for a bit of time until we lost eyes on the suspects because they took a jump. Our pursuing vehicles failed to do the jump and we called the chase VCB.',
		},
		'Suspects opened fire from the vehicle | Caught': {
			text: 'The chase lasted for a bit of time until the suspects decided to start opening fire on our pursuing officers. After a shortlasting exchange of gunfire, the officers managed to incapacitate the suspects and place them under police custody.',
		},
		'Suspects opened fire from the vehicle | Escaped': {
			text: 'The chase lasted for a bit of time until the suspects decided to start opening fire on our pursuing officers. After a shortlasting exchange of gunfire, the officers did not manage to incapacitate the suspects and due to the suspects having an advantage, the officers took the chance and let the criminals flee in favour of saving our other officers lives. The suspects escaped and evaded police custody.',
		},
		'Turned into a shootout | All Caught': {
			text: 'The chase lasted for a bit of time until the robbers had initiated a shootout. Eventually after all the suspects were incapacitated, we secured them and held a perimeter on scene.',
		},
		'Turned into a shootout | All Escaped': {
			text: 'The chase lasted for a bit of time until the robbers had initiated a shootout. Unfortunately, since they managed to incapacitate more officers than we managed to incapacitate them, we had no choice but to let them flee the area to secure our downed officers safety.',
		},
		'Secondary Vehicle Blocked Units | Escaped': {
			text: 'The chase lasted for a bit of time until the pursuing units were blocked in a small alley by a secondary vehicle that got involved in the pursuit. After them successfully stopping the pursuing units, the original suspects managed to escape police and we declared the chase VCB.',
		},
		'Vehicle 10-50 | Suspects went down': {
			text: 'The chase lasted for a bit of time until the evading vehicle had crashed and the occupants of the vehicle were incapacitated.',
		},
		'Bike disabled | Ran on foot | Caught': {
			text: 'The chase lasted for a bit of time until the suspect(s) bike had disabled. The suspects then got off of the bike and ran on foot in hopes of getting away. The suspects were eventually apprehended and placed under police custody.',
		},
		'Bike disabled | Ran on foot | Escaped': {
			text: 'The chase lasted for a bit of time until the suspect(s) bike had disabled. The suspects then got off of the bike and ran on foot in hopes of getting away. After us losing eyes on them and performing a Code 6 of the general vicinity, the suspects eventually escaped police custody.',
		},
		'Bike disabled | Surrendered': {
			text: 'The chase lasted for a bit of time until the suspect(s) bike had disabled. The suspects then got off of their bike and decided to surrender and they were placed under police custody.',
		},
		'Vehicle Tires Popped | Ran on foot | Caught': {
			text: 'The chase lasted for a bit of time until their car tires had popped from crashing. From there they got out of the vehicle and ran on foot in hopes of getting away. The suspects were eventually apprehended and placed under police custody.',
		},
		'Vehicle Tires Popped | Ran on foot | Escaped': {
			text: 'The chase lasted for a bit of time until their car tires had popped from crashing. From there they got out of the vehicle and ran on foot in hopes of getting away. The suspects then managed to out maneuver our ground units and eventually escape police custody.',
		},
		'Vehicle Tires Popped | Surrendered': {
			text: 'The chase lasted for a bit of time until their vehicle tires had popped from crashing. From there they were smart enough to surrender and not flee on foot. The suspects were eventually apprehended and placed under police custody.',
		},
		'Fell off bike | Ran on foot | Caught': {
			text: 'The chase lasted for a bit of time until the suspect(s) had fallen off of their bike. The suspects then got off of the bike and ran on foot in hopes of getting away. The suspects were eventually apprehended and placed under police custody.',
		},
		'Fell off bike | Ran on foot | Escaped': {
			text: 'The chase lasted for a bit of time until the suspect(s) had fallen off of their bike. The suspects then got off of the bike and ran on foot in hopes of getting away. After us losing eyes on them and performing a Code 6 of the general vicinity, the suspects eventually escaped police custody.',
		},
		'Fell off bike | Vehicle Swap | Caught': {
			text: 'The chase lasted for a bit of time until the suspect(s) had fallen off of their bike. The suspects then got off of their bike and began running on foot. Shortly after a vehicle had picked up the suspects and we initiated another 10-80 with that vehicle. After pursuing the swap vehicle for a bit of time the suspects were eventually apprehended.',
		},
		'Fell off bike | Vehicle Swap | Escaped': {
			text: 'The chase lasted for a bit of time until the suspect(s) had fallen off of their bike. The suspects then got off of their bike and began running on foot. Shortly after a vehicle had picked up the suspects and we initiated another 10-80 with that vehicle. After pursuing the swap vehicle for a bit of time, the pursuing units managed to lose eyes on the suspects. After us losing eyes on them and performing a Code 6 of the general vicinity, the suspects eventually escaped police custody.',
		},
		'Fell off bike | Surrendered': {
			text: 'The chase lasted for a bit of time until the suspect(s) had fallen off of their bike. The suspects then got off of their bike and decided to surrender and they were placed under police custody.',
		},
		'Suspects declared Code Red': {
			text: 'The chase lasted for a bit of time until the suspect(s) had done something that made us declared them code red. Eventually the suspect(s) within the vehicle were incapacitated and stopped. We then cleared the scene and secured the suspects to place them under police custody.',
		},
		'Suspects Initiated a Shootout': {
			text: 'The chase lasted for some time until the suspect(s) initiated a shootout. Eventually they were slammed and placed into police custody.'
		}
	};
	let chase = chaseSelected.options[chaseSelected.selectedIndex].text;
	buffer.push(chaseInformation[chase].text);

	let processed = document.getElementById('processedat').value;
	let medneedsus = document.getElementById('medneedsus').value;
	let medneedpd = document.getElementById('medneedpd').value;
	let hospitalname = document.getElementById('hospitalname').value;
	if (document.getElementById('cend').checked) {
		if (document.getElementById('medneed').checked) {
			buffer.push('');
			buffer.push(`[MEDICAL ATTENTION]:`);
			buffer.push(`After we apprehended the suspects, they were in need of medical attention. We brought the injured people (Suspects Total: ${medneedsus} | Officers Total: ${medneedpd}) to ${hospitalname}.`);
			buffer.push(`Once everyone received medical attention, officers started returning to PD.`)
		} else {
			buffer.push('');
			buffer.push(`[MEDICAL ATTENTION]:`);
			buffer.push(`Due to no suspects or officers having any major injuries, everyone waved their rights to medical attention.`);
		}
		if (document.getElementById('runhospital').checked) {
			buffer.push(`The suspect attempted to flee at the hospital but was apprehended.`);
		}
		buffer.push('');
    	buffer.push('[PROCESSED]:');
		buffer.push(`All of the apprehended suspects were processed at ${processed}.`);

    }
	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

let inputs = document.querySelectorAll('input[type="text"], input[type="text2"], input[type="number"], textarea');
inputs.forEach(i => i.addEventListener('keyup', report, false));

let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', report, false));

let selectOptions = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', report, false));

let inputs2 = document.querySelectorAll('input[type="text"], input[type="text2"], input[type="number"], textarea');
inputs.forEach(i => i.addEventListener('keyup', reportTitle, false));

let checkboxes2 = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', reportTitle, false));

let selectOptions2 = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', reportTitle, false));

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

/* ------------------------------
   OFFICER SELECT POPUP SYSTEM
------------------------------ */

let activeOfficerInput = null;

// Open modal when clicking any officer input
document.querySelectorAll('.officer-select').forEach(input => {
    input.addEventListener('click', () => {
        activeOfficerInput = input;
        openOfficerModal();
    });
});

function openOfficerModal() {
    const modal = document.getElementById('officerModal');
    const list = document.getElementById('officerList');
    const search = document.getElementById('officerSearch');

    modal.style.display = "block";
    search.value = "";

    // Load roster options
    const options = [...document.querySelectorAll('#roster option')].map(o => o.value);

    renderOfficerList(options);

    // Live search
    search.onkeyup = () => {
        const filtered = options.filter(name =>
            name.toLowerCase().includes(search.value.toLowerCase())
        );
        renderOfficerList(filtered);
    };
}

function renderOfficerList(names) {
    const list = document.getElementById('officerList');
    list.innerHTML = "";

    names.forEach(name => {
        const div = document.createElement('div');
        div.className = "officer-item";
        div.textContent = name;

        div.onclick = () => {
            if (activeOfficerInput) {
                activeOfficerInput.value = name;
                report();       // update report
                reportTitle();  // update title
            }
            closeOfficerModal();
        };

        list.appendChild(div);
    });
}

function closeOfficerModal() {
    document.getElementById('officerModal').style.display = "none";
}

// Close modal when clicking outside the box
window.onclick = function(event) {
    const modal = document.getElementById('officerModal');
    if (event.target === modal) {
        closeOfficerModal();
    }
};

/* ------------------------------
   VEHICLE COLOR PICKER POPUP
------------------------------ */

document.addEventListener("DOMContentLoaded", () => {

    const colorInput = document.getElementById('carcolor');
    const colorModal = document.getElementById('colorModal');
    const colorWheel = document.getElementById('colorWheel');
    const colorPreviewText = document.getElementById('colorPreviewText');
    const selectColorBtn = document.getElementById('selectColorBtn');

    // Debug
    console.log("Color picker loaded:", {
        colorInput,
        colorModal,
        colorWheel,
        selectColorBtn
    });

    // If any element is missing, stop
    if (!colorInput || !colorModal || !colorWheel || !selectColorBtn) {
        console.error("Color picker elements missing — check IDs.");
        return;
    }

    // Open modal
    colorInput.addEventListener('click', () => {
        colorModal.style.display = "block";
    });

    // Live preview
    colorWheel.addEventListener('input', () => {
        colorPreviewText.textContent = colorWheel.value;
    });

    // Select color
    selectColorBtn.addEventListener('click', () => {
        console.log("Select button clicked");

        const hex = colorWheel.value;
        const name = getNearestColorName(hex);

        console.log("hex:", hex, "name:", name);

        colorInput.value = name;
        report();
        reportTitle();
        colorModal.style.display = "none";
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === colorModal) {
            colorModal.style.display = "none";
        }
    });

	const typeColorBtn = document.getElementById("typeColorBtn");
	const typeColorModal = document.getElementById("typeColorModal");
	const typedColorInput = document.getElementById("typedColorInput");
	const applyTypedColorBtn = document.getElementById("applyTypedColorBtn");

	// Open typing popup
	typeColorBtn.addEventListener("click", () => {
		typeColorModal.style.display = "block";
	});

	// Apply typed color
	applyTypedColorBtn.addEventListener("click", () => {
		const typed = typedColorInput.value.trim();

		if (!typed) return;

		// Hex input
		if (/^#?[0-9A-Fa-f]{6}$/.test(typed)) {
			const hex = typed.startsWith("#") ? typed : "#" + typed;
			const name = getNearestColorName(hex);
			colorInput.value = name;
			colorWheel.value = hex;
		} 
		else {
			// Color name input
			const lower = typed.toLowerCase();
			let matched = false;

			for (let name in namedColors) {
				if (name.toLowerCase() === lower) {
					colorInput.value = name;
					colorWheel.value = namedColors[name];
					matched = true;
					break;
				}
			}

			if (!matched) {
				alert("Unknown color. Try a hex code or a known color name.");
				return;
			}
		}

		report();
		reportTitle();
		typeColorModal.style.display = "none";
		colorModal.style.display = "none";
});

// Close typing popup when clicking outside
window.addEventListener("click", (event) => {
    if (event.target === typeColorModal) {
        typeColorModal.style.display = "none";
    }
});


});


const namedColors = {
    "Alice Blue": "#F0F8FF",
    "Antique White": "#FAEBD7",
    "Aqua": "#00FFFF",
    "Aquamarine": "#7FFFD4",
    "Azure": "#F0FFFF",
    "Beige": "#F5F5DC",
    "Bisque": "#FFE4C4",
    "Black": "#000000",
    "Blue": "#0000FF",
    "Brown": "#A52A2A",
    "Burly Wood": "#DEB887",
    "Cadet Blue": "#5F9EA0",
    "Chartreuse": "#7FFF00",
    "Chocolate": "#D2691E",
    "Coral": "#FF7F50",
    "Cornflower Blue": "#6495ED",
    "Crimson": "#DC143C",
    "Cyan": "#00FFFF",
    "Dark Blue": "#00008B",
    "Dark Cyan": "#008B8B",
    "Dark Golden Rod": "#B8860B",
    "Dark Gray": "#A9A9A9",
    "Dark Green": "#006400",
    "Dark Khaki": "#BDB76B",
    "Dark Magenta": "#8B008B",
    "Dark Olive Green": "#556B2F",
    "Dark Orange": "#FF8C00",
    "Dark Orchid": "#9932CC",
    "Dark Red": "#8B0000",
    "Dark Salmon": "#E9967A",
    "Dark Sea Green": "#8FBC8F",
    "Dark Slate Blue": "#483D8B",
    "Dark Slate Gray": "#2F4F4F",
    "Dark Turquoise": "#00CED1",
    "Dark Violet": "#9400D3",
    "Deep Pink": "#FF1493",
    "Deep SkyBlue": "#00BFFF",
    "Dodger Blue": "#1E90FF",
    "Fire Brick": "#B22222",
    "Forest Green": "#228B22",
    "Fuchsia": "#FF00FF",
    "Gold": "#FFD700",
    "Golden Rod": "#DAA520",
    "Gray": "#808080",
    "Green": "#008000",
    "Hot Pink": "#FF69B4",
    "Indian Red": "#CD5C5C",
    "Indigo": "#4B0082",
    "Ivory": "#FFFFF0",
    "Khaki": "#F0E68C",
    "Lavender": "#E6E6FA",
    "LawnGreen": "#7CFC00",
    "Light Blue": "#ADD8E6",
    "Light Coral": "#F08080",
    "Light Cyan": "#E0FFFF",
    "Light Gray": "#D3D3D3",
    "Light Green": "#90EE90",
    "Light Pink": "#FFB6C1",
    "Light Salmon": "#FFA07A",
    "Light Sea Green": "#20B2AA",
    "Light Sky Blue": "#87CEFA",
    "Light Slate Gray": "#778899",
    "Light Steel Blue": "#B0C4DE",
    "Lime": "#00FF00",
    "Lime Green": "#32CD32",
    "Magenta": "#FF00FF",
    "Maroon": "#800000",
    "Medium Aqua Marine": "#66CDAA",
    "Medium Blue": "#0000CD",
    "Medium Orchid": "#BA55D3",
    "Medium Purple": "#9370DB",
    "Medium Sea Green": "#3CB371",
    "Medium Slate Blue": "#7B68EE",
    "Medium Spring Green": "#00FA9A",
    "Medium Turquoise": "#48D1CC",
    "Midnight Blue": "#191970",
    "Mint Cream": "#F5FFFA",
    "Misty Rose": "#FFE4E1",
    "Moccasin": "#FFE4B5",
    "Navy": "#000080",
    "Olive": "#808000",
    "Olive Drab": "#6B8E23",
    "Orange": "#FFA500",
    "Orange Red": "#FF4500",
    "Orchid": "#DA70D6",
    "Pale GoldenRod": "#EEE8AA",
    "Pale Green": "#98FB98",
    "Pale Turquoise": "#AFEEEE",
    "Pale Violet Red": "#DB7093",
    "Papaya Whip": "#FFEFD5",
    "Peach Puff": "#FFDAB9",
    "Peru": "#CD853F",
    "Pink": "#FFC0CB",
    "Plum": "#DDA0DD",
    "Powder Blue": "#B0E0E6",
    "Purple": "#800080",
    "Red": "#FF0000",
    "Rosy Brown": "#BC8F8F",
    "Royal Blue": "#4169E1",
    "Saddle Brown": "#8B4513",
    "Salmon": "#FA8072",
    "Sandy Brown": "#F4A460",
    "Sea Green": "#2E8B57",
    "Sienna": "#A0522D",
    "Silver": "#C0C0C0",
    "Sky Blue": "#87CEEB",
    "Slate Blue": "#6A5ACD",
    "Slate Gray": "#708090",
    "Spring Green": "#00FF7F",
    "Steel Blue": "#4682B4",
    "Tan": "#D2B48C",
    "Teal": "#008080",
    "Thistle": "#D8BFD8",
    "Tomato": "#FF6347",
    "Turquoise": "#40E0D0",
    "Violet": "#EE82EE",
    "Wheat": "#F5DEB3",
    "White": "#FFFFFF",
    "Yellow": "#FFFF00",
    "Yellow Green": "#9ACD32"
};

function hexToRgb(hex) {
    hex = hex.replace("#", "");
    return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
    };
}

function colorDistance(c1, c2) {
    return Math.sqrt(
        Math.pow(c1.r - c2.r, 2) +
        Math.pow(c1.g - c2.g, 2) +
        Math.pow(c1.b - c2.b, 2)
    );
}

function getNearestColorName(hex) {
    let rgb = hexToRgb(hex);
    let closestName = null;
    let smallestDistance = Infinity;

    for (let name in namedColors) {
        let rgb2 = hexToRgb(namedColors[name]);
        let dist = colorDistance(rgb, rgb2);

        if (dist < smallestDistance) {
            smallestDistance = dist;
            closestName = name;
        }
    }

    return closestName;
}


selectColorBtn.addEventListener('click', () => {
    console.log("Select button clicked");

    console.log("colorWheel:", colorWheel);
    console.log("colorInput:", colorInput);
    console.log("colorModal:", colorModal);

    const hex = colorWheel.value;
    console.log("hex:", hex);

    const name = getNearestColorName(hex);
    console.log("name:", name);

    colorInput.value = name;
    report();
    reportTitle();
    colorModal.style.display = "none";
});

/* ------------------------------
   ROBBERY LOCATION POPUP SYSTEM
------------------------------ */

const robberyTypes = [
    "Jewelry Store",
    "Pacific Bank",
    "Fleeca Bank",
    "24/7 Store"
];

const fleecaLocations = [
    "Legion Square",
    "Burton",
    "Rockford Hills (Lifeinvader)",
    "Alta",
    "Great Ocean",
    "Route 68",
    "Paleto"
];

const storeLocations = [
    "Strawberry 24/7",
    "Davis LTD 24/7",
    "Murrieta Heights Rob's Liquor",
    "Little Seoul LTD 24/7",
    "Vespucci Canals Rob's Liquor",
    "Morningwood Rob's Liquor",
    "Mirror Park LTD 24/7",
    "Downtown Vinewood 24/7",
    "Tataviam Mountains 24/7",
    "Banham Canyon Rob's Liquor",
    "Banham Canyon 24/7",
    "Richman Glen LTD 24/7",
    "Chumash 24/7",
    "Harmony 24/7",
    "Grand Senora Rob's Liquor",
    "Grand Senora 24/7",
    "Grapeseed LTD 24/7",
    "Mount Chilliad 24/7",
    "Paleto 24/7"
];

let selectedRobberyType = null;
let selectedRobberyLocation = null;

const robberyModal = document.getElementById("robberyModal");
const robberyTypeList = document.getElementById("robberyTypeList");
const robberySubList = document.getElementById("robberySubList");
const robberySearch = document.getElementById("robberySearch");
const confirmRobberyBtn = document.getElementById("confirmRobberyBtn");
const robberyFinal = document.getElementById("robberyFinal");

// Open modal
document.getElementById("openRobberySelector").addEventListener("click", () => {
    robberyModal.style.display = "block";
    loadRobberyTypes();
});

// Close modal when clicking outside
window.addEventListener("click", (event) => {
    if (event.target === robberyModal) {
        robberyModal.style.display = "none";
    }
});

// Enable/disable confirm button
function updateConfirmState() {
    let valid = false;

    if (selectedRobberyType === "Jewelry Store" || selectedRobberyType === "Pacific Bank") {
        valid = true;
    }

    if (selectedRobberyType === "Fleeca Bank" && selectedRobberyLocation) {
        valid = true;
    }

    if (selectedRobberyType === "24/7 Store" && selectedRobberyLocation) {
        valid = true;
    }

    confirmRobberyBtn.style.opacity = valid ? "1" : "0.4";
    confirmRobberyBtn.style.pointerEvents = valid ? "auto" : "none";
}

// Load robbery types
function loadRobberyTypes() {
    robberyTypeList.innerHTML = "";
    robberySubList.style.display = "none";
    robberySearch.style.display = "none";
    selectedRobberyType = null;
    selectedRobberyLocation = null;
    updateConfirmState();

    robberyTypes.forEach(type => {
        const div = document.createElement("div");
        div.textContent = type;

        div.onclick = () => {
            selectedRobberyType = type;
            selectedRobberyLocation = null;

            [...robberyTypeList.children].forEach(c => c.classList.remove("selected-option"));
            div.classList.add("selected-option");

            if (type === "Fleeca Bank") {
                loadSubLocations(fleecaLocations);
            } else if (type === "24/7 Store") {
                loadSubLocations(storeLocations);
            } else {
                robberySubList.style.display = "none";
                robberySearch.style.display = "none";
            }

            updateConfirmState();
        };

        robberyTypeList.appendChild(div);
    });
}

// Load sub‑locations with search
function loadSubLocations(list) {
    robberySubList.innerHTML = "";
    robberySubList.style.display = "block";
    robberySearch.style.display = "block";

    function renderList(filter = "") {
        robberySubList.innerHTML = "";
        list
            .filter(loc => loc.toLowerCase().includes(filter.toLowerCase()))
            .forEach(loc => {
                const div = document.createElement("div");
                div.textContent = loc;

                div.onclick = () => {
                    selectedRobberyLocation = loc;

                    [...robberySubList.children].forEach(c => c.classList.remove("selected-option"));
                    div.classList.add("selected-option");

                    updateConfirmState();
                };

                robberySubList.appendChild(div);
            });
    }

    robberySearch.onkeyup = () => {
        renderList(robberySearch.value);
    };

    renderList();
}

// Confirm selection
confirmRobberyBtn.addEventListener("click", () => {
    let finalText = selectedRobberyType;

    if (selectedRobberyLocation) {
        finalText += " – " + selectedRobberyLocation;
    }

    robberyFinal.value = finalText;

    report();
    reportTitle();

    robberyModal.style.display = "none";
});
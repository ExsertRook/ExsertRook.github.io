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
	let primaryp = document.getElementById('primaryp').value;
	let secondary = document.getElementById('secondary').value;
	let secondaryp = document.getElementById('secondaryp').value;
	let tertiary = document.getElementById('tertiary').value;
	let tertiaryp = document.getElementById('tertiaryp').value;
	let parallel = document.getElementById('parallel').value;
	let parallelp = document.getElementById('parallelp').value;
	let airunit = document.getElementById('airunit').value;
	let airp = document.getElementById('airp').value;
	let bikeunit = document.getElementById('bikeunit').value;
	buffer.push('');
	
	buffer.push(`[INVOLVED IN PURSUIT]:`);

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
	buffer.push('');
	
	let locationstart = document.getElementById('start').value;
	let locationend = document.getElementById('end').value;
	
	buffer.push(`[LOCATION]:`);
	if (locationstart) buffer.push(`Pursuit Began / Initial Location: ${locationstart}`);
	if (locationend) buffer.push(`Pursuit Ended / Final Location: ${locationend}`);
	buffer.push('');

	
	let pursuitSelected = document.getElementById('pursuittype');
	let pursuitInformation = {
		'Custom...': {
			text: 'During regular patrol, ...',
		},
		'Refusing to pull over': {
			text: 'During regular patrol, we noticed that there was a vehicle breaking traffic laws. Upon attempting to pull them over, they did not even acknowledge it and refused to pull over their vehicle. With that they initiated a 10-80 with us pursuing the vehicle.',
		},
		'Excessive Speeding': {
			text: 'During regular patrol, we noticed that there was a vehicle who excessively sped past us. In an attempt to pull the vehicle over for a welfare check, they did not even pull over, initiating a 10-80.',
		},
		'Drug-Sales': {
			text: 'During regular patrol, we responded to some drug sale calls. Upon arrival, an individual that was in the area noticed the patrol vehicle and decided to get into their car and flee, initiating a 10-80.',
		},
		'Drug-Sales (Confirmed Handoff)': {
			text: 'During regular patrol, we responded to some drug sale calls. Upon arrival, we notice and confirm an individual doing a handoff to a pedestrian passing by. Once we made a move and go up to the suspect, they got into their vehicle and fled, initiating a 10-80.',
		},
		'Vehicle Tampering Call (Class M)': {
			text: 'During regular patrol, we responded to a Vehicle Tampering Dispatch call (Class M). Upon we arrived and the suspect had noticed us, they suspect decided to flee, initiating a 10-80.',
		},
		'Vehicle Tampering Call (Class A+)': {
			text: 'During regular patrol, we responded to a Vehicle Tampering Dispatch call (Class A+). Upon we arrived and the suspect had noticed us, they suspect decided to flee, initiating a 10-80.',
		},
		'Vehicle Tampering Call (Class A)': {
			text: 'During regular patrol, we responded to a Vehicle Tampering Dispatch call (Class A). Upon we arrived and the suspect had noticed us, they suspect decided to flee, initiating a 10-80.',
		},
		'Vehicle Tampering Call (Class B)': {
			text: 'During regular patrol, we responded to a Vehicle Tampering Dispatch call (Class B). Upon we arrived and the suspect had noticed us, they suspect decided to flee, initiating a 10-80.',
		},
		'Vehicle Tampering Call (Class C)': {
			text: 'During regular patrol, we responded to a Vehicle Tampering Dispatch call (Class C). Upon we arrived and the suspect had noticed us, they suspect decided to flee, initiating a 10-80.',
		},
		'Vehicle Tampering Call (Class D)': {
			text: 'During regular patrol, we responded to a Vehicle Tampering Dispatch call (Class D). Upon we arrived and the suspect had noticed us, they suspect decided to flee, initiating a 10-80.',
		},
		'10-11': {
			text: 'During regular patrol, we pulled over a vehicle that had broken a traffic law. While questioning the suspect, they decided to turn their vehicle back on and evade from us, initiating a 10-80.',
		},
		'10-11 (Code 5)': {
			text: 'During regular patrol, we pulled over a vehicle. Later realizing that the vehicle had a BOLO (Be On the Look Out) on it, we performed a Code 5 felony stop on them. The moment the occupants in the vehicle noticed that weapons are being drawn at them by the police, they quickly switched the engine on and fled the scene, initiating a 10-80.',
		},
		'House Burglary': {
			text: 'During regular patrol, we responded to 10-31 house burglary calls at the location mentioned earlier. Upon arrival, an individual ran from a house that was in the area into their vehicle and fled the scene, initiating a 10-80.',
		},
		'Assault and Battery': {
			text: 'During regular patrol, we had noticed an individual assaulting another individual without a weapon. When we went to confront them, they decided to hop in a vehicle and flee, initiating a 10-80.',
		},
		'Assault and Battery (PP)': {
			text: 'During regular patrol, we had noticed an individual assaulting an EMS/PD worker without a weapon. When we went to confront them, they decided to hop in a vehicle and flee, initiating a 10-80.',
		},
		'Aggravated Assault and Battery': {
			text: 'During regular patrol, we had noticed an individual assaulting another individual with a weapon. When we went to confront them, they decided to hop in a vehicle and flee, initiating a 10-80.',
		},
		'Aggravated Assault and Battery (PP)': {
			text: 'During regular patrol, we had noticed an individual assaulting an EMS/PD worker with a weapon. When we went to confront them, they decided to hop in a vehicle and flee, initiating a 10-80.',
		},
		'10-66': {
			text: 'During regular patrol, we responded to some 10-66 calls. Once arriving there, we noticed an individual acting suspicious so we approached them for further investigation. Upon approaching them, they then decided to get into their vehicle and flee, initiating a 10-80.',
		},
		'Stolen PD Car': {
			text: 'During regular patrol, we noticed a PD vehicle roaming around with no tracker on. As we came closer to investigate, the person then decided to run, initiating a 10-80.',
		},
		'10-71': {
			text: 'During regular patrol, we responded to some 10-71 calls. Once arriving there, we noticed an individual that was fleeing the immediate area of the shots fired calls. We then chased after them, initiating a 10-80.',
		},
		'Kidnapping': {
			text: 'During regular patrol, we had a 10-72 situation occur at the location mentioned above. The hostage was placed into the vehicle and the drove off with the hostage, initiating a 10-80.',
		},
		'BOLO Vehicle': {
			text: 'During regular patrol, we had eyes on a vehicle that was marked down as a "BOLO Vehicle". Once we attempted to stop the vehicle, they had increased their speed and initiated a 10-80.',
		},
		'Stolen PD Helicopter': {
			text: 'During regular patrol, there was someone who had stolen a Police Helicopter. Once we had eyes on the helicopter, we began pursuing it.',
		},
		'Stolen PD Helicopter': {
			text: 'During regular patrol, we noticed a rogue helicopter flying recklessly. Once we had closer eyes on the helicopter, we began pursuing it.',
		},
		'10-67': {
			text: 'During regular patrol, we responded to a 10-67 (Grand Theft Auto) call of a car being stolen. Once we got on scene, and had eyes on the vehicle, the driver then decided to evade from us, initiating a 10-80.',
		},
		'10-77 / 10-78 Call': {
			text: 'During regular patrol, we responded to an officers request for additionals (10-77/78). Once we arrived on scene where backup was requested, there was an individual that started fleeing the scene, initiating a 10-80.',
		},
		'Brandishing a weapon': {
			text: 'During regular patrol, we had noticed an individual brandishing a weapon in a public area. Upon approaching the individual, they decided to get into a vehicle and evade from police, initiating a 10-80.',
		},
		'2 Handed Weapon In Mount Zonah': {
			text: 'During regular patrol, we had payed a visit to Mount Zonah. While we were there, we noticed an individual who had a two handed weapon on their back roaming around the hospital. In an attempt to detain the individual, they ran for their vehicle and initiated a 10-80.',
		},
		'911 Call': {
			text: 'During regular patrol, we responded to a 911 text from an individual in need of assistance. When we got to the scene of the 911 call, the person that was in question of commiting a crime decided to evade from the police in their vehicle, initiating a 10-80.',
		},
		'GTA (HoldUp)': {
			text: 'During regular patrol, we noticed an individual holding up a driver of a vehicle for the keys. The suspect then grabbed the keys to the vehicle and initiated a 10-80.',
		},
		'Vandalism': {
			text: 'During regular patrol, we had an individual walk up towards our police cruiser and hit it with an object, causing a dent within the vehicle. In an attempt to detain and arrest the individual, they made a run for their vehicle and initiated a 10-80.',
		},
		'10-99': {
			text: 'During regular patrol we had an officer call out a 10-99 situation. After we arrived on scene of the 99 call, suspects fled immediately, initiating a 10-80.',
		},
		'Jaywalking': {
			text: 'During regular patrol, we noticed an individual crossing a 4 lane road. We saw him doing it and deemed it as jaywalking. Once we approached the individual to detain and question them, they evaded and ran into a vehicle, taking off in it and initiating a 10-80.',
		},
		'Stockade Robbery': {
			text: 'During regular patrol, we had an alarm go off inside of an armored stockade bank truck near the location mentioned above. Once we arrived on scene, there was an individual inside of a vehicle, attempting to flee, they evaded and ran into a vehicle, taking off in it and initiating a 10-80.',
		},
		'EMS to PD Call': {
			text: 'During regular patrol, we had EMS contact us through our radio requesting assistance at the location mentioned above. Once we arrived, the individual that matched the description EMS pointed out began fleeing, initiating a 10-80.',
		},
		'Evading a Parking Ticket': {
			text: 'During regular patrol, we were dealing with a vehicle that was illegally parked. When talking to the drive of the vehicle and asking them to sign the parking citation, they decided to flee, initiating a 10-80.',
		},
		'Warrant': {
			text: 'During regular patrol, we had seen an individual who seemed to have an out standing warrant. Once we made sure of the individuals identity, the suspect had began evading from us, initiating a 10-80',
		}
	};
	let pursuit = pursuitSelected.options[pursuitSelected.selectedIndex].text;
	
	
	
	buffer.push(`[PURSUIT INFORMATION]:`);
	buffer.push(pursuitInformation[pursuit].text);
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
			text: 'The chase lasted for a bit of time until the suspects had initiated a shootout. Eventually after all the suspects were incapacitated, we secured them and held a perimeter on scene.',
		},
		'Turned into a shootout | All Escaped': {
			text: 'The chase lasted for a bit of time until the suspects had initiated a shootout. Unfortunately, since they managed to incapacitate more officers than we managed to incapacitate them, we had no choice but to let them flee the area to secure our downed officers safety.',
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
	let carcolor = document.getElementById('carcolor').value;
	if (vehicledesc || carcolor) vehicledesc = ` was a ${carcolor} in colored ${vehicledesc}${(plate ? ' (PLATE: ' + plate + ')' : '')}`;
	buffer.push(`The vehicle we were pursuing${vehicledesc}. The vehicle was registered to an individual named ${vehiclereg}. There were a total of ${occupants} occupants inside of the vehicle.`);
	
	let flaggedSelected = document.getElementById('flaggedquestion');
	let flaggedInformation = {
		'Yes': {
			text: 'After running the plate of the vehicle used in crime, it came back as flagged stolen.',
		},
		'No': {
			text: 'After running the plate of the vehicle used in crime, it came back as not flagged stolen.',
		}
	};
	let flagged = flaggedSelected.options[flaggedSelected.selectedIndex].text;
	buffer.push(flaggedInformation[flagged].text);
	buffer.push('');

	let medneedsus = document.getElementById('medneedsus').value;
	let medneedpd = document.getElementById('medneedpd').value;
	let hospitalname = document.getElementById('hospitalname').value;
	let processed = document.getElementById('processedat').value;
	

    	if (document.getElementById('cend').checked) {
        	if (document.getElementById('medneed').checked) {
				buffer.push(`[MEDICAL ATTENTION]:`);
				buffer.push(`After we apprehended the suspects, they were in need of medical attention. We brought the injured people (Suspects Total: ${medneedsus} | PD Total: ${medneedpd}) to ${hospitalname}.`);
				buffer.push(`Once everyone got medical treatment, we started heading back towards the PD.`)
			} else {
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

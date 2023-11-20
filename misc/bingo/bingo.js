let darkmodeState;

const header = `<table><tr style="font-weight: bold; background-color: rgb(55, 17, 226); font-size: 30px"><td><h1>B</h1></td><td><h1>I</h1></td><td><h1>N</h1></td><td><h1>G</h1></td><td><h1>O</h1></td></tr>`;

const tdInlineStyle = `user-select: none; cursor: pointer;`;

const cells = [
	"10-99",
	"10-67",
	"10-66 Calls",
	"10-78s - no location",
	"Whole PD for this?",
	"Flees from Traffic Stop",
	"Flees from Felony stop",
	"STOP RAMMING US!",
	"Demand - No Speed",
	"You cant do that!!! - Criminal",
	"PD 10-14",
	"EMS 10-14",
	"Deal with a Danny",
	"911 - Someone needs food at the prison",
	"Prison Riot",
	"Prison Transport",
	"Air-1 - Code 0",
	"Fly Air-1 for a chase",
	"911 Asking for a job",
	"Get called a W Chaser",
	"On my 20!",
	"Can you reduce the fine?",
	"Blown up PD car",
	"Can yall close the ...?",
	"Shooting outside MRPD",
	"VCB while Air-1 Refuels",
	"Luka Tim in Air-1",
	"Cop taken Hostage",
	"I want a supervisor",
	"Be Primary on a chase",
	"Be Secondary on a chase",
	"Be Tertiary on a chase",
	"Be Parallel on a chase",
	"Robbery of a Fleeca Bank",
	"Robbery of a J-Store",
	"Robbery of a 24/7",
	"Robbery of a Bank Truck",
	"10-32 Calls",
	"Air-1 Co-Pilot",
	"Drive a Caprice",
	"Stolen Cop Car",
	"Another officer asks for food",
	"Hostage needs food",
	"12+ Officers on duty",
	"Shootout Occurs",
	"Shootout in tunnels",
	"Cadet Primary",
	"10-66 on Vinewood",
	"Radio gets out of hand",
	"10-25 to the captains office",
	"PITs authorized",
	"People interfere with chase",
	"Streetrace",
	"Negotiate for the hostage and let them leave",
	"VCB in less than 1 minute",
	"Have already done 10+ hours this week",
	"Have already done 20+ hours this week",
	"Only one on duty",
	"More EMS on duty than PD",
	"Officer Kidnapped",
	"Tow truck shows up",
	"200 month sentence",
	"Hostage at hospital",
	"Class 3 in a hospital",
	"10-32 at Casino",
	"Spin the Casino Wheel",
	"Criminal Threats",
	"Hand out a speeding ticket",
	"Hand out a Driving without a license ticket",
	"Starving mid-chase",
	"Dehydrated mid-chase",
	"Process a suspect in Paleto PD",
	"Bike transfer / swap",
	"Sent it into the water",
	"Used parachutes in attempt to escape",
	"Uses an elevator mid chase",
	"Suspects turtle",
	"Write an incident report",
	"Get Caught Lacking",
	"Criminal commits a Wrong Team move",
	"Fellow officer commits a Wrong Team move",
	"Suspect knows how to do your job better",
	"Karen",
	"2 hours without a single 10-90",
	"Ask to ride with someone",
	"Someone at the front desk",
	"Take out a cadet",
	"First to go down in a shootout",
	"Dont go down in a shootout",
	"Visit every PD (not Cayo) once during your shift",
	"Drunk person driving",
	"Hand out a Jaywalking ticket",
	"Chase goes through a Construction Site",
	"Get Dono-walled",
	"No Ammo",
	"Shots fired at Green Wonderland",
	"Ran out of ammo mid shootout",
	"Starving mid-shootout",
	"No FTOs respond on radio",
	"Breach a robbery",
	"Witness a house burglary",
	"Take part in Bike Patrol",
	"Visit Burgershot (Burgershit)",
	"Trespassing at MRPD",
	"Tell Sucher the word Lasagne while on duty",
	"Sucher on duty",
	"Alone on duty",
	"Get told to BACK OFF!",
	"Criminal tweets about his getaway",
	"Twitter beef",
	"Respond to a D or C vehicle tampering",
	"Respond to a B or higher vehicle tampering",
	"Whole lineup consists of the same department",
	"Someone didnt hold their radio down long enough",
	"Sucher cuts off mid sentence",
	"FIB on duty",
	"Detectives on duty",
	"SWAT on duty",
	"BCSO on duty",
	"Parking Enforcement on duty",
	"More BCSO on duty than SASP",
	"Chase a Red colored car",
	"Chase a Blue colored car",
	"Chase a Purple colored car",
	"Chase a Green colored car",
	"Chase a Yellow colored car",
	"Basic Bitch Package",
	"Use Drive-Mode for a chase",
	"Highway bombing",
	"Complete 1 daily task",
	"They take a massive jump",
	"10-32 / 10-66 Calls at Cayo Perico",
];
	
function shuffle(array) {
	let currentIndex = array.length
	let randomIndex;
	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
	return array;
}

let pageReloaded = false;

let randGenerated = [];

function toggle(cell) {
	let element = document.getElementById(`cell-${cell}`);
	if (!element) return;
	element.classList.toggle('selected-bingo');
	table = document.getElementById('bingo_table').innerHTML;
}

function reloadPage() {
	pageReloaded = true;
	loadPage();
}

function loadPage() {
	table = header;

	let randCells = shuffle(cells);
	
	let totalCount = 0;
	for (let i = 0; i < 25; i++) {
		let selected = randCells[totalCount];
		totalCount++;
		if (totalCount == 13) {
			selected = "Free Square";
			table += "<td id=\"cell-" + selected + "\" style='" + tdInlineStyle + "' onClick='toggle(\"" + selected + "\")'>"
			table += `${selected}`;
			table += `</td>`;
		} else {
			table += "<td id=\"cell-" + selected + "\" style='" + tdInlineStyle + "' onClick='toggle(\"" + selected + "\")'>"
			table += selected;
			table += `</td>`;

			if ((i + 1) % 5 == 0 ) table += `</tr><tr>`;
		}
	}
	table += '</table>';

	document.getElementById('bingo_table').innerHTML = table;
	toggle("Free Square");
}
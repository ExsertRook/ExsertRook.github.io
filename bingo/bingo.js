let darkmodeState;

const header = `<table><tr style="font-weight: bold; background-color: gray; font-size: 30px"><td><h1>B</h1></td><td><h1>I</h1></td><td><h1>N</h1></td><td><h1>G</h1></td><td><h1>O</h1></td></tr>`;

const tdInlineStyle = `user-select: none; cursor: pointer;`;

const cells = [
	"10-99",
	"10-66 Calls",
	"10-78s - no location",
	"Whole PD for this?",
	"Use Tazer instead of a Pistol",
	"Flees from Traffic Stop",
	"Flees from Felony stop",
	"STOP RAMMING US!",
	"Demand - No Speed",
	"PD 10-14",
	"EMS 10-14",
	"DOC 10-14",
	"911 - Someone needs food at the prison",
	"Prison Riot",
	"Prison Transport",
	"Air-1 - Code 0",
	"911 Asking for a job",
	"Get called a W Chaser",
	"On my 20!",
	"I want a Bench Trial",
	"Attend a Bench Trial",
	"Can you reduce the fine?",
	"Blown up PD car",
	"Can yall close the ...?",
	"Shooting outside MRPD",
	"VCB while Air-1 Refuels",
	"Cop taken Hostage",
	"Mack Hunter goes to a 10-66 call",
	"I want a supervisor",
	"Grill Bomb",
	"Be Primary on a chase",
	"Robbery of a Fleeca Bank",
	"Robbery of a J-Store",
	"Robbery of a 24/7",
	"Robbery of a Bank Truck",
	"10-32 Calls",
	"Johnson in Air1",
	"Another officer asks for food",
	"12+ Officers on duty",
	"Shootout Occurs",
	"Cadet Primary",
	"10-66 on Vinewood",
	"Radio gets out of hand",
	"10-25 to the captains office",
	"PITs authorized",
	"People interfere with chase",
	"Streetrace",
	"Negotiate for the hostage and let them leave",
	"VCB in less than 1 minute",
	"Have already done 10 hours this week",
	"Only one on duty",
	"More EMS on duty than PD",
	"Officer Kidnapped",
	"Tow truck shows up",
	"450 month sentence",
	"Hostage at hospital",
	"MDT down",
	"Class 3 in a hospital",
	"10-32 at Casino",
	"Criminal Threats",
	"Give out a speeding ticket",
	"Starving mid-chase",
	"Get called to the IA building",
	"Process a suspect in Paleto PD",
	"Bike transfer",
	"Sent it into the water",
	"Suspects turtle",
	"Write an incident report",
	"Get Caught Lacking",
	"Suspect knows how to do your job better",
	"Karen",
	"2 hours without a single 10-90",
	"Ask to ride with someone",
	"Someone at the front desk",
	"Take out a cadet",
	"First to go down in a shootout",
	"Visit every PD (not Cayo) once during your shift",
	"Drunk person driving",
	"Hand out a Jaywalking ticket",
	"Chase goes through a Construction Site",
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
	if (!pageReloaded) {
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
	}
	let randCells = shuffle(cells);
	
	let totalCount = 0;
	for (let i = 0; i < 25; i++) {
		let selected = randCells[totalCount];
		totalCount++;
		if (totalCount == 13) {
			selected = "Freebie";
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
	toggle("Freebie");
}
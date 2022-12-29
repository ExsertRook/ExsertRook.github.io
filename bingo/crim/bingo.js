let darkmodeState;

const header = `<table><tr style="font-weight: bold; background-color: gray; font-size: 30px"><td><h1>B</h1></td><td><h1>I</h1></td><td><h1>N</h1></td><td><h1>G</h1></td><td><h1>O</h1></td></tr>`;

const tdInlineStyle = `user-select: none; cursor: pointer;`;

const cells = [
	"Danny Asks Coke Plane",
	"Speed Unit",
	"Solo",
	"Hit a Fleeca Bank",
	"Hit a J-Store",
	"Hit a 24/7",
	"Hit a Stockade",
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
'use strict';

let darkmodeState;

const Settings = {
	'MAIN_TABLE_WIDTH': 3,
	'DEFAULT_MAX_CAP': 200,
}
function rep(elem, quantity) {
	return `${elem}|`.repeat(quantity).split('|').slice(0, -1);
}

const Menu = {
	"Basic Robbery:": {
		header: true,
	},
    "Armed Robbery of a Shop": {
		noIcon: true,
		price: 1500,
		items: [
			...rep("Steel", 40),
		],
	},
    "Armed Robbery of a Bank": {
		noIcon: true,
		price: 3200,
		items: [
			...rep("Steel", 90),
		],
	},
    "Armed Robbery of a Jewelry Store": {
		noIcon: true,
		price: 5000,
		items: [
			...rep("Aluminium", 150),
		],
	},
    "Kidnapping": {
		noIcon: true,
		price: 1200,
		items: [
			...rep("Aluminium", 70),
		],
	},
    "Evading a Police Officer": {
		noIcon: true,
		price: 350,
		items: [
			...rep("Steel", 15),
		],
	},
    "Felony Evading a Police Officer": {
		noIcon: true,
		price: 700,
		items: [
			...rep("Steel", 30),
		],
	},
    "Possession of Unregistered Weapon": {
		noIcon: true,
		price: 500,
		items: [
			...rep("Aluminium", 10),
		],
	},
    "Possession of Class 2 Weapon": {
		noIcon: true,
		price: 600,
		items: [
			...rep("Aluminium", 30),
		],
	},
    "Possession of Class 3 Weapon": {
		noIcon: true,
		price: 1000,
		items: [
			...rep("Aluminium", 50),
		],
	},


	"Robberies:": {
		header: true,
	},
    "Robbery": {
		noIcon: true,
		price: 40,
		items: [
			...rep("Aluminium", 1000),
		],
	},
    "Armed Robbery": {
		noIcon: true,
		price: 1500,
		items: [
			...rep("Aluminium", 70),
		],
	},
	"Armed Robbery of a Shop": {
		noIcon: true,
		price: 1500,
		items: [
			...rep("Steel", 40),
		],
	},
	"Armed Robbery of a Bank": {
		noIcon: true,
		price: 3200,
		items: [
			...rep("Steel", 90),
		],
	},
    "Armed Robbery of a Jewelry Store": {
		noIcon: true,
		price: 5000,
		items: [
			...rep("Aluminium", 150),
		],
	},
    "Armed Robbery of a Stockade": {
		noIcon: true,
		price: 4100,
		items: [
			...rep("Aluminium", 120),
		],
	},

	"Misc:": {
		header: true,
	},
	"Criminal Threats": {
		noIcon: true,
		price: 500,
		items: [
			...rep("Aluminium", 15),
		],
	},
    "Criminal Threats (PP)": {
		noIcon: true,
		price: 600,
		items: [
			...rep("Aluminium", 18),
		],
	},
    "Felony Weapons Discharge": {
		noIcon: true,
		price: 400,
		items: [
			...rep("Aluminium", 20),
		],
	},
    "Verbal Harassment": {
		noIcon: true,
		price: 300,
		items: [
			...rep("Aluminium", 10),
		],
	},
    "Bribery": {
		noIcon: true,
		price: 500,
		items: [
			...rep("Aluminium", 25),
		],
	},
    "Disregarding a Lawful Command": {
		noIcon: true,
		price: 300,
		items: [
			...rep("Aluminium", 10),
		],
	},
    "Obstruction of Justice": {
		noIcon: true,
		price: 200,
		items: [
			...rep("Aluminium", 0),
		],
	},


    "Drugs:": {
		header: true,
	},
    "Possession of a Class A Substance": {
		noIcon: true,
		price: 500,
		items: [
			...rep("Aluminium", 10),
		],
	},
    "Intention to Sell a Class A Substance": {
		noIcon: true,
		price: 2200,
		items: [
			...rep("Aluminium", 50),
		],
	},
    "Drug Trafficking a Class A Substance": {
		noIcon: true,
		price: 4000,
		items: [
			...rep("Aluminium", 70),
		],
	},
    "Possession of a Class B Substance": {
		noIcon: true,
		price: 200,
		items: [
			...rep("Aluminium", 5),
		],
	},
	"Intention to Sell a Class B Substance": {
		noIcon: true,
		price: 1400,
		items: [
			...rep("Aluminium", 30),
		],
	},
    "Drug Trafficking a Class B Substance": {
		noIcon: true,
		price: 2000,
		items: [
			...rep("Aluminium", 50),
		],
	},
    "Maintaining a Place for Distribution": {
		noIcon: true,
		price: 1200,
		items: [
			...rep("Aluminium", 45),
		],
	},
    "Sale of a Controlled Substance": {
		noIcon: true,
		price: 400,
		items: [
			...rep("Aluminium", 20),
		],
	},

    "Citations:": {
		header: true,
	},
    "Driving without a License": {
		noIcon: true,
		price: 300,
		items: [
			...rep("Aluminium", 0),
		],
	},
    "Speeding": {
		noIcon: true,
		price: 300,
		items: [
			...rep("Aluminium", 0),
		],
	},
    "Speeding (+30mph)": {
		noIcon: true,
		price: 600,
		items: [
			...rep("Aluminium", 30),
		],
	},
    "Hit and Run": {
		noIcon: true,
		price: 750,
		items: [
			...rep("Aluminium", 25),
		],
	},
    "Traffic / Parking Violation": {
		noIcon: true,
		price: 200,
		items: [
			...rep("Aluminium", 0),
		],
	},
    

};

const INDIVIDUAL_ITEMS = [
	"Aluminium", "Steel", "Refined Aluminium", "Refined Steel", "Plastic", "Refined Plastic", "Rubber", "Refined Rubber",
	"Copper", "Electronics", "Whiskey", "Scrap Metal", "Refined Scrap"
];

const buttons = {
	"buffer": {
		html: '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
	},
	"new_order": {
		html: '<div class="btn" onclick="newOrder();" title="Clear current order"><i class="fa fa-refresh" aria-hidden="true"></i> New </div>',
	},
	"set_combos": {
		html: '<div class="btn" onclick="toggleCombos()" title="Select current active combos"><i class="fa fa-cog" aria-hidden="true"></i> Combo Settings</div>',
	},
	"save": {
		html: '<div class="btn" onclick="updateSelected()" title="Save selected combos"><i class="fa fa-floppy-o" aria-hidden="true"></i> Save Combination Items</div>',
	},
	"deselect_combos": {
		html: '<div class="btn" onclick="deselectCombos()" title="Deselect all combos"><i class="fa fa-times-circle-o" aria-hidden="true"></i> Deselect All</div>',
	}
};

const discounts = {
	"half_off": {
		percent: .50,
		desc: '50% Discount (PD, EMS, BS Employees...)',
	},
	"blackout": {
		percent: .15,
		desc: 'Blackout Sale (15% off)',
	},
};

function getOccurrence(array, value) {
	return array.filter((v) => (v === value)).length;
}

let totalItems = 0;
function formatItems(items) {
	totalItems = 0;
	let newArray = [];
	let imageIcons = '';

	INDIVIDUAL_ITEMS.forEach(item => {
		let occ = getOccurrence(items, item);
		let imageName = item.toLowerCase().replace(' ', '_');
		let imageIcon = '';//`<img src="images/${imageName}.png" title="${occ}x ${item}" width="30" height="30"> `
		if (occ > 0) {
			newArray.push(`- ${occ}x ${imageIcon}${item}`);
			totalItems += occ;
		}
	});

	return newArray;
}

function add(item) {
	let elem = document.getElementById(`${item}-#`);
	if (!elem) return alert(`ERROR: ${item} is not available to add to the cart!`);
	let number = Number(elem.innerText);
	let max = Menu[item].max || Settings.DEFAULT_MAX_CAP;
	if (number + 1 <= max) {
		elem.innerText = number + 1;
		report();
	} else {
		alert(`You cannot add more than ${max}x ${item} in 1 order!`);
	}
}

function remove(item) {
	let elem = document.getElementById(`${item}-#`);
	if (!elem) return alert(`ERROR: ${item} is not available to remove to the cart!`);
	let number = Number(elem.innerText);
	if (number - 1 >= 0) {
		elem.innerText = Number(number) - 1;
		report();
	}
}

function set(item, quantity) {
	let elem = document.getElementById(`${item}-#`);
	if (!elem) return alert(`ERROR: ${item} is not available in the cart!`);
	if (isNaN(Number(quantity))) {
		return alert(`ERROR: ${quantity} is not a number!`);
	}
	quantity = Math.round(Number(quantity));
	let max = Menu[item].max || Settings.DEFAULT_MAX_CAP;
	if (max && quantity > max) {
		alert(`You cannot add more than ${max}x ${item} in 1 order!`);
		return;
	}
	elem.innerText = quantity;
	report();
}

function editQuantity(item) {
	let currentQuantity = 0;
	let elem = document.getElementById(`${item}-#`);
	if (elem) currentQuantity = elem.innerText;
	let quantity = prompt(`Enter quantity for ${item}:`, currentQuantity);
	if (!quantity) return set(item, 0);
	set(item, quantity);
}

function getEmptyOrder() {
	let buffer = [];
	buffer.push("<strong>CHARGES:</strong>");
	buffer.push("");
	buffer.push("");
	buffer.push(`<strong>TOTAL FINE:</strong> <span class="green">$0</span>`);
	document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

function report() {
	let buffer = [];
	let curDarkmode = document.getElementById('darkmode').checked;
	if (curDarkmode) {
		if (darkmodeState === 'false') updateDarkmode();
	} else if (!curDarkmode) {
		if (darkmodeState === 'true') updateDarkmode();
	}
	let total = 0;

	let allItems = [];
	let allItemsOrdered = [];

	Object.keys(Menu).forEach(item => {
		if (Menu[item].header) return;
		let selected = true;
		if (Menu[item].emoji) selected = isSelected(item);

		if (!selected) return;
        let time = Menu[item].time;
		let price = Menu[item].price;
		let quantity = 0;
		quantity = document.getElementById(`${item}-#`).innerText;

		let items = Menu[item].items;
		total += price * quantity;
		if (quantity) {
			let count = 0;
			if (quantity >= 1) allItemsOrdered.push(`- ${quantity}x ${item}`);
			while (count < quantity) {
				count++;
				allItems = allItems.concat(items);
			}
		}
	});

	let formatted = formatItems(allItems.sort());
	buffer.push("<strong>CHARGES:</strong>");
	if (allItemsOrdered.length) buffer.push(allItemsOrdered.join("\n"));
	buffer.push("");
	buffer.push("");
	buffer.push(`<strong>TOTAL FINE:</strong> <span class="green">$${total}</span>`);
    buffer.push("");
	buffer.push("");
	buffer.push(`<strong>TOTAL TIME:</strong> <span class="blue">${totalItems} months</span>`);

	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

// Listen for a click on the checkbox
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

function isSelected(comboName) {
	let returnVal;
	let value = localStorage.getItem(`${comboName}-SELECTED`);
	if (!value || value === 'undefined' || value === 'false') {
		returnVal = false;
	} else {
		returnVal = true;
	}
	return returnVal;
}

let pageReloaded = false;

function updateSelected() {
	Object.keys(Menu).forEach(item => {
		if (!Menu[item].header && Menu[item].emoji) {
			let checked = document.getElementById(`${item}-SELECTED`).checked;
			localStorage.setItem(`${item}-SELECTED`, checked);
		}
	});
	pageReloaded = true;
	loadPage();
	newOrder();
}

function getIcon(item) {
	/*
	if (!Menu[item].fileRenameException) {
		item = item.replace('Meal', '').replace('Combo', '').trim();
	}
	if (!Menu[item]) return;
	*/
	if (Menu[item].noIcon) return '';
	/*
	let icon;
	if (Menu[item].emoji) {
		icon = Menu[item].emoji;
	} else {
		let fileName = `${item.toLowerCase().replace(' ', '_')}.png`;
		icon = `<img src="images/${fileName}" width="20" height="20">`;
	}
	*/
	return icon;
}

function newOrder() {
	Object.keys(Menu).forEach(item => {
		if (Menu[item].header) return;
		let selected = isSelected(item);
		if (Menu[item].emoji && !selected) return;
		document.getElementById(`${item}-#`).innerText = 0;
	});
	pageReloaded = true;
	report();
}

function loadPage() {
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
	let table = '<table><tr>';
	let count = 0;
	Object.keys(Menu).forEach(item => {
		if (Menu[item].header) {
			for (let i = count; i < Settings.MAIN_TABLE_WIDTH; i++) {
				table += `<td></td>`;
			}
			table += `</tr><tr><td colspan="${Settings.MAIN_TABLE_WIDTH}"><center><strong><u>${item}</u></strong></center></td></tr><tr>`;
			count = 0;
		} else {
			let icon = getIcon(item);
			if (Menu[item].emoji) {
				if (!isSelected(item)) return;
			} else {
				let fileName = `${item.toLowerCase().replace(' ', '_')}.png`;
			}
			let qty = 0;
			if (pageReloaded && (Menu[item].emoji && isSelected(item))) {
				let element = document.getElementById(`${item}-#`);
				if (element) qty = document.getElementById(`${item}-#`).innerText;
			}

			table += "<td><center><button class=\"btn\" title='Add 1x " + item + "' onClick='add(\"" + item + "\")'><strong>" + icon + item + "</strong></button><br />" +
				`Qty: <strong><span id="${item}-#">${qty}</span></strong>` +
				"<i class=\"fa fa-pencilfa fa-pencil-square\" aria-hidden=\"true\" title='Manually edit " + item + " quantity' onClick='editQuantity(\"" + item + "\")'></i> " +
				"<i class=\"fa fa-minus-circle\" aria-hidden=\"true\" title='Remove 1x " + item + "' onClick='remove(\"" + item + "\")'></i></td>";
			count++;
			if (count == Settings.MAIN_TABLE_WIDTH) {
				table += `</tr><tr>`
				count = 0;
			}
			if (Menu[item].lastItem) {
				for (let i = count; i < Settings.MAIN_TABLE_WIDTH; i++) {
					table += `<td></td>`;
				}
			}
		}
	});

	table += `</tr></table>`;

	document.getElementById('table').innerHTML = table;

	if (!pageReloaded) getEmptyOrder();

	let inputs = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
	inputs.forEach(i => i.addEventListener('keyup', report, false));

	let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
	checkboxes.forEach(i => i.addEventListener('click', report, false));
}
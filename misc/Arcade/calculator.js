'use strict';

let buffer = [];

function report() {
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');
    buffer = []

	/// Pull from HTML
	let zpill = document.getElementById('zpill').value;
	let zpillsmall = document.getElementById('zpillsmall').value;
	let zpillparty = document.getElementById('zpillparty').value;
	let arenapill = document.getElementById('arenapill').value;
	let arenasmall = document.getElementById('arenasmall').value;
	let arenaparty = document.getElementById('arenaparty').value;

	let hotdog = document.getElementById('hotdog').value;
	let nachos = document.getElementById('nachos').value;
	let wonderwaffle = document.getElementById('wonderwaffle').value;
	let water = document.getElementById('water').value;
	let soda = document.getElementById('soda').value;
	let milk = document.getElementById('milk').value;

	let pacman = document.getElementById('pacman').value;
	let monkeyparadise = document.getElementById('monkeyparadise').value;
	let princesspeach = document.getElementById('princesspeach').value;
	let hardapplecider = document.getElementById('hardapplecider').value;
	let reddead = document.getElementById('reddead').value;
	let guantlet = document.getElementById('guantlet').value;

	let strawberry = document.getElementById('strawberry').value;
	let chocolate = document.getElementById('chocolate').value;
	let cherrybeer = document.getElementById('cherrybeer').value;
	let cokefloat = document.getElementById('cokefloat').value;

	let sampler = document.getElementById('sampler').value;
	let moomunch = document.getElementById('moomunch').value;
	let nachodeluxe = document.getElementById('nachodeluxe').value;
	let bonanza = document.getElementById('bonanza').value;

	let applepie = document.getElementById('applepie').value;
	let thevirgin = document.getElementById('thevirgin').value;
	let thecartel = document.getElementById('thecartel').value;
	let annoyingorange = document.getElementById('annoyingorange').value;
	let antiems = document.getElementById('antiems').value;
	let newzealand = document.getElementById('newzealand').value;
	let glizzywater = document.getElementById('glizzywater').value;

	/// Item Costs
	let zpillCost = 1070
	let zpillsmallCost = 10700
	let zpillpartyCost = 26750
	let arenapillCost = 54
	let arenasmallCost = 270
	let arenapartyCost = 540

	let hotdogCost = 11
	let nachosCost = 11
	let wonderwaffleCost = 27
	let waterCost = 6
	let sodaCost = 17
	let milkCost = 54

	let pacmanCost = 35
	let monkeyparadiseCost = 54
	let princesspeachCost = 60
	let hardappleciderCost = 56
	let reddeadCost = 47
	let guantletCost = 40

	let strawberryCost = 74
	let chocolateCost = 114
	let cherrybeerCost = 82
	let cokefloatCost = 122

	let samplerCost = 83
	let moomunchCost = 103
	let nachodeluxeCost = 112
	let bonanzaCost = 90

	let applepieCost = 81
	let thevirginCost = 25
	let thecartelCost = 55
	let annoyingorangeCost = 27
	let antiemsCost = 45
	let newzealandCost = 65
	let glizzywaterCost = 45

	/// Item sell price
	let zpillSell = 1500
	let zpillsmallSell = 14500
	let zpillpartySell = 37000
	let arenapillSell = 450
	let arenasmallSell = 2000
	let arenapartySell = 4250

	let hotdogSell = 30
	let nachosSell = 30
	let wonderwaffleSell = 35
	let waterSell = 10
	let sodaSell = 20
	let milkSell = 70

	let pacmanSell = 100
	let monkeyparadiseSell = 100
	let princesspeachSell = 100
	let hardappleciderSell = 125
	let reddeadSell = 125
	let guantletSell = 125

	let strawberrySell = 100
	let chocolateSell = 150
	let cherrybeerSell = 150
	let cokefloatSell = 150

	let samplerSell = 150
	let moomunchSell = 150
	let nachodeluxeSell = 160
	let bonanzaSell = 200

	let applepieSell = 100
	let thevirginSell = 100
	let thecartelSell = 100
	let annoyingorangeSell = 100
	let antiemsSell = 100
	let newzealandSell = 100
	let glizzywaterSell = 100

	/// Final calculator price
	let zpillFinal = (zpillSell * zpill);
	let zpillsmallFinal = (zpillsmallSell * zpillsmall);
	let zpillpartyFinal = (zpillpartySell * zpillparty);
	let arenapillFinal = (arenapillSell * arenapill);
	let arenasmallFinal = (arenasmallSell * arenasmall);
	let arenapartyFinal = (arenapartySell * arenaparty);
	let hotdogFinal = (hotdogSell * hotdog);
	let nachosFinal = (nachosSell * nachos);
	let wonderwaffleFinal = (wonderwaffleSell * wonderwaffle);
	let waterFinal = (waterSell * water);
	let sodaFinal = (sodaSell * soda);
	let milkFinal = (milkSell * milk);
	let pacmanFinal = (pacmanSell * pacman);
	let monkeyparadiseFinal = (monkeyparadiseSell * monkeyparadise);
	let princesspeachFinal = (princesspeachSell * princesspeach);
	let hardappleciderFinal = (hardappleciderSell * hardapplecider);
	let reddeadFinal = (reddeadSell * reddead);
	let guantletFinal = (guantletSell * guantlet);
	let strawberryFinal = (strawberrySell * strawberry);
	let chocolateFinal = (chocolateSell * chocolate);
	let cherrybeerFinal = (cherrybeerSell * cherrybeer);
	let cokefloatFinal = (cokefloatSell * cokefloat);
	let samplerFinal = (samplerSell * sampler);
	let moomunchFinal = (moomunchSell * moomunch);
	let nachodeluxeFinal = (nachodeluxeSell * nachodeluxe);
	let bonanzaFinal = (bonanzaSell * bonanza);
	let applepieFinal = (applepieSell * applepie);
	let thevirginFinal = (thevirginSell * thevirgin);
	let thecartelFinal = (thecartelSell * thecartel);
	let annoyingorangeFinal = (annoyingorangeSell * annoyingorange);
	let antiemsFinal = (antiemsSell * antiems);
	let newzealandFinal = (newzealandSell * newzealand);
	let glizzywaterFinal = (glizzywaterSell * glizzywater);

	/// Profit calculations
	let zpillProfit = (zpillSell - zpillCost) * zpill;
	let zpillsmallProfit = (zpillsmallSell - zpillsmallCost) * zpillsmall;
	let zpillpartyProfit = (zpillpartySell - zpillpartyCost) * zpillparty;
	let arenapillProfit = (arenapillSell - arenapillCost) * arenapill;
	let arenasmallProfit = (arenasmallSell - arenasmallCost) * arenasmall;
	let arenapartyProfit = (arenapartySell - arenapartyCost) * arenaparty;
	let hotdogProfit = (hotdogSell - hotdogCost) * hotdog;
	let nachosProfit = (nachosSell - nachosCost) * nachos;
	let wonderwaffleProfit = (wonderwaffleSell - wonderwaffleCost) * wonderwaffle;
	let waterProfit = (waterSell - waterCost) * water;
	let sodaProfit = (sodaSell - sodaCost) * soda;
	let milkProfit = (milkSell - milkCost) * milk;
	let pacmanProfit = (pacmanSell - pacmanCost) * pacman;
	let monkeyparadiseProfit = (monkeyparadiseSell - monkeyparadiseCost) * monkeyparadise;
	let princesspeachProfit = (princesspeachSell - princesspeachCost) * princesspeach;
	let hardappleciderProfit = (hardappleciderSell - hardappleciderCost) * hardapplecider;
	let reddeadProfit = (reddeadSell - reddeadCost) * reddead;
	let guantletProfit = (guantletSell - guantletCost) * guantlet;
	let strawberryProfit = (strawberrySell - strawberryCost) * strawberry;
	let chocolateProfit = (chocolateSell - chocolateCost) * chocolate;
	let cherrybeerProfit = (cherrybeerSell - cherrybeerCost) * cherrybeer;
	let cokefloatProfit = (cokefloatSell - cokefloatCost) * cokefloat;
	let samplerProfit = (samplerSell - samplerCost) * sampler;
	let moomunchProfit = (moomunchSell - moomunchCost) * moomunch;
	let nachodeluxeProfit = (nachodeluxeSell - nachodeluxeCost) * nachodeluxe;
	let bonanzaProfit = (bonanzaSell - bonanzaCost) * bonanza;
	let applepieProfit = (applepieSell - applepieCost) * applepie;
	let thevirginProfit = (thevirginSell - thevirginCost) * thevirgin;
	let thecartelProfit = (thecartelSell - thecartelCost) * thecartel;
	let annoyingorangeProfit = (annoyingorangeSell - annoyingorangeCost) * annoyingorange;
	let antiemsProfit = (antiemsSell - antiemsCost) * antiems;
	let newzealandProfit = (newzealandSell - newzealandCost) * newzealand;
	let glizzywaterProfit = (glizzywaterSell - glizzywaterCost) * glizzywater;

	/// Calculate total price
	let totalprice = (zpillFinal + zpillsmallFinal + zpillpartyFinal + arenapillFinal + arenasmallFinal + arenapartyFinal + hotdogFinal + nachosFinal + 
		wonderwaffleFinal + waterFinal + sodaFinal + milkFinal + pacmanFinal + monkeyparadiseFinal + princesspeachFinal +
		hardappleciderFinal + reddeadFinal + guantletFinal + strawberryFinal + chocolateFinal + cherrybeerFinal + 
		cokefloatFinal + samplerFinal + moomunchFinal + nachodeluxeFinal + bonanzaFinal + applepieFinal + thevirginFinal +
		thecartelFinal + annoyingorangeFinal + antiemsFinal + newzealandFinal + glizzywaterFinal);

	/// Calculate Profit
	let totalProfit = (zpillProfit + zpillsmallProfit + zpillpartyProfit + arenapillProfit + arenasmallProfit + arenapartyProfit + hotdogProfit + nachosProfit + 
		wonderwaffleProfit + waterProfit + sodaProfit + milkProfit + pacmanProfit + monkeyparadiseProfit + princesspeachProfit +
		hardappleciderProfit + reddeadProfit + guantletProfit + strawberryProfit + chocolateProfit + cherrybeerProfit + 
		cokefloatProfit + samplerProfit + moomunchProfit + nachodeluxeProfit + bonanzaProfit + applepieProfit + thevirginProfit +
		thecartelProfit + annoyingorangeProfit + antiemsProfit + newzealandProfit + glizzywaterProfit);


	/// Print out text
	buffer.push('Sale Prices:');
	buffer.push('');
	if (zpill) buffer.push(`Zombie VR: $${zpillFinal} - ${zpill}`);
	if (zpillsmall) buffer.push(`Zombie VR Small: $${zpillsmallFinal} - ${zpillsmall}`);
	if (zpillparty) buffer.push(`Zombie VR Party: $${zpillpartyFinal} - ${zpillsmall}`);
	if (arenapill) buffer.push(`Arena VR: $${arenapillFinal} - ${arenapill}`);
	if (arenasmall) buffer.push(`Arena VR Small: $${arenasmallFinal} - ${arenasmall}`);
	if (arenaparty) buffer.push(`Arena VR Party: $${arenapartyFinal} - ${arenaparty}`);
	if (hotdog) buffer.push(`Hotdogs: $${hotdogFinal} - ${hotdog}`);
	if (nachos) buffer.push(`Nachos: $${nachosFinal} - ${nachos}`);
	if (wonderwaffle) buffer.push(`Wonder Waffles: $${wonderwaffleFinal} - ${wonderwaffle}`);
	if (water) buffer.push(`Water: $${waterFinal} - ${water}`);
	if (soda) buffer.push(`Coke / Pepsi: $${sodaFinal} - ${soda}`);
	if (milk) buffer.push(`Pigeon Milk: $${milkFinal} - ${milk}`);
	if (pacman) buffer.push(`Pac Man: $${pacmanFinal} - ${pacman}`);
	if (monkeyparadise) buffer.push(`Monkey's Paradise: $${monkeyparadiseFinal} - ${monkeyparadise}`);
	if (princesspeach) buffer.push(`Princess Peach: $${princesspeachFinal} - ${princesspeach}`);
	if (hardapplecider) buffer.push(`Ty's Hard Apple Cider: $${hardappleciderFinal} - ${hardapplecider}`);
	if (reddead) buffer.push(`Red Dead: $${reddeadFinal} - ${reddead}`);
	if (guantlet) buffer.push(`Guantlet: $${guantletFinal} - ${guantlet}`);
	if (strawberry) buffer.push(`Strawberry Smoothie: $${strawberryFinal} - ${strawberry}`);
	if (chocolate) buffer.push(`Chocolate Smoothie: $${chocolateFinal} - ${chocolate}`);
	if (cherrybeer) buffer.push(`Cherry Beer: $${cherrybeerFinal} - ${cherrybeer}`);
	if (cokefloat) buffer.push(`Coke Float: $${cokefloatFinal} - ${cokefloat}`);
	if (sampler) buffer.push(`Sampler: $${samplerFinal} - ${sampler}`);
	if (moomunch) buffer.push(`Moo Munch Combo: $${moomunchFinal} - ${moomunch}`);
	if (nachodeluxe) buffer.push(`Nacho Deluxe Meal: $${nachodeluxeFinal} - ${nachodeluxe}`);
	if (bonanza) buffer.push(`Crunch 'n Quench Bonanza: $${bonanzaFinal} - ${bonanza}`);
	if (applepie) buffer.push(`Apple Pie: $${applepieFinal} - ${applepie}`);
	if (thevirgin) buffer.push(`The Virgin: $${thevirginFinal} - ${thevirgin}`);
	if (thecartel) buffer.push(`The Cartel: $${thecartelFinal} - ${thecartel}`);
	if (annoyingorange) buffer.push(`Annoying Orange: $${annoyingorangeFinal} - ${annoyingorange}`);
	if (antiems) buffer.push(`Anti-EMS Smoothie: $${antiemsFinal} - ${antiems}`);
	if (newzealand) buffer.push(`New Zealand Special: $${newzealandFinal} - ${newzealand}`);
	if (glizzywater) buffer.push(`Glizzy Water Special: $${glizzywaterFinal} - ${glizzywater}`);
	
	buffer.push('');
	buffer.push(`Total Price: $${totalprice}`);
	buffer.push('');
	buffer.push(`Total Profit Made: $${totalProfit}`);

	/// Return it to HTML page
	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

function Ingredients() {
	const ind = "        ";
	buffer = [];

	/// Recipes
	let pacmanRecipe = ("2x Cherry, 1x Strawberry, 1x Peach, 1x Apple");
	let monkeyparadiseRecipe = ("3x Banana, 1x Watermelon, 1x Strawberry");
	let princesspeachRecipe = ("3x Peach, 1x Mango, x1 Orange");
	let hardappleciderRecipe = ("4x Apple, 1x Cider");
	let reddeadRecipe = ("1x Apple, 1x Cherry, 1x Strawberry, 1x Pomegranate, 1x Beer");
	let guantletRecipe = ("4x random assortment, 1x Cider");
	let strawberryRecipe = ("4x Strawberry, 1x Pigeon Milk");
	let chocolateRecipe = ("4x Cocoa Powder, 1x Pigeon Milk");
	let cherrybeerRecipe = ("3x Cherry, 1x Pigeon Milk, 1x Beer");
	let cokefloatRecipe = ("4x Coke, 1x Pigeon Milk");
	let samplerRecipe = ("1x Hotdog, 1x Nacho, 1x Wonder Waffle & 2x Water OR 2x Soft Drink");
	let moomunchRecipe = ("1x Pigeon Milk, 1x Wonder Waffle, 1x Nachos, 1x Hot Dog");
	let nachodeluxeRecipe = ("4x Nachos & 4x Soft Drink");
	let bonanzaRecipe = ("2x Nachos, 2x Hot Dogs, 2x Wonder Waffles & 2x Soft Drink");
	let applepieRecipe = ("3x Apple, 2x Waffle");
	let thevirginRecipe = ("5x Cherry");
	let thecartelRecipe = ("5x Nacho");
	let annoyingorangeRecipe = ("3x Orange, 2x Apple");
	let antiemsRecipe = ("5x Apple");
	let newzealandRecipe = ("5x Kiwi");
	let glizzywaterRecipe = ("3x Hotdog, 2x Water");

	let pacman = document.getElementById('pacman').value;
	let monkeyparadise = document.getElementById('monkeyparadise').value;
	let princesspeach = document.getElementById('princesspeach').value;
	let hardapplecider = document.getElementById('hardapplecider').value;
	let reddead = document.getElementById('reddead').value;
	let guantlet = document.getElementById('guantlet').value;

	let strawberry = document.getElementById('strawberry').value;
	let chocolate = document.getElementById('chocolate').value;
	let cherrybeer = document.getElementById('cherrybeer').value;
	let cokefloat = document.getElementById('cokefloat').value;

	let sampler = document.getElementById('sampler').value;
	let moomunch = document.getElementById('moomunch').value;
	let nachodeluxe = document.getElementById('nachodeluxe').value;
	let bonanza = document.getElementById('bonanza').value;

	let applepie = document.getElementById('applepie').value;
	let thevirgin = document.getElementById('thevirgin').value;
	let thecartel = document.getElementById('thecartel').value;
	let annoyingorange = document.getElementById('annoyingorange').value;
	let antiems = document.getElementById('antiems').value;
	let newzealand = document.getElementById('newzealand').value;
	let glizzywater = document.getElementById('glizzywater').value;

	if (pacman) buffer.push(`Pac Man: ${pacmanRecipe}`);
	if (monkeyparadise) buffer.push(`Monkey's Paradise: ${monkeyparadiseRecipe}`);
	if (princesspeach) buffer.push(`Princess Peach: ${princesspeachRecipe}`);
	if (hardapplecider) buffer.push(`Ty's Hard Apple Cider: ${hardappleciderRecipe}`);
	if (reddead) buffer.push(`Red Dead: ${reddeadRecipe}`);
	if (guantlet) buffer.push(`Guantlet: ${guantletRecipe}`);
	if (strawberry) buffer.push(`Strawberry: ${strawberryRecipe}`);
	if (chocolate) buffer.push(`Chocolate: ${chocolateRecipe}`);
	if (cherrybeer) buffer.push(`Cherry Beer: ${cherrybeerRecipe}`);
	if (cokefloat) buffer.push(`Coke Float: ${cokefloatRecipe}`);
	if (sampler) buffer.push(`Sampler: ${samplerRecipe}`);
	if (moomunch) buffer.push(`Moo Munch Combo: ${moomunchRecipe}`);
	if (nachodeluxe) buffer.push(`Nacho Deluxe Meal: ${nachodeluxeRecipe}`);
	if (bonanza) buffer.push(`Crunch 'n Quench Bonanza: ${bonanzaRecipe}`);
	if (applepie) buffer.push(`Apple Pie: ${applepieRecipe}`);
	if (thevirgin) buffer.push(`The Virgin: ${thevirginRecipe}`);
	if (thecartel) buffer.push(`The Cartel: ${thecartelRecipe}`);
	if (annoyingorange) buffer.push(`Annoying Orange: ${annoyingorangeRecipe}`);
	if (antiems) buffer.push(`Anti-EMS Smoothie: ${antiemsRecipe}`);
	if (newzealand) buffer.push(`New Zealand Special: ${newzealandRecipe}`);
	if (glizzywater) buffer.push(`Glizzy Water Special: ${glizzywaterRecipe}`);

	return document.getElementById('reportBody2').innerHTML = buffer.join("\n");
}
/// Allow inputs from webpage
let inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="emerald"] textarea');
inputs.forEach(i => i.addEventListener('keyup', report, false));
let inputs2 = document.querySelectorAll('input[type="text"], input[type="number"], input[type="emerald"] textarea');
inputs.forEach(i => i.addEventListener('keyup', Ingredients, false));
/// Allow checkboxes from webpage
let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', report, false));
let checkboxes2 = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', Ingredients, false));
/// Allow select options
let selectOptions = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', report, false));
let selectOptions2 = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', Ingredients, false));
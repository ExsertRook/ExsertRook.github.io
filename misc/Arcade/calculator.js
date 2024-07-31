'use strict';

let buffer = [];

function report() {
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');
    buffer = []

	/// Pull from HTML
	let zpill = document.getElementById('zpill').value;
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
	let zpillSell = 1200
	let arenapillSell = 350
	let arenasmallSell = 1600
	let arenapartySell = 3000

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
	let totalprice = (zpillFinal + arenapillFinal + arenasmallFinal + arenapartyFinal + hotdogFinal + nachosFinal + 
		wonderwaffleFinal + waterFinal + sodaFinal + milkFinal + pacmanFinal + monkeyparadiseFinal + princesspeachFinal +
		hardappleciderFinal + reddeadFinal + guantletFinal + strawberryFinal + chocolateFinal + cherrybeerFinal + 
		cokefloatFinal + samplerFinal + moomunchFinal + nachodeluxeFinal + bonanzaFinal + applepieFinal + thevirginFinal +
		thecartelFinal + annoyingorangeFinal + antiemsFinal + newzealandFinal + glizzywaterFinal);

	/// Print out text
	buffer.push('Sale Prices:');
	buffer.push('');
	if (zpill) buffer.push(`Zombie VR: $${zpillFinal}`);
	if (arenapill) buffer.push(`Arena VR: $${arenapillFinal}`);
	if (arenasmall) buffer.push(`Arena VR Small: $${arenasmallFinal}`);
	if (arenaparty) buffer.push(`Arena VR Party: $${arenapartyFinal}`);
	if (hotdog) buffer.push(`Hotdogs: $${hotdogFinal}`);
	if (nachos) buffer.push(`Nachos: $${nachosFinal}`);
	if (wonderwaffle) buffer.push(`Wonder Waffles: $${wonderwaffleFinal}`);
	if (water) buffer.push(`Water: $${waterFinal}`);
	if (soda) buffer.push(`Coke / Pepsi: $${sodaFinal}`);
	if (milk) buffer.push(`Pigeon Milk: $${milkFinal}`);
	if (pacman) buffer.push(`Pac Man: $${pacmanFinal}`);
	if (monkeyparadise) buffer.push(`Monkey's Paradise: $${monkeyparadiseFinal}`);
	if (princesspeach) buffer.push(`Princess Peach: $${princesspeachFinal}`);
	if (hardapplecider) buffer.push(`Ty's Hard Apple Cider: $${hardappleciderFinal}`);
	if (reddead) buffer.push(`Red Dead: $${reddeadFinal}`);
	if (guantlet) buffer.push(`Guantlet: $${guantletFinal}`);
	if (strawberry) buffer.push(`Strawberry Smoothie: $${strawberryFinal}`);
	if (chocolate) buffer.push(`Chocolate Smoothie: $${chocolateFinal}`);
	if (cherrybeer) buffer.push(`Cherry Beer: $${cherrybeerFinal}`);
	if (cokefloat) buffer.push(`Coke Float: $${cokefloatFinal}`);
	if (sampler) buffer.push(`Sampler: $${samplerFinal}`);
	if (moomunch) buffer.push(`Moo Munch Combo: $${moomunchFinal}`);
	if (nachodeluxe) buffer.push(`Nacho Deluxe Meal: $${nachodeluxeFinal}`);
	if (bonanza) buffer.push(`Crunch 'n Quench Bonanza: $${bonanzaFinal}`);
	if (applepie) buffer.push(`Apple Pie: $${applepieFinal}`);
	if (thevirgin) buffer.push(`The Virgin: $${thevirginFinal}`);
	if (thecartel) buffer.push(`The Cartel: $${thecartelFinal}`);
	if (annoyingorange) buffer.push(`Annoying Orange: $${annoyingorangeFinal}`);
	if (antiems) buffer.push(`Anti-EMS Smoothie: $${antiemsFinal}`);
	if (newzealand) buffer.push(`New Zealand Special: $${newzealandFinal}`);
	if (glizzywater) buffer.push(`Glizzy Water Special: $${glizzywaterFinal}`);
	
	buffer.push('');
	buffer.push(`Total Price: $${totalprice}`);
	/// Return it to HTML page
	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}
/// Allow inputs from webpage
let inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="emerald"] textarea');
inputs.forEach(i => i.addEventListener('keyup', report, false));
/// Allow checkboxes from webpage
let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', report, false));
/// Allow select options
let selectOptions = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', report, false));
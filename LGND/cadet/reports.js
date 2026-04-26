'use strict';

let buffer = [];
let officersInvolved = new Set();
let alreadySpecifiedRobbery = false;
let ROBBERY_STATE = 'JEWLERY';

function report() {
	let callsign = document.getElementById('yourself').value.trim();
	if (!callsign) callsign = '[Insert Callsign]';
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');

	buffer = [];
	buffer.push("**[TRAINING OFFICER]:**");
	buffer.push(callsign);
	buffer.push(``);
	/// INFO
	let cadetname = document.getElementById('cadet').value;
	let phase = document.getElementById('phase').value;
	let timestart = document.getElementById('timestart').value;
	let timeend = document.getElementById('timeend').value;

	let notes = document.getElementById('notes').value;
	let patrolwork = document.getElementById('patrolwork').value;

	if (cadetname) {
		buffer.push(`**[CADET]:**`);
		buffer.push(`${cadetname}`);
		buffer.push(``);
	}
	if (phase) { 
		buffer.push(`**Phase:** ${phase}`);
		buffer.push(``);
	}
	let startHammer = document.getElementById('timestart_hammer').value;
	let endHammer   = document.getElementById('timeend_hammer').value;

	if (startHammer) buffer.push(`**Patrol Start (Hammertime):** ${startHammer}`);
	if (endHammer)   buffer.push(`**Patrol End (Hammertime):** ${endHammer}`);

	let activities = JSON.parse(document.getElementById("activitiesList").value || "[]");

	if (activities.length > 0) {
		buffer.push("**Activities Completed:**");
		activities.forEach(a => buffer.push(`• ${a}`));
		buffer.push("");
	}
	
	buffer.push(``);
	if (notes) {
		buffer.push(`**Notes/Observations:**`);
		buffer.push(`${notes}`);
		buffer.push(``);
	}
	
	if (patrolwork) {
		buffer.push(`Overall the cadet did ${patrolwork} while being on duty.`)
		buffer.push(``);
	}
	
	if (document.getElementById('cadetlogger').checked) {
		buffer.push(`**Cadet Logger - Updated**`);
	} else {
		buffer.push(`**Cadet Logger - Not Updated**`);
	}
	
	return document.getElementById('reportBody').innerHTML = buffer.join("\n");

}
let inputs = document.querySelectorAll('input[type="text"], input[type="text2"], input[type="number"], textarea');
inputs.forEach(i => i.addEventListener('keyup', report, false));

let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', report, false));

let selectOptions = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', report, false));

function loadName() {
	let callsign = '';
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

document.addEventListener("DOMContentLoaded", () => {
    loadName();
    setupRosterPopup();
	setupCadetPopup(); 
	setupPhasePopup();
	setupTimePopup();
	setupActivityPopup();
});

function setupRosterPopup() {
    const yourselfInput = document.getElementById("yourself");
    const rosterDatalist = document.getElementById("roster");
    const rosterModal = document.getElementById("rosterModal");
    const rosterList = document.getElementById("rosterList");
    const rosterSearch = document.getElementById("rosterSearch");

    if (!yourselfInput || !rosterDatalist) return;

    // Build array from existing datalist options
    const rosterEntries = Array.from(rosterDatalist.options).map(o => o.value);

    function renderRoster(filter = "") {
        rosterList.innerHTML = "";
        const lower = filter.toLowerCase();
        rosterEntries
            .filter(v => v.toLowerCase().includes(lower))
            .forEach(v => {
                const div = document.createElement("div");
                div.className = "roster-item";
                div.textContent = v;
                div.addEventListener("click", () => {
                    yourselfInput.value = v;
                    rosterModal.style.display = "none";
                    report();
                });
                rosterList.appendChild(div);
            });
    }

    yourselfInput.addEventListener("click", () => {
        rosterModal.style.display = "block";
        rosterSearch.value = "";
        renderRoster();
        rosterSearch.focus();
    });

    rosterSearch.addEventListener("input", () => {
        renderRoster(rosterSearch.value);
    });

    window.addEventListener("click", (e) => {
        if (e.target === rosterModal) {
            rosterModal.style.display = "none";
        }
    });
}
function setupCadetPopup() {
    const cadetInput = document.getElementById("cadet");
    const cadetDatalist = document.getElementById("cadetroster");
    const cadetModal = document.getElementById("cadetModal");
    const cadetList = document.getElementById("cadetList");
    const cadetSearch = document.getElementById("cadetSearch");

    if (!cadetInput || !cadetDatalist) return;

    // Build array from existing datalist options
    const cadetEntries = Array.from(cadetDatalist.options).map(o => o.value);

    function renderCadets(filter = "") {
        cadetList.innerHTML = "";
        const lower = filter.toLowerCase();
        cadetEntries
            .filter(v => v.toLowerCase().includes(lower))
            .forEach(v => {
                const div = document.createElement("div");
                div.className = "roster-item";
                div.textContent = v;
                div.addEventListener("click", () => {
                    cadetInput.value = v;
                    cadetModal.style.display = "none";
                    report();
                });
                cadetList.appendChild(div);
            });
    }

    cadetInput.addEventListener("click", () => {
        cadetModal.style.display = "block";
        cadetSearch.value = "";
        renderCadets();
        cadetSearch.focus();
    });

    cadetSearch.addEventListener("input", () => {
        renderCadets(cadetSearch.value);
    });

    window.addEventListener("click", (e) => {
        if (e.target === cadetModal) {
            cadetModal.style.display = "none";
        }
    });
}

function setupPhasePopup() {
    const phaseButton = document.getElementById("phaseButton");
    const phaseHidden = document.getElementById("phase");
    const phaseModal = document.getElementById("phaseModal");
    const phaseItems = document.querySelectorAll(".phase-item");

    // Open popup when clicking the button
    phaseButton.addEventListener("click", () => {
        phaseModal.style.display = "block";
    });

    // Handle clicking a phase option
    phaseItems.forEach(item => {
        item.addEventListener("click", () => {
            const selected = item.dataset.phase;

            // Update hidden input
            phaseHidden.value = selected;

            // Update button text
            phaseButton.textContent = `Phase ${selected}`;

            // Close popup
            phaseModal.style.display = "none";

            // Update report
            report();
        });
    });

    // Close when clicking outside modal
    window.addEventListener("click", (e) => {
        if (e.target === phaseModal) {
            phaseModal.style.display = "none";
        }
    });
}

function convertToUnix(timeStr) {
    if (!timeStr) return null;

    const [hours, minutes] = timeStr.split(":").map(Number);

    const now = new Date();
    now.setHours(hours, minutes, 0, 0);

    return Math.floor(now.getTime() / 1000);
}

function insertHammertime(type) {
    const timeInput = document.getElementById(type === "start" ? "timestart" : "timeend").value;
    const unix = convertToUnix(timeInput);

    if (!unix) return;

    const hammer = `<t:${unix}:t>`;

    // Insert into report
    buffer.push(`**${type === "start" ? "Patrol Start" : "Patrol End"} (Hammertime):** ${hammer}`);
    document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

document.getElementById("startHammer").addEventListener("click", () => {
    insertHammertime("start");
});

document.getElementById("endHammer").addEventListener("click", () => {
    insertHammertime("end");
});

function setupTimePopup() {
    let activeField = null; // "timestart" or "timeend"

    const timeModal   = document.getElementById("timeModal");
    const hourInput   = document.getElementById("timeHour");
    const minuteInput = document.getElementById("timeMinute");
    const periodInput = document.getElementById("timePeriod");
    const confirmBtn  = document.getElementById("confirmTime");

    const startBtn = document.getElementById("startTimeButton");
    const endBtn   = document.getElementById("endTimeButton");

    const startHidden      = document.getElementById("timestart");
    const endHidden        = document.getElementById("timeend");
    const startHammerField = document.getElementById("timestart_hammer");
    const endHammerField   = document.getElementById("timeend_hammer");

    if (!timeModal || !hourInput || !minuteInput || !periodInput ||
        !confirmBtn || !startBtn || !endBtn ||
        !startHidden || !endHidden || !startHammerField || !endHammerField) {
        return;
    }

    startBtn.addEventListener("click", () => {
        activeField = "timestart";
        hourInput.value = "";
        minuteInput.value = "";
        periodInput.value = "AM";
        timeModal.style.display = "block";
    });

    endBtn.addEventListener("click", () => {
        activeField = "timeend";
        hourInput.value = "";
        minuteInput.value = "";
        periodInput.value = "AM";
        timeModal.style.display = "block";
    });

    confirmBtn.addEventListener("click", () => {
        let h12    = parseInt(hourInput.value);
        let m      = parseInt(minuteInput.value);
        let period = periodInput.value;

        if (isNaN(h12) || isNaN(m) || h12 < 1 || h12 > 12 || m < 0 || m > 59) {
            alert("Please enter a valid time.");
            return;
        }

        // Convert to 24h
        let h24 = h12;
        if (period === "PM" && h12 !== 12) h24 = h12 + 12;
        if (period === "AM" && h12 === 12) h24 = 0;

        const formatted24 = `${String(h24).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
        const displayText = `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;

        // Store 24h time in hidden field + update button text
        if (activeField === "timestart") {
            startHidden.value = formatted24;
            startBtn.textContent = displayText;
        } else if (activeField === "timeend") {
            endHidden.value = formatted24;
            endBtn.textContent = displayText;
        } else {
            return; // safety
        }

        // Build Hammertime
        const now = new Date();
        now.setHours(h24, m, 0, 0);
        const unix   = Math.floor(now.getTime() / 1000);
        const hammer = `<t:${unix}:F>`;

        if (activeField === "timestart") {
            startHammerField.value = hammer;
        } else {
            endHammerField.value = hammer;
        }

        timeModal.style.display = "none";
        report();
    });

    // Close when clicking outside modal
    window.addEventListener("click", (e) => {
        if (e.target === timeModal) {
            timeModal.style.display = "none";
        }
    });
	hourInput.addEventListener("input", () => {
    // If user enters an hour but minute field is empty, auto-fill minutes to 00
    if (hourInput.value !== "" && minuteInput.value === "") {
        minuteInput.value = "00";
    }
	});
	hourInput.addEventListener("blur", () => {
    let h = parseInt(hourInput.value);

    if (isNaN(h)) return;

    if (h < 1) h = 1;
    if (h > 12) h = 12;

    hourInput.value = h;
	});
	minuteInput.addEventListener("blur", () => {
    let m = parseInt(minuteInput.value);

    if (isNaN(m)) return;

    if (m < 0) m = 0;
    if (m > 59) m = 59;

    minuteInput.value = String(m).padStart(2, "0");
	});
}

function setupActivityPopup() {
    const modal = document.getElementById("activityModal");
    const addBtn = document.getElementById("addActivityButton");
    const activityListDiv = document.getElementById("activityList");
    const tabs = document.querySelectorAll(".activity-tab");
    const activitiesField = document.getElementById("activitiesList");

    // Activity data
    const activities = {
        1: [
            "Observation Hour — 1st Hour",
            "Observation Hour — 2nd Hour",
            "Observation Hour — 3rd Hour",
            "Observation Hour — 4th Hour",
            "Observation Hour — 5th Hour"
        ],
        2: [
            "MDT",
            "DOJ",
            "APUTT"
        ],
        3: [
            "10-80 Comms",
            "10-90 Negotiation",
            "Written Incident Report",
            "Suspect Processing",
            "10-80 Positions — 1st",
            "10-80 Positions — 2nd",
            "10-80 Positions — 3rd",
            "10-80 Positions — 4th",
            "10-11 Traffic Stop",
            "PIT",
            "Code 5"
        ]
    };

    // Open popup
    addBtn.addEventListener("click", () => {
        modal.style.display = "block";
        loadActivities(1);
    });

    // Load activities for selected phase
    function loadActivities(phase) {
        activityListDiv.innerHTML = "";

        activities[phase].forEach(act => {
            const btn = document.createElement("button");
            btn.textContent = act;
            btn.className = "btn";
            btn.style.margin = "5px 0";
            btn.addEventListener("click", () => addActivity(act));
            activityListDiv.appendChild(btn);
        });
		

    }

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            loadActivities(tab.dataset.phase);
        });
    });

    // Add activity to list + update report
    function addActivity(activity) {
        let list = JSON.parse(activitiesField.value || "[]");
        list.push(activity);
        activitiesField.value = JSON.stringify(list);

        modal.style.display = "none";
        report();
    }

    // Close when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

	const customModal = document.getElementById("customActivityModal");
	const customInput = document.getElementById("customActivityInput");
	const addCustomBtn = document.getElementById("addCustomActivityBtn");
	const cancelCustomBtn = document.getElementById("cancelCustomActivityBtn");

	// Open custom activity popup
	function openCustomActivityPopup() {
		customInput.value = "";
		customModal.style.display = "block";
	}

	// Add custom activity
	addCustomBtn.addEventListener("click", () => {
		const value = customInput.value.trim();
		if (value === "") return;

		let list = JSON.parse(activitiesField.value || "[]");
		list.push(value);
		activitiesField.value = JSON.stringify(list);

		customModal.style.display = "none";
		modal.style.display = "none";
		report();
	});

	// Cancel custom activity
	cancelCustomBtn.addEventListener("click", () => {
		customModal.style.display = "none";
	});

	// Close when clicking outside
	window.addEventListener("click", (e) => {
		if (e.target === customModal) customModal.style.display = "none";
	});
	const customActivityButton = document.getElementById("customActivityButton");

	customActivityButton.addEventListener("click", () => {
		customInput.value = "";
		customModal.style.display = "block";
	});
}


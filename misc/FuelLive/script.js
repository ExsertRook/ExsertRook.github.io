let watchId = null;
let lastPosition = null;

let totalDistance = 0;
let totalFuel = 0;
let totalCost = 0;

const distanceEl = document.getElementById("distance");
const fuelUsedEl = document.getElementById("fuelUsed");
const costEl = document.getElementById("cost");

const hudCost = document.getElementById("hudCost");
const hudFuel = document.getElementById("hudFuel");
const hudDistance = document.getElementById("hudDistance");

const startStopBtn = document.getElementById("startStopBtn");
const verticalView = document.getElementById("verticalView");
const horizontalHUD = document.getElementById("horizontalHUD");

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat/2)**2 +
        Math.cos(lat1 * Math.PI/180) *
        Math.cos(lat2 * Math.PI/180) *
        Math.sin(dLon/2)**2;

    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function updateStats() {
    distanceEl.textContent = totalDistance.toFixed(2) + " km";
    fuelUsedEl.textContent = totalFuel.toFixed(2) + " L";
    costEl.textContent = "€" + totalCost.toFixed(2);

    hudCost.textContent = "€" + totalCost.toFixed(2);
    hudFuel.textContent = totalFuel.toFixed(2) + " L";
    hudDistance.textContent = totalDistance.toFixed(2) + " km";
}

function startTracking() {
    const fuelPrice = parseFloat(document.getElementById("fuelPrice").value);
    const consumption = parseFloat(document.getElementById("consumption").value);

    if (!fuelPrice || !consumption) {
        alert("Enter fuel price and consumption first");
        return;
    }

    startStopBtn.textContent = "Stop Trip";

    watchId = navigator.geolocation.watchPosition(pos => {
        const { latitude, longitude } = pos.coords;

        if (lastPosition) {
            const dist = calculateDistance(
                lastPosition.lat,
                lastPosition.lon,
                latitude,
                longitude
            );

            totalDistance += dist;
            totalFuel = (totalDistance * consumption) / 100;
            totalCost = totalFuel * fuelPrice;

            updateStats();
        }

        lastPosition = { lat: latitude, lon: longitude };
    }, err => {
        alert("GPS error: " + err.message);
    }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
    });
}

function stopTracking() {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    lastPosition = null;
    startStopBtn.textContent = "Start Trip";
}

startStopBtn.addEventListener("click", () => {
    if (watchId === null) {
        totalDistance = 0;
        totalFuel = 0;
        totalCost = 0;
        updateStats();
        startTracking();
    } else {
        stopTracking();
    }
});

/* ORIENTATION HANDLING */
function handleOrientation() {
    if (window.innerWidth > window.innerHeight) {
        verticalView.style.display = "none";
        horizontalHUD.style.display = "flex";
    } else {
        verticalView.style.display = "block";
        horizontalHUD.style.display = "none";
    }
}

window.addEventListener("resize", handleOrientation);
handleOrientation();

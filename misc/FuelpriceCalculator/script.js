document.getElementById("calculateBtn").addEventListener("click", () => {
    const distance = parseFloat(document.getElementById("distance").value);
    const efficiency = parseFloat(document.getElementById("efficiency").value);

    const dropdownPrice = parseFloat(document.getElementById("fuelPriceSelect").value);
    const customPrice = parseFloat(document.getElementById("customPrice").value);

    const fuelPrice = customPrice || dropdownPrice;

    if (!distance || !efficiency || !fuelPrice) {
        showPopup("Please fill in all fields.");
        return;
    }

    const litersNeeded = (distance / 100) * efficiency;
    const totalCost = litersNeeded * fuelPrice;

    const message = `This trip will require ${litersNeeded.toFixed(2)} liters of fuel, 
    which amounts to a total price of €${totalCost.toFixed(2)}.`;

    showPopup(message);
});

function showPopup(text) {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");

    document.getElementById("popupText").innerText = text;

    popup.classList.add("show");
    overlay.classList.add("show");

    // Close when clicking outside the popup
    overlay.onclick = () => {
        popup.classList.remove("show");
        overlay.classList.remove("show");
    };
}

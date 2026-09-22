// Kogu andmebaas mugavalt ühes kohas muutmiseks
const KOHANDATAVAD_ANDMED = {
    suurused: {
        "XS": { k: 8, l: 17, s: 50 },
        "S":  { k: 10, l: 38, s: 60 },
        "M":  { k: 19, l: 39, s: 60 },
        "L":  { k: 37, l: 38, s: 60 },
        "XL": { k: 65, l: 35, s: 60 },
        "QS": { k: 20, l: 16, s: 60 },
        "QM": { k: 40, l: 16, s: 60 }
    },
    ettevõtted: {
        omniva: {
            nimi: "Omniva",
            hinnad: { "XS": null, "S": 3.56, "M": 4.94, "L": 5.65, "XL": null, "QS": null, "QM": null },
            mootmed: { "XS": "", "S": "9x38x64 cm", "M": "19x38x64 cm", "L": "39x38x64 cm", "XL": "", "QS": "", "QM": "" },
            parsedMootmed: { "S": {k: 9, l: 38, s: 64}, "M": {k: 19, l: 38, s: 64}, "L": {k: 39, l: 38, s: 64} }
        },
        smartpost: {
            nimi: "Smartpost",
            hinnad: { "XS": 2.90, "S": 3.34, "M": 4.46, "L": 5.47, "XL": 7.26, "QS": null, "QM": null },
            mootmed: { "XS": "5x34x42 cm", "S": "12x34x42 cm", "M": "20x34x42 cm", "L": "34x36x42 cm", "XL": "60x36x60 cm", "QS": "", "QM": "" },
            parsedMootmed: { "XS": {k: 5, l: 34, s: 42}, "S": {k: 12, l: 34, s: 42}, "M": {k: 20, l: 34, s: 42}, "L": {k: 34, l: 36, s: 42}, "XL": {k: 60, l: 36, s: 60} }
        },
        dpd: {
            nimi: "DPD",
            hinnad: { "XS": 2.63, "S": 3.04, "M": 4.45, "L": 5.44, "XL": null, "QS": null, "QM": null },
            mootmed: { "XS": "8x18x61 cm", "S": "8x43x61 cm", "M": "17x43x61 cm", "L": "36x43x61 cm", "XL": "", "QS": "", "QM": "" },
            parsedMootmed: { "XS": {k: 8, l: 18, s: 61}, "S": {k: 8, l: 43, s: 61}, "M": {k: 17, l: 43, s: 61}, "L": {k: 36, l: 43, s: 61} }
        },
        venipak: {
            nimi: "Venipak",
            hinnad: { "XS": 2.05, "S": 2.47, "M": 3.41, "L": 4.40, "XL": null, "QS": 2.47, "QM": 3.41 },
            mootmed: { "XS": "9x16x61 cm", "S": "9x39x61 cm", "M": "20x39x61 cm", "L": "40x39x61 cm", "XL": "", "QS": "20x16x60 cm", "QM": "40x16x60 cm" },
            parsedMootmed: { "XS": {k: 9, l: 16, s: 61}, "S": {k: 9, l: 39, s: 61}, "M": {k: 20, l: 39, s: 61}, "L": {k: 40, l: 39, s: 61}, "QS": {k: 20, l: 16, s: 60}, "QM": {k: 40, l: 16, s: 60} }
        },
        unisend: {
            nimi: "Unisend",
            hinnad: { "XS": 2.00, "S": 2.40, "M": 3.35, "L": 4.35, "XL": 7.30, "QS": null, "QM": null },
            mootmed: { "XS": "8x18.5x61 cm", "S": "8x35x61 cm", "M": "17.5x35x61 cm", "L": "36.5x35x61 cm", "XL": "74.5x35x61 cm", "QS": "", "QM": "" },
            parsedMootmed: { "XS": {k: 8, l: 18.5, s: 61}, "S": {k: 8, l: 35, s: 61}, "M": {k: 17.5, l: 35, s: 61}, "L": {k: 36.5, l: 35, s: 61}, "XL": {k: 74.5, l: 35, s: 61} }
        }
    }
};

// Genereerime tabeli dünaamiliselt lehe laadimisel
document.addEventListener("DOMContentLoaded", function() {
    const tbody = document.getElementById("tableBody");
    const suurusteNimekiri = Object.keys(KOHANDATAVAD_ANDMED.suurused);

    suurusteNimekiri.forEach(suurus => {
        // Puhas ja minimalistlik 3D-kasti joonis ilma segavate abijoonteta
        const svgKarp = `
            <svg class="box-icon" viewBox="0 0 100 80">
                <polygon points="20,55 50,40 85,50 55,68" class="box-fill" />
                <polygon points="20,55 20,30 50,15 50,40" style="fill:#b8c5d6; stroke:#2c3e50; stroke-width:1.5;" />
                <polygon points="50,40 50,15 85,25 85,50" style="fill:#d0d9e5; stroke:#2c3e50; stroke-width:1.5;" />
            </svg>
        `;

        function looLahtriHtml(firmaObj) {
            const hind = firmaObj.hinnad[suurus];
            const moot = firmaObj.mootmed[suurus];
            return hind === null ? 
                `<td class="price-cell not-available" data-price="none">-</td>` : 
                `<td class="price-cell" data-price="${hind}">${hind.toFixed(2)} € <span class="dimensions">${moot}</span></td>`;
        }

        const rowHtml = `
            <tr>
                <td>${suurus}</td>
                <td>${svgKarp}</td>
                ${looLahtriHtml(KOHANDATAVAD_ANDMED.ettevõtted.omniva)}
                ${looLahtriHtml(KOHANDATAVAD_ANDMED.ettevõtted.smartpost)}
                ${looLahtriHtml(KOHANDATAVAD_ANDMED.ettevõtted.dpd)}
                ${looLahtriHtml(KOHANDATAVAD_ANDMED.ettevõtted.venipak)}
                ${looLahtriHtml(KOHANDATAVAD_ANDMED.ettevõtted.unisend)}
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', rowHtml);
    });

    arvutaOdavaimadTabelis(tbody);
});

function arvutaOdavaimadTabelis(tbody) {
    const rows = tbody.querySelectorAll("tr");
    rows.forEach(row => {
        const priceCells = row.querySelectorAll(".price-cell");
        let minPrice = Infinity;
        let cheapestCells = [];
        let validPricesCount = 0;

        priceCells.forEach(cell => {
            const priceAttr = cell.getAttribute("data-price");
            if (priceAttr !== "none") {
                validPricesCount++;
                const price = parseFloat(priceAttr);
                if (price < minPrice) { minPrice = price; cheapestCells = [cell]; }
                else if (price === minPrice) { cheapestCells.push(cell); }
            }
        });

        if (validPricesCount > 1) {
            cheapestCells.forEach(cell => cell.classList.add("cheapest"));
        }
    });
}

// POP-UP AKNA JUHTIMINE
function openSearchModal() {
    document.getElementById('searchModal').classList.add('active');
    resetModalInputForm();
}

function closeModal() {
    document.getElementById('searchModal').classList.remove('active');
}

function resetModalInputForm() {
    document.getElementById('modalInner').innerHTML = `
        <h3>Sisesta paki mõõtmed</h3>
        <div class="input-group">
            <label for="pkgHeight">Kõrgus (cm):</label>
            <input type="number" id="pkgHeight" min="0" step="0.1" placeholder="nt 12">
        </div>
        <div class="input-group">
            <label for="pkgWidth">Laius (cm):</label>
            <input type="number" id="pkgWidth" min="0" step="0.1" placeholder="nt 35">
        </div>
        <div class="input-group">
            <label for="pkgLength">Pikkus / Sügavus (cm):</label>
            <input type="number" id="pkgLength" min="0" step="0.1" placeholder="nt 50">
        </div>
        <button class="submit-btn" onclick="executeSearch()">Otsi sobivat</button>
    `;
}

// OTSINGU TEOSTAMINE
function executeSearch() {
    const hInput = parseFloat(document.getElementById('pkgHeight').value);
    const wInput = parseFloat(document.getElementById('pkgWidth').value);
    const lInput = parseFloat(document.getElementById('pkgLength').value);

    if (isNaN(hInput) || isNaN(wInput) || isNaN(lInput) || hInput <= 0 || wInput <= 0 || lInput <= 0) {
        alert("Palun sisesta kõik kolm mõõdet korrektselt!");
        return;
    }

    let sobivadVariandid = [];

    Object.keys(KOHANDATAVAD_ANDMED.ettevõtted).forEach(key => {
        const firma = KOHANDATAVAD_ANDMED.ettevõtted[key];
        
        Object.keys(firma.parsedMootmed).forEach(suurus => {
            const maxMoot = firma.parsedMootmed[suurus];
            const hind = firma.hinnad[suurus];

            if (hInput <= maxMoot.k && wInput <= maxMoot.l && lInput <= maxMoot.s && hind !== null) {
                sobivadVariandid.push({
                    firmaKlass: "res-" + key,
                    firmaNimi: firma.nimi,
                    suurus: suurus,
                    mootmedText: firma.mootmed[suurus],
                    hind: hind
                });
            }
        });
    });

    sobivadVariandid.sort((a, b) => a.hind - b.hind);
    kuvaTulemusedAknas(sobivadVariandid, hInput, wInput, lInput);
}

function kuvaTulemusedAknas(tulemused, h, w, l) {
    const container = document.getElementById('modalInner');
    let html = `<h3>Sobivad pakiautomaadid</h3>`;
    html += `<p style="font-size:12px; text-align:center; color:#666; margin-top:-10px;">Pakk: ${h} x ${w} x ${l} cm</p>`;

    if (tulemused.length === 0) {
        html += `<div class="no-results">Kahjuks ükski pakiautomaadi suurus ei ole nii suurele pakile sobiv.</div>`;
    } else {
        html += `<div class="results-list">`;
        tulemused.forEach((item, index) => {
            const kroon = index === 0 ? ' ✨ (Soodsaim)' : '';
            html += `
                <div class="result-item ${item.firmaKlass}">
                    <div class="result-meta">
                        <div class="result-company">${item.firmaNimi}${kroon}</div>
                        <div class="result-size">Suurus ${item.suurus} (${item.mootmedText})</div>
                    </div>
                    <div class="result-price">${item.hind.toFixed(2)} €</div>
                </div>
            `;
        });
        html += `</div>`;
    }

    html += `<button class="back-btn" onclick="resetModalInputForm()">← Uus otsing</button>`;
    container.innerHTML = html;
}

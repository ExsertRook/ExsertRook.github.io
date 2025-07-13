const itemsByCategory = {
  contraband: {
    red_decryption_key: { threshold: 11, traffickingLabel: 'Trafficking of Contraband', possessionLabel: 'Possession of Contraband' },
    blue_decryption_key: { threshold: 11, traffickingLabel: 'Trafficking of Contraband', possessionLabel: 'Possession of Contraband' },
    green_decryption_key: { threshold: 11, traffickingLabel: 'Trafficking of Contraband', possessionLabel: 'Possession of Contraband' },
    chip: { threshold: 11, traffickingLabel: 'Trafficking of Contraband', possessionLabel: 'Possession of Contraband' },
    raspberry_chip: { threshold: 11, traffickingLabel: 'Trafficking of Contraband', possessionLabel: 'Possession of Contraband' },
    fake_plate: { threshold: 11, traffickingLabel: 'Trafficking of Contraband', possessionLabel: 'Possession of Contraband' },
    catalytic_converters: { threshold: 11, traffickingLabel: 'Trafficking of Contraband', possessionLabel: 'Possession of Contraband' },
    meth_tables: { threshold: 11, traffickingLabel: 'Trafficking of Contraband', possessionLabel: 'Possession of Contraband' },
    pagers: { threshold: 11, traffickingLabel: 'Trafficking of Contraband', possessionLabel: 'Possession of Contraband' },
  },
  drugs: {
    joints: { threshold: 25, traffickingLabel: 'Drug Trafficking of a Class B Substance', possessionLabel: 'Possession of Joints' },
    weed_ounce: { threshold: 5, traffickingLabel: 'Drug Trafficking of a Class B Substance', possessionLabel: 'Possession of Weed' },
    acid: { threshold: 5, traffickingLabel: 'Drug Trafficking of a Class B Substance', possessionLabel: 'Possession of Acid' },
    lean: { threshold: 7, traffickingLabel: 'Drug Trafficking of a Class B Substance', possessionLabel: 'Possession of Lean' },
    cocaine_bags: { threshold: 8, traffickingLabel: 'Trafficking of a Class A Substance', possessionLabel: 'Possession of Cocaine' },
    cocaine_bricks: { threshold: 1, traffickingLabel: 'Trafficking of a Class A Substance', possessionLabel: 'Possession of Cocaine' },
    narcotics: { threshold: 11, traffickingLabel: 'Drug Trafficking of Narcotics', possessionLabel: 'Possession of Narcotics' },
  },
  weapons: {
    class_1_weapons: { threshold: 3, traffickingLabel: 'Trafficking of Class 1 Weapon', possessionLabel: 'Possession of Class 1 Weapon' },
    class_2_weapons: { threshold: 3, traffickingLabel: 'Trafficking of Class 2 Weapon', possessionLabel: 'Possession of Class 2 Weapon' },
    class_3_weapons: { threshold: 3, traffickingLabel: 'Trafficking of Class 3 Weapon', possessionLabel: 'Possession of Class 3 Weapon' },
    class_4_weapons: { threshold: 3, traffickingLabel: 'Trafficking of Class 4 Weapon', possessionLabel: 'Possession of Class 4 Weapon' },
    class_5_weapons: { threshold: 3, traffickingLabel: 'Trafficking of Class 5 Weapon', possessionLabel: 'Possession of Class 5 Weapon' },
  },
  narcotics: {
    painkillers: { threshold: 11, traffickingLabel: 'Drug Trafficking of Narcotics', possessionLabel: 'Possession of Narcotics' },
    antibiotics: { threshold: 11, traffickingLabel: 'Drug Trafficking of Narcotics', possessionLabel: 'Possession of Narcotics' },
    fentanyl: { threshold: 11, traffickingLabel: 'Drug Trafficking of Narcotics', possessionLabel: 'Possession of Narcotics' },
    oxy: { threshold: 11, traffickingLabel: 'Drug Trafficking of Narcotics', possessionLabel: 'Possession of Narcotics' }
  }
};

const categorySelect = document.getElementById('category');
const itemSelect = document.getElementById('item');
const form = document.getElementById('calculatorForm');
const resultDiv = document.getElementById('result');

categorySelect.addEventListener('change', function () {
  const selectedCategory = categorySelect.value;
  itemSelect.innerHTML = '<option value="" disabled selected>Select an item</option>';

  if (itemsByCategory[selectedCategory]) {
    for (const key in itemsByCategory[selectedCategory]) {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = formatItemName(key);
      itemSelect.appendChild(option);
    }
  }
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const selectedCategory = categorySelect.value;
  const selectedItem = itemSelect.value;
  const quantity = parseInt(document.getElementById('quantity').value);

  if (!itemsByCategory[selectedCategory] || !itemsByCategory[selectedCategory][selectedItem]) {
    resultDiv.innerHTML = 'Invalid item selected.';
    return;
  }

  const { threshold, traffickingLabel, possessionLabel } = itemsByCategory[selectedCategory][selectedItem];

  let traffickingCount = 0;
  let possessionCount = 0;

  if (quantity >= threshold) {
    traffickingCount = 1;
    possessionCount = quantity - threshold;
  } else {
    possessionCount = quantity;
  }

  let output = `<strong>Charges:</strong><br>`;
  if (traffickingCount > 0) {
    output += `${traffickingLabel} x${traffickingCount}<br>`;
  }
  if (possessionCount > 0) {
    output += `${possessionLabel} x${possessionCount}`;
  }
  if (traffickingCount === 0 && possessionCount === 0) {
    output += `No charges apply.`;
  }

  resultDiv.innerHTML = output;
});

function formatItemName(name) {
  return name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}
// ==================== KATEGOORIAD JA VÄLJAD ====================
const categories = {
  monitor: {
    name: "Monitor",
    fields: [
      { key: "name", label: "Toote nimi / mudel", type: "text", placeholder: "nt. Dell S2721QS" },
      { key: "screen_size", label: "Ekraani suurus", type: "select", 
        options: ["19 tolli", "21.5 tolli", "22 tolli", "23 tolli", "24 tolli", "27 tolli"], 
        defaultValue: "24 tolli" },
      { key: "resolution", label: "Resolutsioon", type: "select", 
        options: ["1366 x 768", "1600 x 900", "1680 x 1050", "1920x1080", "1920 x 1200", "2560 x 1080", "2560 x 1440"], 
        defaultValue: "1920x1080" },
      { key: "panel_type", label: "Paneeli tüüp", type: "select", 
        options: ["TN", "IPS", "VA", "OLED"] },
      { key: "video_ports", label: "Video pesad", type: "select", 
        options: [
          "VGA", 
          "VGA / DVI", 
          "VGA / DVI / DisplayPort", 
          "VGA / HDMI", 
          "VGA / HDMI / DisplayPort", 
          "HDMI", 
          "DisplayPort", 
          "DisplayPort / HDMI", 
          "VGA / DVI / HDMI / DisplayPort",
          "2x HDMI / 1x DisplayPort",
          "2x HDMI",
          "HDMI / DisplayPort / USB-C"
        ] },
      { key: "usb_ports", label: "Kas monitoril on USB pesad?", type: "select", 
        options: ["Jah", "Ei"], defaultValue: "Ei" },
      { key: "aux_port", label: "Kas on AUX helipesa?", type: "select", 
        options: ["Jah", "Ei"], defaultValue: "Ei" }
    ]
  },

  "id-card-reader": {
    name: "ID-kaardi lugeja",
    fields: [] // no fields
  },

  computer: {
    name: "Arvuti / Sülearvuti",
    fields: [
      { key: "name", label: "Mudel", type: "text", placeholder: "nt. Lenovo ThinkPad X1" },
      { key: "cpu", label: "Protsessor (CPU)", type: "text", placeholder: "Intel i7-12700H" },
      { key: "ram", label: "Mälu (RAM)", type: "text", placeholder: "32GB" },
      { key: "storage", label: "Salvestusruum", type: "text", placeholder: "1TB SSD" },
      { key: "screen", label: "Ekraan", type: "text", placeholder: "14\" 1920x1080" }
    ]
  },

  ikea: {
    name: "IKEA toode",
    fields: [
      { key: "ikea_name", label: "IKEA toote nimi", type: "text", placeholder: "nt. IKEA MALM, IKEA LACK" },
      { key: "description", label: "Lühikirjeldus", type: "text", placeholder: "nt. öökapp, riiul, kirjutuslaud" },
      { key: "color", label: "Värvus", type: "text", placeholder: "nt. valge, must, tamm" },
      { key: "condition", label: "Seisukord", type: "select", options: ["Uus", "Kasutatud"], defaultValue: "Kasutatud" }
    ]
  }
};

// ==================== KATEGOORIA SPETSIIFILISED MALLID ====================
const defaultTemplates = {
  monitor: `Müüa heas seisukorras {{name}}. Monitoril võib esineda mõningaid kasutusjälgi, kuid üldmulje on viisakas.

Tehnilised andmed:
Ekraani suurus: {{screen_size}}
Resolutsioon: {{resolution}}
Paneeli tüüp: {{panel_type}}
Video pesad: {{video_ports}}
{{usb_text}}
{{aux_text}}

Monitoriga tuleb kaasa ostja soovil videokaabel ning ka toitekaabel.

Asub Tartus, Ropka Tööstusrajoonis.
Ostja soovil ning kulul liigub ka pakiautomaadiga väikese lisatasu eest.`,

  "id-card-reader": `Müüa ID kaardi lugeja. Näeb enamvähem viisakas välja ning töötab. 

Asub Tartus, Ropka Tööstusrajoonis.
Ostja soovil ning kulul liigub ka ilusti pakiautomaadiga väikese lisatasuga.`,

  computer: `Müüa {{name}} arvuti.

Protsessor: {{cpu}}
Mälu (RAM): {{ram}}
Salvestusruum: {{storage}}
Ekraan: {{screen}}

Asub Tartus, Ropka Tööstusrajoonis.
Ostja soovil liigub ka pakiautomaadiga väikese lisatasuga.`,

  ikea: `Müüa IKEA {{ikea_name}} ({{description}}). Toode on {{condition}} seisukorras ning värvuseks {{color}}.

Asub Tartus, Ropka Tööstusrajoonis.
Ostja soovil liigub ka pakiautomaadiga väikese lisatasuga.`
};

// ==================== JS LOOGIKA ====================
document.addEventListener('DOMContentLoaded', () => {
  const categorySelect = document.getElementById('category');
  const formContainer = document.getElementById('form-container');
  const dynamicFields = document.getElementById('dynamic-fields');
  const templateArea = document.getElementById('template');
  const outputArea = document.getElementById('output');
  const copyBtn = document.getElementById('copy-btn');

  // Esialgne mall (monitor)
  templateArea.value = defaultTemplates.monitor;

  // Kategooria muutus
  categorySelect.addEventListener('change', () => {
    const selected = categorySelect.value;
    
    if (!selected) {
      formContainer.classList.add('hidden');
      return;
    }

    const cat = categories[selected];
    formContainer.classList.remove('hidden');
    document.getElementById('form-title').textContent = cat.name + " andmed";

    dynamicFields.innerHTML = '';

    // Lae kategooria mall
    if (defaultTemplates[selected]) {
      templateArea.value = defaultTemplates[selected];
    }

    // Kui kategoorial pole välju → ära loo midagi
    if (cat.fields.length === 0) {
      generateOutput();
      return;
    }

    // Loo väljad
    cat.fields.forEach(field => {
      const div = document.createElement('div');
      div.className = 'field';

      let fieldHTML = `<label for="${field.key}">${field.label}:</label>`;

      if (field.type === 'select') {
        let selectHTML = `<select id="${field.key}" class="input">`;
        field.options.forEach(opt => {
          const isDefault = (field.defaultValue && field.defaultValue === opt);
          selectHTML += `<option value="${opt}" ${isDefault ? 'selected' : ''}>${opt}</option>`;
        });
        selectHTML += '</select>';
        fieldHTML += selectHTML;
      } else {
        fieldHTML += `<input type="text" id="${field.key}" class="input" placeholder="${field.placeholder || ''}">`;
      }

      div.innerHTML = fieldHTML;
      dynamicFields.appendChild(div);
    });

    generateOutput();
  });

  // Live uuendus
  document.addEventListener('input', generateOutput);
  document.addEventListener('change', generateOutput);

  function generateOutput() {
    const selected = categorySelect.value;
    if (!selected) return;

    const cat = categories[selected];
    let templateText = templateArea.value;

    const values = {};
    cat.fields.forEach(field => {
      const element = document.getElementById(field.key);
      values[field.key] = element ? element.value.trim() : '';
    });

    // Asenda {{kohahoidjad}}
    Object.keys(values).forEach(key => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      templateText = templateText.replace(placeholder, values[key]);
    });

    // USB ja AUX loogika
    let usbText = '';
    if (values.usb_ports === "Jah") {
      usbText = "Monitoril on olemas USB pesad.";
    }
    templateText = templateText.replace(/{{usb_text}}/g, usbText);

    let auxText = '';
    if (values.aux_port === "Jah") {
      auxText = "Monitoril on olemas AUX audio pesa.";
    }
    templateText = templateText.replace(/{{aux_text}}/g, auxText);

    // Eemalda liigsed tühjad read
    templateText = templateText.replace(/\n\n\n/g, '\n\n');

    outputArea.textContent = templateText.trim();
  }

  // Kopeeri nupp
  copyBtn.addEventListener('click', () => {
    const text = outputArea.textContent;
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = '✅ Kopeeritud!';
      setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
  });
});

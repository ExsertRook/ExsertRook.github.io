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

      { key: "refresh_rate", label: "Ekraani värskendussagedus", type: "select",
        options: ["60Hz", "75Hz", "100Hz", "120Hz", "144Hz", "165Hz", "240Hz"],
        defaultValue: "60Hz" },

      // DEFAULT = BLANK
      { key: "response_time", label: "Reageerimisaeg (ms)", type: "select",
        options: ["", "1ms", "2ms", "4ms", "5ms", "6ms", "8ms"],
        defaultValue: "" },

      // DEFAULT = BLANK
      { key: "panel_type", label: "Paneeli tüüp", type: "select", 
        options: ["", "TN", "IPS", "VA", "OLED"],
        defaultValue: "" },

      { key: "brightness", label: "Heledus (nits)", type: "select",
        options: ["200 nits", "250 nits", "300 nits", "350 nits", "400 nits", "450 nits"],
        defaultValue: "250 nits" },

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

      { 
        key: "usb_count", 
        label: "Mitu USB pesa on monitoril?", 
        type: "select",
        options: ["1", "2", "3", "4", "5", "6"],
        hidden: true
      },

      { key: "aux_port", label: "Kas on AUX helipesa?", type: "select", 
        options: ["Jah", "Ei"], defaultValue: "Ei" }
    ]
  },

  "id-card-reader": {
    name: "ID-kaardi lugeja",
    fields: []
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
Värskendussagedus: {{refresh_rate}}
Reageerimisaeg: {{response_time}}
Heledus: {{brightness}}
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

  templateArea.value = defaultTemplates.monitor;

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

    if (defaultTemplates[selected]) {
      templateArea.value = defaultTemplates[selected];
    }

    if (cat.fields.length === 0) {
      generateOutput();
      return;
    }

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

      if (field.hidden) {
        div.style.display = "none";
        div.dataset.hiddenField = field.key;
      }

      dynamicFields.appendChild(div);
    });

    generateOutput();
  });

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

    // Show/hide USB count field
    const usbPortsField = document.getElementById("usb_ports");
    const usbCountWrapper = dynamicFields.querySelector('[data-hidden-field="usb_count"]');

    if (usbPortsField && usbCountWrapper) {
      usbCountWrapper.style.display = usbPortsField.value === "Jah" ? "flex" : "none";
    }

    // Replace placeholders
    Object.keys(values).forEach(key => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      templateText = templateText.replace(placeholder, values[key]);
    });

    // USB text
    let usbText = '';
    if (values.usb_ports === "Jah") {
      usbText = `Monitoril on ${values.usb_count} USB pesa.`;
    }
    templateText = templateText.replace(/{{usb_text}}/g, usbText);

    // AUX text
    let auxText = '';
    if (values.aux_port === "Jah") {
      auxText = "Monitoril on olemas AUX audio pesa.";
    }
    templateText = templateText.replace(/{{aux_text}}/g, auxText);

    // REMOVE LINES WHERE PLACEHOLDER WAS EMPTY
    templateText = templateText
      .split("\n")
      .filter(line => !line.includes("{{") && line.trim() !== "")
      .join("\n");

    outputArea.textContent = templateText.trim();
  }

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

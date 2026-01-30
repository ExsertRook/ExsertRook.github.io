const items = [
  { name: "Window", price: 45 },
  { name: "Any Door", price: 75 },
  { name: "Tire", price: 20 },
  { name: "Glass", price: 45 },
  { name: "Scrap", price: 75 },
  { name: "Aluminum", price: 100 },
  { name: "Steel", price: 125 },
  { name: "Rubber", price: 20 },
  { name: "Repair Kit", price: 600 },
  { name: "Motor Oil", price: 600 }
];

const itemList = document.getElementById("item-list");
const cartList = document.getElementById("cart");
const totalDisplay = document.getElementById("total");
const discountInput = document.getElementById("discount");
const discountValue = document.getElementById("discountValue");


let cart = [];

function renderItems() {
  items.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td>
        <button class="qty-minus" onclick="changeQty(${index}, -1)">−</button>
        <span id="qty-${index}">1</span>
        <button class="qty-plus" onclick="changeQty(${index}, 1)">+</button>
      </td>
      <td>
        <button onclick="addToCart(${index})">Add</button>
        <button onclick="removeFromCart(${index})">Remove</button>
      </td>
    `;

    itemList.appendChild(row);
  });
}

function changeQty(index, amount) {
  const qtySpan = document.getElementById(`qty-${index}`);
  let qty = parseInt(qtySpan.textContent);

  qty += amount;
  if (qty < 1) qty = 1;

  qtySpan.textContent = qty;
}

function addToCart(index) {
  const qtySpan = document.getElementById(`qty-${index}`);
  const qty = parseInt(qtySpan.textContent);
  const item = items[index];

  cart.push({
    name: item.name,
    price: item.price,
    quantity: qty
  });

  qtySpan.textContent = 1;

  updateCart();
}

function removeFromCart(index) {
  const itemName = items[index].name;

  // Find the last matching item and remove it
  for (let i = cart.length - 1; i >= 0; i--) {
    if (cart[i].name === itemName) {
      cart.splice(i, 1);
      break;
    }
  }

  updateCart();
}


function updateCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price} x ${item.quantity} = $${itemTotal}`;
    cartList.appendChild(li);
  });

  const discount = parseFloat(discountInput.value) || 0;
  total -= discount;
  if (total < 0) total = 0;

  totalDisplay.textContent = total.toFixed(2);
}

discountInput.addEventListener("input", () => {
  discountValue.textContent = discountInput.value;
  updateCart();
});


renderItems();

const themeToggle = document.getElementById("themeToggle");

document.body.classList.remove("light");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    themeToggle.textContent = "🌙 Dark Mode";
  } else {
    themeToggle.textContent = "☀️ Light Mode";
  }
});

const invoiceBtn = document.getElementById("invoiceBtn");
const modal = document.getElementById("invoiceModal");
const closeInvoice = document.getElementById("closeInvoice");

const invoiceItems = document.getElementById("invoiceItems");
const invoiceSubtotal = document.getElementById("invoiceSubtotal");
const invoiceDiscount = document.getElementById("invoiceDiscount");
const invoiceTotal = document.getElementById("invoiceTotal");

invoiceBtn.addEventListener("click", () => {
  invoiceItems.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const li = document.createElement("li");
    li.textContent = `${item.name} — $${item.price} x ${item.quantity} = $${itemTotal}`;
    invoiceItems.appendChild(li);
  });

  const discount = parseFloat(discountInput.value) || 0;
  let total = subtotal - discount;
  if (total < 0) total = 0;

  invoiceSubtotal.textContent = subtotal.toFixed(2);
  invoiceDiscount.textContent = discount.toFixed(2);
  invoiceTotal.textContent = total.toFixed(2);

  modal.style.display = "flex";
});

closeInvoice.addEventListener("click", () => {
  modal.style.display = "none";
});

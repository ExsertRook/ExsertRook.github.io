const allMeals = {
  classic: [
    {
      name: "Margherita Pizza",
      ingredients: ["2x Mozzarella", "1x Tomato Sauce", "1x Pizza Cheese", "1x Dough"],
      price: 200
    },
    {
      name: "Pepperoni Pizza",
      ingredients: ["2x Pepperoni", "1x Tomato Sauce", "1x Pizza Cheese", "1x Dough"],
      price: 200
    },
	{
      name: "Salami Pizza",
      ingredients: ["2x Salami", "1x Tomato Sauce", "1x Pizza Cheese", "1x Dough"],
      price: 200
    },
	{
      name: "Ham Pizza",
      ingredients: ["2x Ham", "1x Tomato Sauce", "1x Pizza Cheese", "1x Dough"],
      price: 200
    },
	
  ],
  specialty: [
    {
      name: "Vegetarian Pizza",
      ingredients: ["2x Olive", "2x Bell Pepper Slice", "1x Tomato Sauce", "1x Pizza Cheese", "1x Dough"],
      price: 250
    },
    {
      name: "Hawaiian Pizza",
      ingredients: ["2x Pineapple", "1x Ham", "1x Tomato Sauce", "1x Pizza Cheese", "1x Dough"],
      price: 250
    },
	{
      name: "Diavola Pizza",
      ingredients: ["1x Pepperoni", "1x Olive", "1x Jalapeno", "1x Tomato Sauce", "1x Pizza Cheese", "1x Dough"],
      price: 250
    }
  ],
  sides: [
    {
      name: "Breadsticks",
      ingredients: ["Breadstick"],
      price: 50
    },
	{
      name: "Soda",
      ingredients: ["Soda of choice"],
      price: 10
    },
    {
      name: "Capri-Sun",
      ingredients: ["Capri-Sun of choice"],
      price: 15
    },
	{
      name: "Water",
      ingredients: ["Water"],
      price: 10
    }
  ],
  specials: [
	{
      name: "Get Stuffed - Classic - Margherita",
      ingredients: ["8x Mozzarella", "4x Tomato Sauce", "4x Pizza Cheese", "4x Dough", "16x Drinks"],
      price: 800
    },
	{
      name: "Get Stuffed - Classic - Pepperoni",
      ingredients: ["8x Pepperoni", "4x Tomato Sauce", "4x Pizza Cheese", "4x Dough", "16x Drinks"],
      price: 800
    },
	{
      name: "Get Stuffed - Classic - Salami",
      ingredients: ["8x Salami", "4x Tomato Sauce", "4x Pizza Cheese", "4x Dough", "16x Drinks"],
      price: 800
    },
	{
      name: "Get Stuffed - Classic - Ham",
      ingredients: ["8x Ham", "4x Tomato Sauce", "4x Pizza Cheese", "4x Dough", "16x Drinks"],
      price: 800
    },
	{
      name: "Get Stuffed - Specialty - Vegetarian",
      ingredients: ["8x Olive", "8x Bell Pepper Slice", "4x Tomato Sauce", "4x Pizza Cheese", "4x Dough", "16x Drinks of choice"],
      price: 1000
    },
	{
      name: "Get Stuffed - Specialty - Hawaiian",
      ingredients: ["8x Pineapple", "4x Ham", "4x Tomato Sauce", "4x Pizza Cheese", "4x Dough", "16x Drinks of choice"],
      price: 1000
    },
	{
      name: "Get Stuffed - Specialty - Diavola",
      ingredients: ["4x Pepperoni", "4x Olive", "4x Jalapeno", "4x Tomato Sauce", "4x Pizza Cheese", "4x Dough", "16x Drinks of choice"],
      price: 1000
    }
  ]
};

let currentCategory = '';
let filteredMeals = [];
let addedItems = [];

const categorySelect = document.getElementById('categorySelect');
const mealSelect = document.getElementById('mealSelect');
const searchInput = document.getElementById('searchInput');
const orderList = document.getElementById('orderList');
const totalPriceDisplay = document.getElementById('totalPrice');

function onCategoryChange() {
  currentCategory = categorySelect.value;
  searchInput.value = '';

  if (currentCategory) {
    // Show all items immediately when category is selected
    filteredMeals = [...allMeals[currentCategory]];
    populateDropdown(filteredMeals);
  } else {
    mealSelect.innerHTML = '';
    filteredMeals = [];
  }
}

function populateDropdown(meals) {
  mealSelect.innerHTML = '';
  meals.forEach((meal, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = meal.name;
    mealSelect.appendChild(option);
  });
}

function filterMeals() {
  if (!currentCategory) return;

  const searchTerm = searchInput.value.toLowerCase();
  const meals = allMeals[currentCategory];

  if (searchTerm === "") {
    filteredMeals = [...meals]; // Show all
  } else {
    filteredMeals = meals.filter(meal =>
      meal.name.toLowerCase().includes(searchTerm)
    );
  }

  populateDropdown(filteredMeals);
}

function addItem() {
  const selectedIndex = mealSelect.value;
  if (selectedIndex === "" || !filteredMeals[selectedIndex]) return;

  const selectedMeal = filteredMeals[selectedIndex];
  addedItems.push(selectedMeal);
  updateOrderList();
}

function updateOrderList() {
  orderList.innerHTML = '';

  if (addedItems.length === 0) {
    orderList.innerHTML = '<p>No items added.</p>';
    totalPriceDisplay.textContent = '0.00';
  } else {
    let total = 0;
    addedItems.forEach((item) => {
      const itemEl = document.createElement('div');
      itemEl.innerHTML = `
        <p><strong>${item.name}</strong><br>
        Ingredients: ${item.ingredients.join(', ')}<br>
        Price: $${item.price.toFixed(2)}</p>
      `;
      orderList.appendChild(itemEl);
      total += item.price;
    });
    totalPriceDisplay.textContent = total.toFixed(2);
  }

  // Add the dough note below the order list (only once)
  if (!document.getElementById('doughNote')) {
    const doughNote = document.createElement('p');
    doughNote.id = 'doughNote';
    doughNote.style.marginTop = '10px';
    doughNote.style.fontStyle = 'italic';
    doughNote.style.color = '#ccc';
    doughNote.textContent = '1x Dough = 1x Olive, 1x Flour, 1x Yeast';
    orderList.parentElement.appendChild(doughNote);
  }
}

function clearDetails() {
  // Optional: could reset order summary when switching categories
  // For now, just clears meal dropdown
  mealSelect.innerHTML = '';
}

const discounts = {
  none: {
    description: "No discounts applied."
  },
  discount1: {
    description: "Buy a pizza, get a pizza half off"
  },
  discount2: {
    description: "Free Breadsticks with a Get Stuffed specials purchase (4 per order max)"
  }
};

function onDiscountChange() {
  const select = document.getElementById('discountSelect');
  const desc = document.getElementById('discountDescription');
  const selected = select.value;

  if (discounts[selected]) {
    desc.textContent = discounts[selected].description;
  } else {
    desc.textContent = "";
  }
}
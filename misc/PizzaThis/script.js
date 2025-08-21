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
	{
      name: "Get Stuffed - Classic",
      ingredients: ["Tomato", "Mozzarella", "Pepperoni"],
      price: 800
    },
	{
      name: "Monday - Wednesday / Classic",
      ingredients: ["Tomato", "Mozzarella", "Pepperoni"],
      price: 800
    },
	{
      name: "Thursday - Saturday / Classic",
      ingredients: ["Tomato", "Mozzarella", "Pepperoni"],
      price: 800
    }
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
    },
	{
      name: "Get Stuffed - Specialty",
      ingredients: ["Tomato", "Mozzarella", "Pepperoni"],
      price: 800
    },
	{
      name: "Monday - Wednesday / Specialty",
      ingredients: ["Tomato", "Mozzarella", "Pepperoni"],
      price: 200
    },
	{
      name: "Thursday - Saturday / Specialty",
      ingredients: ["Tomato", "Mozzarella", "Pepperoni"],
      price: 200
    }
  ],
  sides: [
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
    return;
  }

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

function clearDetails() {
  // Optional: could reset order summary when switching categories
  // For now, just clears meal dropdown
  mealSelect.innerHTML = '';
}

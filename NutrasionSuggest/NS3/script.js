const form = document.querySelector('form');
const suggestionsDiv = document.getElementById('suggestions');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const gender = form.gender.value;
  const age = form.age.value;
  const height = form.height.value;
  const weight = form.weight.value;
  const activityLevel = form['activity-level'].value;
  const goal = form.goal.value;
  const dailyCalories = calculateDailyCalories(gender, age, height, weight, activityLevel, goal);
  const suggestedFoods = suggestFoods(dailyCalories);
  renderSuggestions(suggestedFoods);
});

function calculateDailyCalories(gender, age, height, weight, activityLevel, goal) {
  let bmr;

  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  let pal;
  switch (activityLevel) {
    case 'sedentary':
      pal = 1.2;
      break;
    case 'lightly-active':
      pal = 1.375;
      break;
    case 'moderately-active':
      pal = 1.55;
      break;
    case 'very-active':
      pal = 1.725;
      break;
    case 'extra-active':
      pal = 1.9;
      break;
    default:
      pal = 1.2;
  }

  let dailyCalories;
  switch (goal) {
    case 'lose':
      dailyCalories = bmr * pal * 0.8;
      break;
    case 'maintain':
      dailyCalories = bmr * pal;
      break;
    case 'gain':
      dailyCalories = bmr * pal * 1.2;
      break;
    default:
      dailyCalories = bmr * pal;
  }

  return Math.round(dailyCalories);
}

function suggestFoods(dailyCalories) {
  const foods = [
    { name: 'Broccoli', calories: 55 },
    { name: 'Carrots', calories: 41 },
    { name: 'Spinach', calories: 23 },
    { name: 'Chicken Breast', calories: 165 },
    { name: 'Salmon', calories: 206 },
    { name: 'Quinoa', calories: 120 },
    { name: 'Sweet Potato', calories: 86 },
    { name: 'Brown Rice', calories: 111 },
    { name: 'Almonds', calories: 164 },
    { name: 'Greek Yogurt', calories: 100 },
  ];

  const suggestedFoods = [];

  foods.forEach((food) => {
    const servings = Math.round(dailyCalories / food.calories * 100) / 100;
    if (servings > 0) {
      suggestedFoods.push({ name: food.name, servings: servings });
    }
  });

  return suggestedFoods;
}

function renderSuggestions(suggestedFoods) {
  suggestionsDiv.innerHTML = '';

  if (suggestedFoods.length === 0) {
    suggestionsDiv.innerHTML = '<p>No food suggestions. Please adjust your inputs.</p>';
    return;
  }

  suggestedFoods.forEach((suggestedFood) => {
    const foodDiv = document.createElement('div');
    foodDiv.classList.add('food');
    const nameHeading = document.createElement('h3');
    nameHeading.textContent = suggestedFood.name;
    const servingsParagraph = document.createElement('p');
    servingsParagraph.textContent = `Servings: ${suggestedFood.servings}`;
    foodDiv.appendChild(nameHeading);
    foodDiv.appendChild(servingsParagraph);
    suggestionsDiv.appendChild(foodDiv);
  });
}

function resetPage() {
    location.reload();
  }
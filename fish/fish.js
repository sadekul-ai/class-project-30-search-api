const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");
const mealModal = document.getElementById("mealModal");
const mealDetails = document.getElementById("mealDetails");
const closeModal = document.getElementById("closeModal");

// Search function
async function handleSearch() {
  const foodName = searchInput.value.trim();
  resultsDiv.innerHTML = "";

  if (!foodName) {
    alert("Please enter a food name!");
    return;
  }

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.meals) {
      data.meals.forEach(meal => {
        const mealCard = document.createElement("div");
        mealCard.classList.add("meal-card");
        mealCard.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
          <p><b>Category:</b> ${meal.strCategory}</p>
          <p><b>Area:</b> ${meal.strArea}</p>
          <button class="detailsBtn" data-id="${meal.idMeal}">See Details</button>
        `;
        resultsDiv.appendChild(mealCard);
      });

      // Attach event to all detail buttons
      document.querySelectorAll(".detailsBtn").forEach(btn => {
        btn.addEventListener("click", () => {
          const mealId = btn.getAttribute("data-id");
          fetchMealDetails(mealId);
        });
      });

    } else {
      resultsDiv.innerHTML = "<p>No meals found!</p>";
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    resultsDiv.innerHTML = "<p>Something went wrong. Try again!</p>";
  }
}

// Fetch meal details
async function fetchMealDetails(mealId) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const meal = data.meals[0];

    // Ingredients
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients += `<li>${ingredient} - ${measure}</li>`;
      }
    }

    // YouTube Embed
    let youtubeEmbed = "";
    if (meal.strYoutube) {
      const videoId = meal.strYoutube.split("v=")[1];
      youtubeEmbed = `
        <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>
      `;
    }

    mealDetails.innerHTML = `
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      
      <div class="tabs">
        <button class="tab-btn active" data-tab="ingredients">Ingredients</button>
        <button class="tab-btn" data-tab="instructions">Instructions</button>
        <button class="tab-btn" data-tab="video">YouTube</button>
      </div>
      
      <div class="tab-content" id="ingredients" style="display:block;">
        <ul>${ingredients}</ul>
      </div>
      
      <div class="tab-content" id="instructions">
        <p>${meal.strInstructions}</p>
      </div>

      <div class="tab-content" id="video">
        ${youtubeEmbed || "<p>No video available</p>"}
      </div>
    `;

    mealModal.style.display = "block";

    // Tab switching
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        tabContents.forEach(content => content.style.display = "none");
        document.getElementById(btn.getAttribute("data-tab")).style.display = "block";
      });
    });

  } catch (error) {
    console.error("Error fetching details:", error);
  }
}

// Events
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSearch();
  }
});
closeModal.addEventListener("click", () => {
  mealModal.style.display = "none";
});
window.addEventListener("click", (event) => {
  if (event.target === mealModal) {
    mealModal.style.display = "none";
  }
});

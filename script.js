let one11 = document.getElementById("one11")
async function user() {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let data = await response.json()
    let result = data.categories.map((items) => {
        return `
<div class="menu">
<button class="btn" onclick="manu('${items.strCategory}')">
<h6>${items.strCategory}</h6>
</button>
</div>
`;
    })

    one11.innerHTML += result.join("");

}
user()


/* cards */
let card = document.getElementById("card")
async function user1() {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let data = await response.json()
    let result = data.categories.map((values) => {
  return `
<div class="pics">
<h6>${values.strCategory}</h6>
<img src="${values.strCategoryThumb}" onclick="manu('${values.strCategory}')">
</div>
`;
    })
    card.innerHTML += result.join("");

}
if (card) {
    user1();
}


async function fdata() {
    let fun = document.getElementById("fun")
    let search = document.getElementById("search").value.toLowerCase().trim()
    if (search === "") {
        fun.innerHTML = ""
        return
    }


let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
let de = await res.json();

if (!de.meals) {
    fun.innerHTML = "<h3>No meals found</h3>";
    return;
}

let result1 = de.meals.map((value) => {
        return `<div class = "filt">
          <h6>${value.strCategory}</h6>
          <img src = "${value.strMealThumb}" width = "240px">
          <p>${value.strArea}</p>
          <h5>${value.strMeal}</h5>
        </div> `

    })
    fun.innerHTML = result1.join("")
}


///second page////
function manu(cate) {
    window.open(`second.html?category=${encodeURIComponent(cate)}`, "_self");
}


async function menu() {

    let favour = document.getElementById("favour");
    let para = new URLSearchParams(window.location.search);
    let category = para.get("category");
    
    if (!category) {
        favour.innerHTML = `<h2>No category selected</h2>`;
        return;
    }
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let data = await response.json();
   
    let categoryData = data.categories.find((item) => {
        return item.strCategory.toLowerCase() === category.toLowerCase();
    });
    if (!categoryData) {
        favour.innerHTML = `<h2>Category not found</h2>`;
        return;
    }
    
    let mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`);
    let mealData = await mealResponse.json();

    
    let description = `
        <div class="category-description">
            <h2>${categoryData.strCategory}</h2>
            <h5>${categoryData.strCategoryDescription}</h5>
        </div>`;

    let mealsHeading = `
        <div class="meals-title">
            <h2>MEALS</h2>
            <div class="title-line"></div>
        </div>
    `;

    if (!mealData.meals) {
        favour.innerHTML = description + mealsHeading + `<h3>No meals found</h3>`;
        return;
    }

    let meals = mealData.meals.map((meal) => {
        return `
            <div class="meal-card">
            <img src="${meal.strMealThumb}">
                <h5> ${meal.strMeal}</h5>
         </div>`;
    });

    favour.innerHTML = ` ${description} ${mealsHeading}
        <div class="meal-grid">
            ${meals.join("")}
        </div>
    `;
}
if (document.getElementById("favour")) {
    menu();
}


//////third page/////

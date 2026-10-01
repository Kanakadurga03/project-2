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
function note(third) {
    window.open(`third.html?meal=${encodeURIComponent(third)}`, "_self");
}

async function getMeal() {
    let params = new URLSearchParams(window.location.search);
    let meal = params.get("meal");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(meal)}`);
    let data = await response.json();
    let mealData = data.meals.find((item) => {
        return item.strMeal.toLowerCase() === meal.toLowerCase();
    });

    let name = `
        <div class="meal-des">
          <h4> 🏡>>${mealData.strMeal} </h4>
        </div>`;

    let details =
        `
        <div class = "data12">
        <h3>MEAL DETAILS</h3> <hr>
        </div>
        `

    let img = `
          <div class="iconical">
        <img src="${mealData.strMealThumb}">
         </div>
        `;

    let desc = `
      <div class="detailes22">
         <div class = "jhanu">
         <h3>${mealData.strMeal}</h3> <hr>
         <h4>${mealData.strCategory}</h4>
         <p> ${mealData.strSource}</p>
         <h6>${mealData.strTags}</h6>

         <div class ="anusha">
         <h5>ingridents</h5>
         <p>${mealData.strIngredient1}</p>
         <p>${mealData.strIngredient2}</p>
         <p>${mealData.strIngredient3}</p>
         <p>${mealData.strIngredient4}</p>
         <p>${mealData.strIngredient5}</p>
         <p>${mealData.strIngredient6}</p>
         <p>${mealData.strIngredient7}</p>
         <p>${mealData.strIngredient8}</p>
         <p>${mealData.strIngredient9}</p>
         <p>${mealData.strIngredient10}</p>
         <p>${mealData.strIngredient11}</p>
         <p>${mealData.strIngredient12}</p>
         <p>${mealData.strIngredient13}</p>
         <p>${mealData.strIngredient14}</p>
         <p>${mealData.strIngredient15}</p>
         <p>${mealData.strIngredient16}</p>
         <p>${mealData.strIngredient17}</p>
         <p>${mealData.strIngredient18}</p>
         <p>${mealData.strIngredient19}</p>
         <p>${mealData.strIngredient20}</p>
         </div>
         </div>
         </div>
        `;

    let measures = "";
    for (let i = 1; i <= 20; i++) {
        let measure = mealData[`strMeasure${i}`];
        if (measure && measure.trim() !== "") {
            measures += `
            <p>${measure.trim()}</p>
        `;
        }
    }

    let cc = `
    <div class="manu2">
        <h5>Measure:</h5>
        ${measures}
    </div>
`;



    let instruList = "";
    let instructions = mealData.strInstructions
        .split(".")
        .filter(value => value.trim() !== "");

    for (let instruction of instructions) {
        instruList += `
        <div class="inst-item">
            <span class="check">✓</span>
            <p>${instruction.trim()}.</p>
        </div>
    `;
    }

    let instruc = `
    <div class="innner">
        <h5>Instructions:</h5>

        <div class="instruction-list">
            ${instruList}
        </div>
    </div>
`;
    let result = `
    <div class="mealcont">
        ${img}
        ${desc}
    </div>
`;
    let inti = document.getElementById("inti")
    inti.innerHTML = `  ${name} ${details} ${result} ${cc} ${instruc}`
}

getMeal();








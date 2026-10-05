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

            <img 
                src="${meal.strMealThumb}"
                alt="${meal.strMeal}"
                onclick="note('${meal.strMeal.replace(/'/g, "\\'")}')"
                style="cursor: pointer;"
            >

            <h5>${meal.strMeal}</h5>

        </div>
    `;
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

// =====================================================
// THIRD PAGE
// =====================================================
function note(mealName) {

    window.location.href =
        "third.html?meal=" + encodeURIComponent(mealName);

}

// =====================================================
// GET MEAL DETAILS
// =====================================================

async function getMeal() {

    // Get third page container
    let inti = document.getElementById("inti");

    // If we are not on third page, stop
    if (!inti) {
        return;
    }

    try {

        // Get meal name from URL
        let params = new URLSearchParams(window.location.search);
        let meal = params.get("meal");

        // Check meal name
        if (!meal) {

            inti.innerHTML = `
                <div class="error">
                    <h2>Meal not found</h2>
                    <p>Please select a meal from the second page.</p>
                </div>
            `;

            return;
        }


        // =================================================
        // FETCH MEAL FROM MEALDB
        // =================================================

        let response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(meal)}`
        );

        // Check response
        if (!response.ok) {
            throw new Error("Failed to fetch meal");
        }

        // Convert response to JSON
        let data = await response.json();


        // Check meals
        if (!data.meals) {

            inti.innerHTML = `
                <div class="error">
                    <h2>Meal not found</h2>
                </div>
            `;

            return;
        }


        // =================================================
        // FIND SELECTED MEAL
        // =================================================

        let mealData = data.meals.find((item) => {
            return item.strMeal.toLowerCase() === meal.toLowerCase();
        });


        // If meal not found
        if (!mealData) {

            inti.innerHTML = `
                <div class="error">
                    <h2>Meal not found</h2>
                </div>
            `;

            return;
        }


        // =================================================
        // INGREDIENTS
        // =================================================

        let ingredients = "";

        for (let i = 1; i <= 20; i++) {

            let ingredient =
                mealData[`strIngredient${i}`];

            if (
                ingredient &&
                ingredient.trim() !== ""
            ) {

                ingredients += `
                    <p>${ingredient.trim()}</p>
                `;
            }
        }


        // =================================================
        // MEASURES
        // =================================================

        let measures = "";

        for (let i = 1; i <= 20; i++) {

            let measure =
                mealData[`strMeasure${i}`];

            if (
                measure &&
                measure.trim() !== ""
            ) {

                measures += `
                    <p>${measure.trim()}</p>
                `;
            }
        }


        // =================================================
        // INSTRUCTIONS
        // =================================================

        let instructionList = "";

        let instructions =
            (mealData.strInstructions || "")
                .split(".")
                .filter(value => value.trim() !== "");


        for (let instruction of instructions) {

            instructionList += `
                <div class="inst-item">

                    <span class="check">
                        ✓
                    </span>

                    <p>
                        ${instruction.trim()}.
                    </p>

                </div>
            `;
        }


        // =================================================
        // DISPLAY MEAL
        // =================================================

        inti.innerHTML = `

            <div class="meal-des">

                <h4>
                    🏡 >> ${mealData.strMeal}
                </h4>

            </div>


            <div class="data12">

                <h3>
                    MEAL DETAILS
                </h3>

                <hr>

            </div>


            <div class="mealcont">


                <!-- IMAGE -->

                <div class="iconical">

                    <img
                        src="${mealData.strMealThumb}"
                        alt="${mealData.strMeal}"
                    >

                </div>


                <!-- DETAILS -->

                <div class="detailes22">

                    <div class="jhanu">

                        <h3>
                            ${mealData.strMeal}
                        </h3>

                        <hr>

                        <h4>
                            Category:
                            ${mealData.strCategory || "N/A"}
                        </h4>

                        <h4>
                            Area:
                            ${mealData.strArea || "N/A"}
                        </h4>

                        <p>
                            ${mealData.strSource || ""}
                        </p>

                        <h6>
                            ${mealData.strTags || ""}
                        </h6>


                        <!-- INGREDIENTS -->

                        <div class="anusha">

                            <h5>
                                Ingredients
                            </h5>

                            ${ingredients}

                        </div>

                    </div>

                </div>

            </div>


            <!-- MEASURES -->

            <div class="manu2">

                <h5>
                    Measure:
                </h5>

                ${measures}

            </div>


            <!-- INSTRUCTIONS -->

            <div class="innner">

                <h5>
                    Instructions:
                </h5>

                <div class="instruction-list">

                    ${instructionList}

                </div>

            </div>

        `;

    }

    catch (error) {

        console.log("Third page error:", error);

        inti.innerHTML = `

            <div class="error">

                <h2>
                    Something went wrong
                </h2>

                <p>
                    Please try again later.
                </p>

            </div>

        `;
    }
}


// =====================================================
// RUN THIRD PAGE FUNCTION
// =====================================================

getMeal();
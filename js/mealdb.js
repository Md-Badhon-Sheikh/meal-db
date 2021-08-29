const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';
    if (searchText == '') {
        `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        // console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals));
    }


}
const displaySearchResult = meals => {
    // console.log(meals);
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card p-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
             <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title text-center">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            </div> 
        </div>
        `
        searchResult.appendChild(div);
    })
}
const loadMealDetail = mealId => {
    console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]));
}
const displayMealDetail = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('modal-content');
    div.innerHTML = `
        <div class="modal-body">
             <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
             <h5 class="modal-title text-center my-2" id="exampleModalLabel">${meal.strMeal}</h5>
             <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
             <a href="${meal.strYoutube}" class="btn btn-primary">YouTube</a>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary mx-auto" data-bs-dismiss="modal">Close</button>
    
    `
    mealDetails.appendChild(div);
}
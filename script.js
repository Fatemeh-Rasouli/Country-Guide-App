let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let result = document.getElementById("result");

searchBtn.addEventListener("click", () => {
    let countryName = countryInp.value.trim();
    if (!countryName) return;

    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(finalURL)
    .then(response => response.json())
    .then((data) => {
        let country = data[0];
        let currencyKey = Object.keys(country.currencies)[0];
        let currencyName = country.currencies[currencyKey].name;

        result.innerHTML = `
            <img src="${country.flags.svg}" class="flag-img">
            <h2>${country.name.common}</h2>

            <div class="wrapper"> 
                <div class="data-wrapper">
                    <h4>Capital:</h4>
                    <span>${country.capital[0]}</span>
                </div>
            </div>

            <div class="wrapper"> 
                <div class="data-wrapper">
                    <h4>Continent:</h4>
                    <span>${country.continents[0]}</span>
                </div>
            </div>

            <div class="wrapper"> 
                <div class="data-wrapper">
                    <h4>Population:</h4>
                    <span>${country.population.toLocaleString()}</span>
                </div>
            </div>

            <div class="wrapper"> 
                <div class="data-wrapper">
                    <h4>Currency:</h4>
                    <span>${currencyName} - ${currencyKey}</span>
                </div>
            </div>

            <div class="wrapper"> 
                <div class="data-wrapper">
                    <h4>Common Languages:</h4>
                    <span>${Object.values(country.languages).join(", ")}</span>
                </div>
            </div>
        `;
    })
    .catch(() => {
        result.innerHTML = `<h3>Country not found. Please try again.</h3>`;
    });
});


let loadCountries = ()=>{
    fetch ('https://restcountries.com/v3.1/independent?status=true')
    .then (res =>res.json())
    .then (data =>displayCountries(data))
}
loadCountries()

let displayCountries =(countries)=>{
   

    let countriesDiv = document.getElementById('countries')

    countries.forEach(country => {
       
        
    let div = document.createElement('div')
    div.classList.add('country')
    div.innerHTML = `
    <img src="${country?.flags?.png}" alt="">
    <h2>Name : ${country?.name?.official}</h2>
    <p>Population: ${country?.population}</p>
    <p>Area: ${country?.area}</p>
    <p>Capital: ${country?.capital}</p>
    <p>Languages: ${country?.languages?.english}</p>
    <p class="region">Region: ${country?.region}</p>
    <button onclick="loadingSingleCountry('${country?.name?.common}') "> See More </button>
    ` 
    countriesDiv.appendChild(div)
             
    })
}

let loadingSingleCountry = (name)=>{
    let url = `https://restcountries.com/v3.1/name/${name}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displaySingleCountry(data[0])
    )
}

let displaySingleCountry = (country)=>{
    let detailsDiv = document.getElementById('country-details');
    detailsDiv.innerText = '';
    let SingleCountryDiv = document.createElement('div')
    SingleCountryDiv.classList.add('country-details')
    SingleCountryDiv.innerHTML = `
    <img src="${country?.flags?.png}" alt="">
    <h2>Official Name : ${country?.name?.official}</h2>
    <h3>Common Name : ${country?.name?.common}</h3>
    <p>Population: ${country?.population}</p>
    <p>Area: ${country?.area}</p>
    <p>Capital: ${country?.capital}</p>
    <p>Languages: ${country?.languages?.english}</p>
    <p class="region">Region: ${country?.region}</p>
    <p Start Of Week: ${country?.startOfWeek}</p>
    <p Status: ${country?.status}</p>
    
    ` 
    detailsDiv.appendChild(SingleCountryDiv)
    window.scrollTo(0, 0)  

}




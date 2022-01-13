import './css/styles.css';
const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const baseUrl = 'https://restcountries.com/v3.1/name/{name}';
const DEBOUNCE_DELAY = 300;

function getDataServer(url) {
    return fetch(url).then(response => response.json())
}
getDataServer(baseUrl).then(data => {
    const markup;
})
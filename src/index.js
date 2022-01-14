import './css/styles.css';
import debounce from 'lodash.debounce';
import getDataServer from './fetchCountries';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
  infoList: document.querySelector('.info-list')
};
let inputValue = '';
const DEBOUNCE_DELAY = 300;
refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function contryList (data){
  const markup = data
  .map(
    item => `<li>
    <div class ="thumb"><img class="img-info" src="${item.flags.svg}" alt="">
    <p class ="item-name"><b> ${item.name.common}</b></p></div>
</li>`).join('');
return markup;
}
function dataItem (data){
  const dataItem = data
  .map(
    item => `<div class ="thumb"><img class="img-info" src="${item.flags.svg}" alt="">
    <p class ="item-name"><b> ${item.name.common}</b></p></div>
    <p class ="item"><b>Capital:</b> ${item.capital}</p>
    <p class ="item"><b>Population:</b> ${item.population}</p>
    <p class ="item"><b>Languages:</b> ${Object.values(item.languages)}</p>`).join('');
    return dataItem;
}

function onInput() {
  inputValue = refs.input.value.trim();
  if (inputValue === '') {
    refs.countryList.innerHTML ='';
    refs.countryInfo.innerHTML = '';
    return};
  getDataServer(inputValue).then(data => {
   
      if (data.length >= 10) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return
      }
    if (data.length > 1) {
      refs.countryList.innerHTML ='';
      refs.countryInfo.innerHTML = '';
      refs.countryList.insertAdjacentHTML('afterbegin', contryList(data));
      return;
    }
    refs.countryList.innerHTML = '';
    
    refs.countryInfo.innerHTML = dataItem(data);
  }).catch(()=>{
    Notiflix.Notify.failure("Oops, there is no country with that name");
  })
}


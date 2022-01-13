import './css/styles.css';
import debounce from 'lodash.debounce';
import getDataServer from './fetchCountries';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;
refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const inputValue = refs.input.value;
  getDataServer(inputValue).then(data => {
    const markup = data
      .map(
        item => `<li>
   <img src="${item.flags.svg}">
 </li>`,
      )
      .join('');
    const dataItem = data
      .map(
        item => `<li>
   <img src="${item.flags.svg}">
 </li>`,
      )
      .join('');

    if (data.length > 1) {
      refs.countryList.insertAdjacentHTML('afterbegin', markup);
    }
    if (data.length > 10) {
      alert('Too many matches found. Please enter a more specific name.');
    }
    // if (data.length === 1) {
    //   refs.countryInfo.innerHTML();
    // }
  });
}

//     const markup = Object.entries data
//       .map(
//         item => `<li>
//   <a href="${item}"></a>
// </li>`,
//       )
//       .join('');
//     refs.countryInfo.insertAdjacentHTML('afterbegin', markup);

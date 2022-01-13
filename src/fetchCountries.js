const baseUrl = 'https://restcountries.com/v3.1/name/';
const params = '?fields=name,capital,population,flags,languages';

const getDataServer = function getDataServer(url) {
  console.log(url);
  return fetch(baseUrl + url + params).then(response => response.json());
};

export default getDataServer;

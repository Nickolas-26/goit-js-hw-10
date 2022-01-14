const baseUrl = 'https://restcountries.com/v3.1/name/';
const params = '?fields=name,capital,population,flags,languages';

const getDataServer = function getDataServer(url) {
  return fetch(baseUrl + url + params).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
}

export default getDataServer;


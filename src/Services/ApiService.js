const API_KEY = 'a514454bee8cd925643caa1318bae63d';
const BASE_URL = 'https://api.themoviedb.org/3/';

function fetchTrendingMovies() {
  return fetch(`${BASE_URL}trending/all/day?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(response => {
      //   console.log('response from fetch trending', response);
      return response.results;
    });
}

function fetchSearchByName(query, page) {
  return fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${query}&include_adult=false`,
  )
    .then(response => response.json())
    .then(response => {
      //   console.log('response from fetch searching', response);
      return response.results;
    });
}

const api = {
  fetchTrendingMovies,
  fetchSearchByName,
};
export default api;

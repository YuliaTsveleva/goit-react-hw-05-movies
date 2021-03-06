import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = 'a514454bee8cd925643caa1318bae63d';
const BASE_URL = 'https://api.themoviedb.org/3/';

function fetchTrendingMovies() {
  return fetch(`${BASE_URL}trending/all/day?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(response => {
      return response.results;
    })
    .catch(error => console.log(error));
}

function fetchSearchByName(query, page) {
  return fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${query}&include_adult=false`,
  )
    .then(response => response.json())
    .then(response => {
      if (response.total_results === 0) {
        return toast.error('No movies matching your request!');
      }
      let results = response.results;
      let total = response.total_pages;
      return { results, total };
    })
    .catch(error => console.log(error));
}

function fetchMovieById(movieId) {
  return fetch(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
    .then(response => {
      if (response.status === 200) return response.json();
    })
    .then(response => {
      return response;
    })
    .catch(error => console.log(error));
}

function fetchCastById(movieId) {
  return fetch(
    `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  )
    .then(response => {
      if (response.status === 200) return response.json();
    })
    .then(response => {
      return response;
    })
    .catch(error => console.log(error));
}

function fetchReviewsById(movieId) {
  return fetch(
    `${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`,
  )
    .then(response => {
      if (response.status === 200) return response.json();
    })
    .then(response => {
      return response;
    })
    .catch(error => console.log(error));
}

const api = {
  fetchTrendingMovies,
  fetchSearchByName,
  fetchMovieById,
  fetchCastById,
  fetchReviewsById,
};
export default api;

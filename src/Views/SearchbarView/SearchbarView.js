import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import s from './SearchbarView.module.css';
import { BiSearchAlt } from 'react-icons/bi';
import FoundMoviesView from '../FoundMoviesView/FoundMoviesView';
import api from '../../Services/ApiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) return;
    // console.log(query);
    api.fetchSearchByName(query, page).then(results => {
      // console.log('results from foundmovies', results);
      setMovies(prev => [...prev, ...results]);
      return results;
    });
  }, [query, page]);

  const handleNameChange = e => {
    setMovieName(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(movieName);
    // console.log(query);
    if (movieName.toLowerCase().trim() === '') {
      return toast.warning('Enter your request please!');
    }
    setQuery(movieName);

    setPage(1);
    setMovies([]);
    setMovieName('');
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
    toSmoothScroll();
  };

  const toSmoothScroll = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  return (
    <>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>
            <BiSearchAlt size={30} />
          </span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          value={movieName}
          onChange={handleNameChange}
        />
      </form>
      <FoundMoviesView movies={movies} loadMore={loadMore} />
    </>
  );
}

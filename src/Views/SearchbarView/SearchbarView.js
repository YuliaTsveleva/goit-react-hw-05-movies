import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSearchAlt } from 'react-icons/bi';
import s from './SearchbarView.module.css';
import api from '../../Services/ApiService';
import FoundMoviesView from '../FoundMoviesView/FoundMoviesView';
import Loader from '../../Components/Loader/Loader';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!location.search && !query) return;
    if (location.search) {
      setQuery(location.search.slice(7));
    }
    setLoading(true);
    api.fetchSearchByName(query, page).then(data => {
      if (!data.results) {
        setLoading(false);
        return;
      }
      setMovies(prev => [...prev, ...data.results]);
      setTotal(data.total);
      setLoading(false);
      if ((page === 1 && data.results.length < 20) || page === data.total) {
        return toast.warning(`It's all movies matching your request!`);
      }
      return data.results;
    });
  }, [query, page, location.search]);

  const handleNameChange = e => {
    setMovieName(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (movieName.toLowerCase().trim() === '') {
      return toast.warning('Enter your request please!');
    }
    setQuery(movieName);
    setPage(1);
    setMovies([]);
    setMovieName('');

    history.push({
      ...location,
      search: `query=${movieName}`,
    });
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
    setLoading(true);
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

  const isAvailableMore = page < total;

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
      <FoundMoviesView
        movies={movies}
        loadMore={loadMore}
        isAvailableMore={isAvailableMore}
        loading={loading}
      />
      {loading && <Loader />}
    </>
  );
}

import { useState, useEffect } from 'react';
import s from './HomepageView.module.css';
import api from '../../Services/ApiService';
import Gallery from '../../Components/Gallery/Gallery';
import Loader from '../../Components/Loader/Loader';

export default function Homepage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.fetchTrendingMovies().then(results => {
      setMovies(results);
      setLoading(false);
      return results;
    });
  }, []);

  return (
    <>
      <h1 className={s.Trending}>Trending today</h1>
      <Gallery movies={movies} />
      {loading && <Loader />}
    </>
  );
}

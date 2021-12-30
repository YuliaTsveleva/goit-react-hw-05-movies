import { useState, useEffect } from 'react';
import api from '../../Services/ApiService';
import Gallery from '../../Components/Gallery/Gallery';
// import s from './Homepage.module.css';
import Loader from '../../Components/Loader/Loader';

export default function Homepage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.fetchTrendingMovies().then(results => {
      // console.log('results from homepage', results);
      setMovies(results);
      setLoading(false);
      return results;
    });
  }, []);

  return (
    <>
      <Gallery movies={movies} />
      {loading && <Loader />}
    </>
  );
}

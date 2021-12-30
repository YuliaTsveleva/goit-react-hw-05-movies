import { useState, useEffect } from 'react';
import api from '../../Services/ApiService';
import Gallery from '../../Components/Gallery/Gallery';
// import s from './Homepage.module.css';

export default function Homepage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.fetchTrendingMovies().then(results => {
      // console.log('results from homepage', results);
      setMovies(results);
      return results;
    });
  }, []);

  return <Gallery movies={movies} />;
}

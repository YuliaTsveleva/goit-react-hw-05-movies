// import { useState, useEffect } from 'react';
// import api from '../../Services/ApiService';
import Gallery from '../../Components/Gallery/Gallery';
import s from './FoundMoviesView.module.css';
import Button from '../../Components/Button/Button';
import PropTypes from 'prop-types';

export default function FoundMoviesView({ movies, loadMore }) {
  //   console.log('movies from searching', movies);
  //   console.log('loadMore', loadMore);

  return (
    <div className={s.Wrapper}>
      <Gallery movies={movies} />
      {movies.length > 0 && <Button loadMore={loadMore} />}
    </div>
  );
}

FoundMoviesView.propTypes = {
  movies: PropTypes.array,
};

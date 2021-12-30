// import { useState, useEffect } from 'react';
// import api from '../../Services/ApiService';
import Gallery from '../../Components/Gallery/Gallery';
import s from './FoundMoviesView.module.css';
import Button from '../../Components/Button/Button';
import PropTypes from 'prop-types';
import { BiChevronUpSquare } from 'react-icons/bi';
export default function FoundMoviesView({
  movies,
  loadMore,
  isAvailableMore,
  loading,
}) {
  // console.log('movies from FoundMoviesView', movies);
  //   console.log('loadMore', loadMore);
  // if (!movies) return;

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={s.Wrapper}>
      <Gallery movies={movies} loading={loading} />
      {movies.length > 0 && isAvailableMore && <Button loadMore={loadMore} />}
      {movies.length > 20 && (
        <button className={s.ButtonUp} onClick={scrollUp}>
          <BiChevronUpSquare size="30" />
        </button>
      )}
    </div>
  );
}

FoundMoviesView.propTypes = {
  movies: PropTypes.array,
  loadMore: PropTypes.func,
  isAvailableMore: PropTypes.bool,
  loading: PropTypes.bool,
};

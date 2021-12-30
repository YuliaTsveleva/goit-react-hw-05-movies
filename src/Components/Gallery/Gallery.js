import s from './Gallery.module.css';
import PropTypes from 'prop-types';
import Movie from '../Movie/Movie';

export default function Gallery({ movies }) {
  //   console.log('movies from Gallery', movies);

  return (
    <ul className={s.Gallery}>
      {movies &&
        movies.map(movie => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.original_title ?? movie.original_name}
            src={movie.poster_path ?? movie.backdrop_path}
            date={movie.release_date ?? movie.first_air_date}
            vote={movie.vote_average}
          />
        ))}
    </ul>
  );
}

Gallery.propTypes = {
  movies: PropTypes.array,
};

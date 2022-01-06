import s from './Gallery.module.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import Movie from '../Movie/Movie';

export default function Gallery({ movies }) {
  return (
    <ul className={s.Gallery}>
      {movies &&
        movies.map(movie => (
          <Movie
            key={nanoid()}
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
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      original_title: PropTypes.string,
      original_name: PropTypes.string,
      poster_path: PropTypes.string,
      backdrop_path: PropTypes.string,
      vote_average: PropTypes.number,
    }),
  ),
};

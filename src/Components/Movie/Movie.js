import s from './Movie.module.css';
import PropTypes from 'prop-types';
import { BiLike } from 'react-icons/bi';
import { BiLowVision } from 'react-icons/bi';

export default function Movie({ id, title, src, date, vote }) {
  return (
    <li className={s.MovieItem}>
      <h2 className={s.MovieTitle}>{title}</h2>
      {src ? (
        <img
          id={id}
          src={`https://image.tmdb.org/t/p/w500${src}`}
          alt={title}
          className={s.MovieImage}
        />
      ) : (
        <BiLowVision size="100" className={s.NoImageIcon} />
      )}

      <div className={s.Description}>
        <p className={s.Date}>{date.substr(0, 4)}</p>
        <p className={s.Vote}>
          <BiLike size="15" className={s.Icon} />
          {vote}
        </p>
      </div>
    </li>
  );
}

Movie.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  src: PropTypes.string,
  date: PropTypes.string,
  vote: PropTypes.number,
};

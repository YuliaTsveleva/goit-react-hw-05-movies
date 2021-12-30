import s from './Movie.module.css';
import PropTypes from 'prop-types';
import { BiLike } from 'react-icons/bi';
import { BiLowVision } from 'react-icons/bi';
import { Link /*useRouteMatch*/ } from 'react-router-dom';

export default function Movie({ id, title, src, date, vote }) {
  // const { url } = useRouteMatch();
  return (
    <li className={s.MovieItem}>
      {/* <Link to={`${url}/${id}`}> */}
      <Link to={`movies/${id}`}>
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
          {date && <p className={s.Date}>{date.substr(0, 4)}</p>}

          <p className={s.Vote}>
            <BiLike size="15" className={s.Icon} />
            {vote}
          </p>
        </div>
      </Link>
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

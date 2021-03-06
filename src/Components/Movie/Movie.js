import { useLocation } from 'react-router-dom';
import s from './Movie.module.css';
import PropTypes from 'prop-types';
import { BiLike } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import noImage from '../../images/no-image.svg';

export default function Movie({ id, title, src, date, vote }) {
  const location = useLocation();

  return (
    <li className={s.MovieItem}>
      <Link
        to={{
          pathname: `movies/${slugify(`${title} ${id}`, {
            lower: true,
            strict: true,
          })}`,
          state: { from: location },
        }}
      >
        <h2 className={s.MovieTitle}>{title}</h2>
        <img
          id={id}
          src={src ? `https://image.tmdb.org/t/p/w500${src}` : noImage}
          alt={title}
          className={src ? s.MovieImage : s.NoImage}
          loading="lazy"
        />
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

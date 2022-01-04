import { useState, useEffect, useRef } from 'react';
import {
  useParams,
  NavLink,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import api from '../../Services/ApiService';
import { BiGroup, BiMessageAltDetail, BiArrowFromBottom } from 'react-icons/bi';
import s from './MovieDetailsView.module.css';
import Loader from '../../Components/Loader/Loader';
import Cast from '../../Components/Cast/Cast';
import Reviews from '../../Components/Reviews/Reviews';
import noImage from '../../images/no-image.svg';

export default function MovieDetailsView() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const startLocation = useRef(location);

  useEffect(() => {
    api.fetchMovieById(movieId).then(movie => {
      setMovie(movie);
      setLoading(false);
    });
  }, [movieId]);

  let label;

  if (startLocation.current.state && startLocation.current.state.from.search) {
    startLocation.current.state.from.label = 'search';
    label = startLocation.current.state.from.label;
  }

  const onGoBack = () => {
    if (startLocation.current.state) {
      const search = startLocation.current.state.from.search;
      // const pathname = startLocation.current.state.from.pathname;
      history.push(search ? '/movies' + search : '/');
    } else {
      history.push('/');
    }
  };

  const date = movie.release_date ?? movie.first_air_date;

  return (
    <>
      {loading && <Loader />}
      {movie && (
        <>
          <button
            className={
              label && label === 'search' ? s.BackToSearch : s.BackButton
            }
            onClick={onGoBack}
          >
            <BiArrowFromBottom
              size="30"
              // className={label === 'search' ? s.BackToSearch : s.BackToHome}
            />
          </button>
          <div className={s.MovieDetails}>
            <h1 className={s.MovieName}>
              {movie.original_title ?? movie.original_name}
            </h1>
            <div className={s.Wrapper}>
              <img
                id={movieId}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : noImage
                }
                alt={movie.original_title ?? movie.original_name}
                className={movie.poster_path ? s.MovieImage : s.NoImage}
                loading="lazy"
              />

              <div className={s.DescrWrapper}>
                <p>
                  <span className={s.DescrTitle}>Overview: </span>
                  {movie.overview}
                </p>
                {movie.release_date ?? movie.first_air_date ? (
                  <p>
                    <span className={s.DescrTitle}>Release year: </span>
                    {date.substr(0, 4)}
                  </p>
                ) : (
                  <p className={s.DescrTitle}> No release year</p>
                )}
                {movie.vote_average ? (
                  <p>
                    <span className={s.DescrTitle}>Rating: </span>
                    {movie.vote_average}
                  </p>
                ) : (
                  <p className={s.DescrTitle}> No rating</p>
                )}
                {movie.genres ? (
                  <ul className={s.JenresList}>
                    <span className={s.DescrTitle}>Jenres:</span>
                    {movie.genres.map(genre => (
                      <li key={genre.id}>{`${genre.name}`}</li>
                    ))}
                  </ul>
                ) : (
                  <p className={s.DescrTitle}> No jenres</p>
                )}
                <ul className={s.LinksList}>
                  <li>
                    <NavLink
                      to={{
                        pathname: `${url}/cast`,
                        state: { from: location },
                      }}
                      className={s.Link}
                      activeClassName={s.ActiveLink}
                    >
                      <BiGroup size="30" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={{
                        pathname: `${url}/reviews`,
                        state: { from: location },
                      }}
                      className={s.Link}
                      activeClassName={s.ActiveLink}
                    >
                      <BiMessageAltDetail size="30" />
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Route path="/movies/:movieId/cast">
            <Cast />
          </Route>
          <Route path="/movies/:movieId/reviews">
            <Reviews />
          </Route>
        </>
      )}
    </>
  );
}

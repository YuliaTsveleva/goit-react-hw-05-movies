import { useState, useEffect } from 'react';
import {
  useParams,
  NavLink,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import api from '../../Services/ApiService';
import {
  BiLowVision,
  BiGroup,
  BiMessageAltDetail,
  BiArrowToLeft,
} from 'react-icons/bi';
import s from './MovieDetailsView.module.css';
import Loader from '../../Components/Loader/Loader';
import Cast from '../../Components/Cast/Cast';
import Reviews from '../../Components/Reviews/Reviews';

export default function MovieDetailsView() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  // console.log('url from useRouteMatch from MovieDetailsView', url);
  console.log('location from MovieDetailsView', location);

  useEffect(() => {
    api.fetchMovieById(movieId).then(movie => {
      // console.log('data from details page', movie);
      setMovie(movie);
      setLoading(false);
      //   return setMovie({});
    });
  }, [movieId]);

  // console.log('movie from state in details page', movie);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/movies');
  };

  const date = movie.release_date ?? movie.first_air_date;

  return (
    <>
      {/* <p>{`Movie ${movieId}`}</p> */}
      {loading && <Loader />}
      {movie && (
        <>
          <button className={s.BackButton} onClick={onGoBack}>
            <BiArrowToLeft size="30" />
          </button>
          <div className={s.MovieDetails}>
            <h1 className={s.MovieName}>
              {movie.original_title ?? movie.original_name}
            </h1>
            <div className={s.Wrapper}>
              {movie.poster_path || movie.backdrop_path ? (
                <img
                  id={movieId}
                  src={`https://image.tmdb.org/t/p/w500${
                    movie.poster_path ?? movie.backdrop_path
                  }`}
                  alt={movie.original_title ?? movie.original_name}
                  className={s.MovieImage}
                />
              ) : (
                <BiLowVision size="200" className={s.Icon} />
              )}
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
                    <NavLink to={`${url}/cast`} activeClassName={s.ActiveLink}>
                      <BiGroup size="30" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`${url}/reviews`}
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

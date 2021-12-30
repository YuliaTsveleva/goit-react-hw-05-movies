import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../Services/ApiService';
import { BiLowVision } from 'react-icons/bi';
import s from './MovieDetailsView.module.css';
import Loader from '../../Components/Loader/Loader';

export default function MovieDetailsView() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.fetchMovieById(movieId).then(movie => {
      console.log('data from details page', movie);
      setMovie(movie);
      setLoading(false);
      //   return setMovie({});
    });
  }, [movieId]);

  console.log('movie from state in details page', movie);

  const date = movie.release_date ?? movie.first_air_date;

  return (
    <>
      {/* <p>{`Movie ${movieId}`}</p> */}
      {loading && <Loader />}
      {movie && (
        <div className={s.MovieDetails}>
          <h1>{movie.original_title ?? movie.original_name}</h1>{' '}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

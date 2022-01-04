import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import s from './Cast.module.css';
import api from '../../Services/ApiService';
import Actor from '../Actor/Actor';
import Loader from '../Loader/Loader';

export default function Cast() {
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.fetchCastById(movieId).then(data => {
      setCast(data.cast);
      setLoading(false);
    });
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {cast && (
        <ul className={s.ActorsList}>
          {cast.map(actor => (
            <Actor key={actor.id} name={actor.name} src={actor.profile_path} />
          ))}
        </ul>
      )}
    </>
  );
}

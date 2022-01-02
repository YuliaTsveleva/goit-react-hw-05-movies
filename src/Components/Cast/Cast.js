import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../Services/ApiService';
import Actor from '../Actor/Actor';
import s from './Cast.module.css';
import Loader from '../Loader/Loader';

export default function Cast() {
  const { movieId } = useParams();
  //   console.log('movieId from Cast', movieId);
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(true);
  // const location = useLocation();
  // const history = useHistory();

  // console.log('prop from in cast', from);

  // console.log('location from cast', location);
  // console.log('history from cast', history);

  useEffect(() => {
    api.fetchCastById(movieId).then(data => {
      //   console.log('data', data);
      //   console.log('data.cast', data.cast);
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

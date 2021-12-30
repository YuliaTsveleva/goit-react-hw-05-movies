import s from './Actor.module.css';
import { BiLowVision } from 'react-icons/bi';

export default function Actor({ name, src }) {
  return (
    <li className={s.ActorItem}>
      {name && <h2 className={s.ActorName}>{name}</h2>}{' '}
      {src ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${src}`}
          alt={name}
          className={s.ActorImage}
        />
      ) : (
        <BiLowVision size="100" className={s.Icon} />
      )}
    </li>
  );
}

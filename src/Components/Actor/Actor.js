import s from './Actor.module.css';
import noImage from '../../images/no-image.svg';

export default function Actor({ name, src }) {
  return (
    <li className={s.ActorItem}>
      {name && <h2 className={s.ActorName}>{name}</h2>}
      <img
        src={src ? `https://image.tmdb.org/t/p/w500${src}` : noImage}
        alt={name}
        className={s.ActorImage}
        loading="lazy"
      />
    </li>
  );
}

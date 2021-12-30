import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import { BiHomeAlt } from 'react-icons/bi';
import { BiFilm } from 'react-icons/bi';

export default function Navigation() {
  return (
    <nav>
      <NavLink to="/" exact className={s.Link} activeClassName={s.ActiveLink}>
        <BiHomeAlt size="30" />
      </NavLink>

      <NavLink to="/movies" className={s.Link} activeClassName={s.ActiveLink}>
        <BiFilm size="30" />
      </NavLink>
    </nav>
  );
}

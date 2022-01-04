import s from './Header.module.css';
import Navigation from '../Navigation/Navigation';

export default function Header() {
  return (
    <div className={s.Header}>
      <Navigation />
    </div>
  );
}

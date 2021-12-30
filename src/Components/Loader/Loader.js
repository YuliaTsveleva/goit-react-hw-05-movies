import s from './Loader.module.css';
import { BiLoader } from 'react-icons/bi';

export default function PendingView() {
  return (
    <p className={s.Loading}>
      <BiLoader size="100" className={s.IconSpinner} />
    </p>
  );
}

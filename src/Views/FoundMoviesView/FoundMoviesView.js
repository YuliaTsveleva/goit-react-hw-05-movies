import PropTypes from 'prop-types';
import { BiChevronUpSquare } from 'react-icons/bi';
import s from './FoundMoviesView.module.css';
import Gallery from '../../Components/Gallery/Gallery';
import Button from '../../Components/Button/Button';
export default function FoundMoviesView({ movies, loadMore, isAvailableMore }) {
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={s.Wrapper}>
      <Gallery movies={movies} />
      {movies.length > 0 && isAvailableMore && <Button loadMore={loadMore} />}
      {movies.length > 20 && (
        <button className={s.ButtonUp} onClick={scrollUp}>
          <BiChevronUpSquare size="30" />
        </button>
      )}
    </div>
  );
}

FoundMoviesView.propTypes = {
  movies: PropTypes.array,
  loadMore: PropTypes.func,
  isAvailableMore: PropTypes.bool,
};

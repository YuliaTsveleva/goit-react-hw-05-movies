import PropTypes from 'prop-types';
import { useState } from 'react';
import s from './ReviewItem.module.css';

export default function ReviewItem({ author, text, number }) {
  const [review, setReview] = useState(text.substr(0, 500));
  //   console.log(text.length);
  //   console.log(number);
  const readMore = e => {
    setReview(text);
    // console.dir(e.target);
    e.target.disabled = true;
    e.target.classList.add('visually-hidden');
  };

  return (
    <div className={s.ReviewWrapper}>
      <h3 className={s.Author}>{`${number}. ${author}`}</h3>
      {text.length < 500 && <p className={s.Text}>{text}</p>}
      {text.length > 500 && (
        <>
          <p className={s.Text}>
            {review}
            <span>
              ...
              <button className={s.ReadMoreButton} onClick={readMore}>
                read more
              </button>
            </span>
          </p>
        </>
      )}
    </div>
  );
}

ReviewItem.propTypes = {
  author: PropTypes.string,
  text: PropTypes.string,
};

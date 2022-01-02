import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../Services/ApiService';
import s from './Reviews.module.css';
import ReviewItem from '../../Components/ReviewItem/ReviewItem';
import Loader from '../Loader/Loader';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.fetchReviewsById(movieId).then(data => {
      setReviews(data.results);
      setLoading(false);
    });
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {reviews && reviews !== [] ? (
        <>
          {reviews.length !== 0 ? (
            <h2>{`There are ${reviews.length} reviews about this movie`}</h2>
          ) : (
            <h2>{`No reviews about this movie`}</h2>
          )}

          <ul className={s.ReviewsList}>
            {reviews.map(review => (
              <ReviewItem
                key={review.id}
                author={review.author}
                text={review.content}
                number={reviews.indexOf(review) + 1}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>No reviews</p>
      )}
    </>
  );
}

import fetchMovieReviews from 'Services/FetchMovieReviews-api';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import MagnifyingGlassLodaer from './Loader/Loader';
import moment from 'moment/moment';

const { useParams } = require('react-router-dom');

const Reviews = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchMovieReviews(movieId)
      .then(res => {
        console.log('reviews', res.results);
        return setReviews([...res.results]);
      })
      .catch(err => toast.warn(err))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <>
      {loading ? (
        <MagnifyingGlassLodaer />
      ) : (
        <>
          <div>Review {movieId}</div>
          <ul>
            {reviews.map(({ author, id, content, created_at }) => {
              return (
                <li key={id}>
                  <h4>
                    Author: {author} {''}
                    {created_at.slice(0, -14)} at {created_at.slice(11, -5)}
                  </h4>
                  <p>{content}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default Reviews;

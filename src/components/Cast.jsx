import { useEffect, useState } from 'react';
import fetchMovieCast from 'Services/FetchMovieCast-api';
import { toast } from 'react-toastify';
const { useParams } = require('react-router-dom');

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchMovieCast(movieId)
      .then(({ id, cast, crew }) => {
        return setCast({ id, cast, crew });
      })
      .catch(err => toast.warn(err))
      .finally(() => setLoading(false));
  }, [movieId]);

  return <div>Cast {cast}</div>;
};

export default Cast;

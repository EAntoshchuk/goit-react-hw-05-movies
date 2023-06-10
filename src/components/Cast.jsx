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
      .then(res => {
        console.log('cast', res);
        return setCast([...res]);
      })
      .catch(err => toast.warn(err))
      .finally(() => setLoading(false));
  }, [movieId, cast]);

  return cast?.length ? (
    <>
      <div>Cast</div>
      <ul>
        {cast?.map(
          actor =>
            actor.profile_path && (
              <li key={actor.cast_id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  alt={actor.name}
                />
                <p>{actor.character}</p>
                <p>{actor.name}</p>
              </li>
            )
        )}
      </ul>
    </>
  ) : (
    <p>Sorry, there is no info</p>
  );
};

export default Cast;

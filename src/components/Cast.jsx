import { useEffect, useState } from 'react';
import fetchMovieCast from 'Services/FetchMovieCast-api';
import { toast } from 'react-toastify';
import MagnifyingGlassLodaer from './Loader/Loader';
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
        return setCast([...res.cast]);
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
          <div>Cast</div>
          <ul>
            {cast.map(({ character, id, name, profile_path }) => {
              return (
                <li key={id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                    alt={name}
                  />
                  <div>
                    <p>{name}</p>
                    <p>{character}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default Cast;

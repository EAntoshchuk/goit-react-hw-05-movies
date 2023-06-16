import { useEffect, useState } from 'react';
import fetchMovieCast from 'Services/FetchMovieCast-api';
import { toast } from 'react-toastify';
import MagnifyingGlassLodaer from '../Loader/Loader';
import css from './Cast.module.css';
const { useParams } = require('react-router-dom');

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchMovieCast(movieId)
      .then(res => {
        // console.log('cast', res);
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
          <ul className={css.list}>
            {cast.map(({ character, id, name, profile_path }) => {
              return (
                <li key={id} className={css.list_item}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                    alt={name}
                    loading="lazy"
                    className={css.image}
                  />
                  <div>
                    <p className={css.title}>{name}</p>
                    <p className={css.title}>{character}</p>
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

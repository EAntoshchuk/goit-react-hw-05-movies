import fetchSearchedMovies from 'Services/FetchSearchedMovies-api';
import MagnifyingGlassLodaer from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const request = searchParams.get('request') ?? '';
  // const [request, setRequest] = useState('');
  // const searchedMovies = movies.filter(movie => movie.includes(request));
  const [loading, setLoading] = useState(false);

  const updateQueryString = evt => {
    evt.preventDefault();
    const request = evt.target.value;
    if (request === '') {
      toast.warn('Enter search request plese');
      return setSearchParams({});
    }
    setSearchParams({ request });
  };

  useEffect(() => {
    if (request !== '') {
      setLoading(true);
      fetchSearchedMovies(request)
        .then(res => {
          console.log('searchFetch', res);
          setMovies([...res.results]);
        })
        .catch(err => toast.warn(err))
        .finally(() => setLoading(false));
    }
  }, [request]);

  return (
    <>
      {loading ? (
        <MagnifyingGlassLodaer />
      ) : (
        <>
          <div>
            <input type="text" value={request} onChange={updateQueryString} />
            <button onClick={() => setSearchParams({ request })}>
              Search movie
            </button>
            {movies.map(
              ({
                adult,
                backdrop_path,
                genre_ids,
                id,
                original_language,
                original_title,
                overview,
                popularity,
                poster_path,
                release_date,
                title,
                video,
                vote_average,
                vote_count,
              }) => {
                return (
                  <li key={id}>
                    <Link to={`${movies}`} state={{ from: location }}>
                      {poster_path}
                    </Link>
                  </li>
                );
              }
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Movies;

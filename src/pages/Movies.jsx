import fetchSearchedMovies from 'Services/FetchSearchedMovies-api';
import MagnifyingGlassLodaer from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DebounceInput } from 'react-debounce-input';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const request = searchParams.get('request') ?? '';
  const [query, setQuery] = useState('');
  // const [request, setRequest] = useState('');
  // const searchedMovies = movies.filter(movie => movie.includes(request));
  const [loading, setLoading] = useState(false);

  const handleSubmit = evt => {
    evt.preventDefault();
    const request = evt.target.value.trim();
    console.log('searchrequest', request);
    if (request === '') {
      return toast.warn('Enter search request please');
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
            <input
              type="text"
              name="search"
              valuealue={request}
              onChange={handleSubmit}
            />
            <button
              type="submit"
              onClick={() => setSearchParams({ request: request })}
            >
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
                    <Link to={`/movies/${id}`} state={{ from: location }}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                        alt={title}
                      />

                      <h4>
                        {title}
                        <p>Release date: {release_date.slice(0, -6)}</p>
                      </h4>
                      <h5>Rating: {vote_average}</h5>
                      <h5>Votes: {vote_count}</h5>
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

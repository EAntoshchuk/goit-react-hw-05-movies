import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import fetchSearchedMovies from 'Services/FetchSearchedMovies-api';
import SearchForm from 'components/SearchForm/SearchForm';
import MagnifyingGlassLodaer from 'components/Loader/Loader';
import css from './Movies.module.css';
import noPoster from '../../Images/no_poster_available.jpg';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const request = searchParams.get('request') ?? '';
  // const [query, setQuery] = useState('');
  // const [request, setRequest] = useState('');
  // const searchedMovies = movies.filter(movie => movie.includes(request));
  const [loading, setLoading] = useState(false);

  const handleSubmit = evt => {
    evt.preventDefault();
    const request = evt.target.value;
    console.log('searchrequest', request);
    if (request === '') {
      return toast.warn('Enter search request please');
    }
    setSearchParams({ request });
  };

  // const updateQueryString = movie => {
  //   const nextMovie = movie !== '' ? { movie } : {};
  //   setSearchParams(nextMovie);
  // };

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
            <SearchForm request={request} handleSubmit={handleSubmit} />
            <div className={css.list_container}>
              {movies.map(
                ({
                  id,
                  overview,
                  poster_path,
                  release_date,
                  title,
                  vote_average,
                  vote_count,
                }) => {
                  return (
                    <li key={id} className={css.list_item}>
                      <Link to={`/movies/${id}`} state={{ from: location }}>
                        <img
                          src={
                            poster_path
                              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                              : noPoster
                          }
                          alt={title}
                          loading="lazy"
                          className={css.image}
                        />
                      </Link>
                      <h4 className={css.title}>{title}</h4>
                      <p className={css.description}>
                        Release date: {release_date.slice(0, -6)}
                      </p>
                      <p className={css.description}>Rating: {vote_average}</p>
                      <p className={css.description}>Votes: {vote_count}</p>
                      <p className={css.description}>Overview: {overview}</p>
                    </li>
                  );
                }
              )}
            </div>
            <ToastContainer autoClose={3000} theme="colored" />
          </div>
        </>
      )}
    </>
  );
};

export default Movies;

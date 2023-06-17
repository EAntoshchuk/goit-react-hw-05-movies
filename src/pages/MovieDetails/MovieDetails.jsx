import { useRef, useEffect, useState, Suspense } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import fetchMovieDetails from 'Services/FetchMovieDetails-api';
import MagnifyingGlassLodaer from 'components/Loader/Loader';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkLocation = useRef(location.state?.from ?? '/movies');

  console.log('location', location);
  console.log('backLinkLocation', backLinkLocation);

  useEffect(() => {
    setLoading(true);
    fetchMovieDetails(movieId)
      .then(setMovies)
      .catch(err => toast.warn(err))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    movies && (
      <>
        {loading && <MagnifyingGlassLodaer />}
        <Link to={backLinkLocation.current}>Back to movies</Link>
        <h2 className={css.title}>MovieDetails: {movies.title}</h2>
        <div>
          <div className={css.description_container}>
            <img
              src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
              alt={movies.title}
              loading="lazy"
              className={css.image}
            />
            <div>
              {/* <h2>{movies.title}</h2> */}
              <p>Release date: {movies.release_date}</p>
              <br />
              <p>Rating: {movies.vote_average}</p>
              <br />
              <p>Votes: {movies.vote_count}</p>
              <br />
              <h3>About the movie:</h3>
              {movies.overview}
              <br />
            </div>
          </div>

          <div>
            <ul>
              <li
                style={{
                  marginBottom: '8px',
                }}
              >
                <Link
                  to="cast"
                  style={{
                    fontSize: '18px',
                  }}
                >
                  Cast of {movies.title}
                </Link>
              </li>
              <li
                style={{
                  marginBottom: '8px',
                }}
              >
                <Link
                  to="reviews"
                  style={{
                    fontSize: '18px',
                  }}
                >
                  Reviews of {movies.title}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </>
    )
  );
};

export default MovieDetails;

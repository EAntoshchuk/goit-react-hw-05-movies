import { useRef, useEffect, useState, Suspense } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import fetchMovieDetails from 'Services/FetchMovieDetails-api';

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
        <Link to={backLinkLocation.current}>Back to movies</Link>
        <h2>MovieDetails: {movies.title}</h2>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
            alt={movies.title}
            loading="lazy"
            width="300px"
          />
          <div>
            {/* <h2>{movies.title}</h2> */}
            <p>Release date: {movies.release_date}</p>
            <p>Rating: {movies.vote_average}</p>
            <p>Votes: {movies.vote_count}</p>
            <h3>About the movie:</h3>
            <br />
            {movies.overview}
            <br />
          </div>
          <div>
            <ul>
              <li>
                <Link to="cast">Cast of {movies.title}</Link>
              </li>
              <li>
                <Link to="reviews">Reviews of {movies.title}</Link>
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

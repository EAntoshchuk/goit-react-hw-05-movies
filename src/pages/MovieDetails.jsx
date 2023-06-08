import { useRef, useEffect, useState } from 'react';
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
      .then(
        ({
          original_title,
          overview,
          popularity,
          poster_path,
          release_date,
          title,
          genres,
          vote_average,
        }) => {
          setMovies({
            original_title,
            overview,
            popularity,
            poster_path,
            release_date,
            title,
            genres,
            vote_average,
          });
        }
      )
      .catch(err => toast.warn(err))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <>
      <h2>MovieDetails: {movieId}</h2>
      <Link to={backLinkLocation.current}>Back to movies</Link>
      <ul>
        <li>
          <Link to="cast">cast {movieId}</Link>
        </li>
        <li>
          <Link to="reviews">reviews {movieId}</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default MovieDetails;

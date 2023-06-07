import { useRef } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkLocation = useRef(location.state?.from ?? '/movies');

  console.log('location', location);
  console.log('backLinkLocation', backLinkLocation);
  //     useEffect(() => {

  //   }, []);

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

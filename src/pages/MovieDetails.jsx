import { Link, Outlet, useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { movieId } = useParams();

  //     useEffect(() => {

  //   }, []);

  return (
    <>
      <h2>MovieDetails: {movieId}</h2>
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

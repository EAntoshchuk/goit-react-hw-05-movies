import { Link } from 'react-router-dom';
import { memo } from 'react';

const MoviesList = ({ movies, location }) => {
  console.log('movielist', movies);
  return movies.map(({ id, title, poster_path }) => (
    <li key={id}>
      <Link to={`/movies/${id}`} state={{ from: location }}>
        <img
          src={`https://image.tmdb.org/t/p/w500//${poster_path}`}
          alt={title}
        />
        {title}
      </Link>
    </li>
  ));
};

export default memo(MoviesList);

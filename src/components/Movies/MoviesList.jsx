import { Link } from 'react-router-dom';
import { memo } from 'react';

const MoviesList = ({ movies, location }) => {
  return movies.map(({ id, title }) => (
    <li key={id}>
      <Link to={`/movies/${id}`} state={{ from: location }}>
        {title}
      </Link>
    </li>
  ));
};

export default memo(MoviesList);

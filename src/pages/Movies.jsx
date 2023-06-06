import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([
    'movie-1',
    'movie-2',
    'movie-3',
    'movie-4',
    'movie-5',
  ]);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const movieId = searchParams.get('movieId') ?? '';

  const searchedMovies = movies.filter(movie => movie.includes(movieId));

  const updateQueryString = evt => {
    const movieIdValue = evt.target.value;
    if (movieIdValue === '') {
      return setSearchParams({});
    }
    setSearchParams({ movieId: movieIdValue });
  };

  return (
    <div>
      <input type="text" value={movieId} onChange={updateQueryString} />
      <button onClick={() => setSearchParams({ request: 'hello' })}>
        Search movie
      </button>
      {searchedMovies.map(movie => {
        return (
          <li key={movie}>
            <Link to={`${movie}`} state={{ from: location }}>
              {movie}
            </Link>
          </li>
        );
      })}
    </div>
  );
};

export default Movies;

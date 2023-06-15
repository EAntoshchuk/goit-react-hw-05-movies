import { Link } from 'react-router-dom';
import { memo } from 'react';
import css from './MoviesList.module.css';

const MoviesList = ({ movies, location }) => {
  console.log('movielist', movies);
  return movies.map(({ id, title, poster_path }) => (
    <li key={id} className={css.image}>
      <Link
        to={`/movies/${id}`}
        state={{ from: location }}
        className={css.link}
      >
        <div className={css.image_container}>
          <h2 className={css.title}>{title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500//${poster_path}`}
            alt={title}
            loading="lazy"
            className={css.image}
          />
        </div>
      </Link>
    </li>
  ));
};

export default memo(MoviesList);

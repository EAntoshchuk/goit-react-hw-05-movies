import css from './MobiseListContainer.module.css';

const MoviesListContainer = ({ children }) => {
  return <ul className={css.movie_list}>{children}</ul>;
};

export default MoviesListContainer;

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import fetchTrendMovies from 'Services/FetchTrendingMovies-api';
import MoviesList from 'components/MoviesList/MoviesList';
import MoviesListContainer from 'components/MovieListContainer/MobiseListContainer';
import ThreeDots from 'components/Loader/Loader';
import css from './Home.module.css';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    fetchTrendMovies()
      .then(res => {
        console.log('trend', res);
        return setTrendingMovies([...res.results]);
      })
      .catch(err => toast.warn(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading && <ThreeDots />}
      <ToastContainer autoClose={3000} theme="colored" />
      <h2 className={css.title}>Trending movies</h2>
      <MoviesListContainer>
        <MoviesList movies={trendingMovies} location={location} />
      </MoviesListContainer>
    </div>
  );
};

export default Home;

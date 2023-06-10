import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import fetchTrendMovies from 'Services/FetchTrendingMovies-api';
import MoviesList from 'components/Movies/Movies';

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
      {/* <ToastContainer autoClose={3000} theme="colored" /> */}
      <h2>Home page</h2>
      <ul>
        <MoviesList movies={trendingMovies} location={location} />
      </ul>
    </div>
  );
};

export default Home;

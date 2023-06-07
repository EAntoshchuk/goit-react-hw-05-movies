import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import fetchTrendMovies from 'Services/FetchTrendingMovies-api';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    fetchTrendMovies()
      .then(res => {
        return setTrendingMovies([res]);
      })
      .catch(err => toast.warn(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <ToastContainer autoClose={3000} theme="colored" />
      <div>Home page</div>;
      <ul>
        <li>{trendingMovies}</li>
      </ul>
    </>
  );
};

export default Home;

const FILMS = {
  trendingMovies: 'https://api.themoviedb.org/3/trending/movie/week',
};

const options = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjNkYTQ1YTEwNGRjYTU4ZDc3M2JmNTQ0ZDVlODIwOCIsInN1YiI6IjY0N2QwYmExMGZiMzk4MDBmYjBjMmM2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KDJPsTZkoNMuApXeHuLDhVRf-dxNEZvsUrnBZJOs1eI',
  },
};

function fetchTrendMovies() {
  return fetch(`${FILMS.trendingMovies}`, options).then(res => {
    if (!res.ok) {
      throw new Error('Something went wrong  🤔 ');
    }
    // console.log(res.json);
    return res.json();
  });
}

export default fetchTrendMovies;

const FILMS = {
  searchMovie: 'https://api.themoviedb.org/3/search/movie',
};

const options = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjNkYTQ1YTEwNGRjYTU4ZDc3M2JmNTQ0ZDVlODIwOCIsInN1YiI6IjY0N2QwYmExMGZiMzk4MDBmYjBjMmM2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KDJPsTZkoNMuApXeHuLDhVRf-dxNEZvsUrnBZJOs1eI',
  },
};

function fetchSearchedMovies(request) {
  return fetch(`${FILMS.searchMovie}?query=${request}`, options).then(res => {
    if (!res.ok) {
      throw new Error('Something went wrong  🤔 ');
    }
    // console.log(res.json);
    return res.json();
  });
}

export default fetchSearchedMovies;

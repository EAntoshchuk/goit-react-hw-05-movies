const BASE_URL = 'https://www.themoviedb.org/';
const API_KEY = '863da45a104dca58d773bf544d5e8208';

export default function fetchImages() {
  return fetch(`${BASE_URL}&key=${API_KEY}`).then(res => {
    if (!res.ok) {
      throw new Error('Something went wrong  🤔 ');
    }
    console.log(res.json);
    return res.json();
  });
}

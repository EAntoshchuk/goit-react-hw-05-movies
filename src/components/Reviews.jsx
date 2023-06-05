const { useParams } = require('react-router-dom');

const Reviews = () => {
  const { movieId } = useParams();

  // useEffect(() => {

  // }, [])

  return <div>Review {movieId}</div>;
};

export default Reviews;

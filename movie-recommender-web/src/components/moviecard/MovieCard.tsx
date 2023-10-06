import {
  MovieCardContainer,
  MovieImage,
  MovieInfo,
  MovieTitle,
} from "./MovieCard.style";
import movie from "../../assets/react.svg";

const MovieCard = () => {
  return (
    <MovieCardContainer>
      <MovieImage src={movie} />
      <MovieInfo>
        <MovieTitle>Avatar</MovieTitle>
      </MovieInfo>
    </MovieCardContainer>
  );
};

export default MovieCard;

import { FC } from "react";
import {
  MovieCardContainer,
  MovieImage,
  MovieInfo,
  MovieTitle,
} from "./MovieCard.style";

interface MovieCardProps {
  title: string;
  imageURL: string;
}

const MovieCard: FC<MovieCardProps> = ({ title, imageURL }) => {
  return (
    <MovieCardContainer>
      <MovieImage src={imageURL} />
      <MovieInfo>
        <MovieTitle>{title}</MovieTitle>
      </MovieInfo>
    </MovieCardContainer>
  );
};

export default MovieCard;

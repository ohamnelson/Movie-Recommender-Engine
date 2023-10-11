import {
  MovieCardContainer,
  MovieImage,
  MovieInfo,
  MovieTitle,
} from "./MovieCard.style";
import movie from "../../assets/react.svg";
import { FC, useEffect } from "react";

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

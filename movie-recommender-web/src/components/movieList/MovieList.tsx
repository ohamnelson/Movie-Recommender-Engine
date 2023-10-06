import React, { FC } from "react";
import { MovieListContainer } from "./MovieList.style";
import MovieCard from "../moviecard/MovieCard";

interface MovieListProps {
  movies: {
    name: string;
  };
}

const MovieList: FC = () => {
  return (
    <MovieListContainer>
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
    </MovieListContainer>
  );
};

export default MovieList;

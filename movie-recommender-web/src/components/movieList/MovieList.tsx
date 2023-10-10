import React, { FC, useEffect } from "react";
import { MovieListContainer } from "./MovieList.style";
import MovieCard from "../moviecard/MovieCard";
import { Movie } from "../../service/movieService";

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
}

const MovieList: FC<MovieListProps> = ({ movies, loading }) => {
  return (
    <>
      <br />
      {!loading && movies.length == 0 && (
        <p style={{ textAlign: "center" }}>
          Enter a movie title and we'll recommend something similar
        </p>
      )}
      {loading && (
        <p style={{ textAlign: "center" }}>
          Hang On. We're fetching similar movies you might like.
        </p>
      )}
      <MovieListContainer>
        {movies &&
          movies.map((movie) => (
            <>
              {movie.imageUrl}
              <MovieCard
                key={movie.title}
                title={movie.title}
                imageURL={movie.imageUrl}
              />
            </>
          ))}
      </MovieListContainer>
    </>
  );
};

export default MovieList;

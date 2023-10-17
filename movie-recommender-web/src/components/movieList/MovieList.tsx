import { FC } from "react";
import { MovieListContainer } from "./MovieList.style";
import MovieCard from "../moviecard/MovieCard";
import { Movie } from "../../service/movieService";

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  movieTitle: string;
}

const MovieList: FC<MovieListProps> = ({ movies, loading, movieTitle }) => {
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
          Hang On. We're fetching movies similar to{" "}
          <strong>
            <em>{movieTitle}</em>
          </strong>
          .
        </p>
      )}

      {movies.length > 0 && (
        <p style={{ textAlign: "center" }}>
          These are the movies similar to{" "}
          <strong>
            <em>{movieTitle}</em>
          </strong>
          .
        </p>
      )}
      <MovieListContainer>
        {movies &&
          movies.map((movie) => (
            <MovieCard
              key={movie.title}
              title={movie.title}
              imageURL={movie.link}
            />
          ))}
      </MovieListContainer>
    </>
  );
};

export default MovieList;

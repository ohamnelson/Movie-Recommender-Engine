import { FC, ReactElement, useState } from "react";
import SearchForm from "../../components/searchform/SearchForm";
import { Movie, MoviesData, getMovies } from "../../service/movieService";
import MovieList from "../../components/movieList/MovieList";
import MovieCard from "../../components/moviecard/MovieCard";

const Home: FC = (): ReactElement => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieTitle, setMovieTitle] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmission = async (movie: string, movieTitle: string) => {
    setLoading(true);
    setMovieTitle(movieTitle);
    setMovies(() => []);
    await getMovieRecommendations(movie);
  };

  const getMovieRecommendations = async (movie: string) => {
    const res = await getMovies(movie);
    console.log(res);
    if (res !== null) setLoading(false);
    setMovies([...res]);
  };

  return (
    <>
      <div className="hero">
        <h1 className="hero-text-primary my-1">Find Movies Similar to ...</h1>
        <div className="hero-search-box">
          <SearchForm sendMovieToParent={handleSubmission} />
        </div>
      </div>

      <section id="movies-cards">
        <MovieList movieTitle={movieTitle} loading={loading} movies={movies} />
      </section>
    </>
  );
};

export default Home;

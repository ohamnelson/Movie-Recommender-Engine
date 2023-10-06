import { FC, ReactElement, useState } from "react";
import SearchForm from "../../components/searchform/SearchForm";
import { getMovies } from "../../service/movieService";
import MovieList from "../../components/movieList/MovieList";

const Home: FC = (): ReactElement => {
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState({});

  const handleSubmission = (movie: string) => {
    setMovieName(movie);
  };

  const getMovieRecommendations = async () => {
    const movieList = await getMovies(movieName);
    setMovies({ ...movies });
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
        <MovieList />
      </section>
    </>
  );
};

export default Home;

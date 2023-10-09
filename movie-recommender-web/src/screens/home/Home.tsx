import { FC, ReactElement, useState } from "react";
import SearchForm from "../../components/searchform/SearchForm";
import { Movie, MoviesData, getMovies } from "../../service/movieService";
import MovieList from "../../components/movieList/MovieList";

const Home: FC = (): ReactElement => {
  const [movies, setMovies] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmission = async (movie: string) => {
    setLoading(true);
    await getMovieRecommendations(movie);
  };

  const getMovieRecommendations = async (movie: string) => {
    const res = await getMovies(movie);
    if (res) setLoading(false);
    const moviesArr = Object.keys(res).map((title) => ({
      title,
      imageURL: res[title],
    }));
    console.log(moviesArr);
    setMovies([...movies, ...moviesArr]);
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
        <MovieList loading={loading} movies={movies as Movie[]} />
      </section>
    </>
  );
};

export default Home;

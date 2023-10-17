import axios from "axios";

// `https://jsonplaceholder.typicode.com/posts`;
// `https://movie-recommendation-398607.ue.r.appspot.com/movies/${movieName}`;

export interface Movie {
  title: string;
  link: string;
}

export const getMovies = async (movieName: string): Promise<Movie[] | null> => {
  try {
    const response = await axios.get(
      `http://10.118.0.2:3133/movies/?title=${movieName}`
    );
    const movies = response.data as Movie[];
    return movies;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

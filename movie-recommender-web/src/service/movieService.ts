import axios from "axios";

// `https://jsonplaceholder.typicode.com/posts`;
// `https://movie-recommendation-398607.ue.r.appspot.com/movies/${movieName}`;

export interface Movie {
  title: string;
  imageUrl: string;
}

export interface MoviesData {
  [title: string]: string;
}

export const getMovies = async (movieName: string): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/movies/?title=${movieName}`
    );
    const movies: MoviesData = response.data as MoviesData;
    return movies;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

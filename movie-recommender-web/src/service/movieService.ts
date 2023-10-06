import axios from "axios";

export const getMovies = async (movieName: string) => {
  await axios
    .get("https://movie-recommendation-398607.ue.r.appspot.com/movies/avatar")
    .then((res) => console.log(res));
};

import axios from "axios";

export const getMovie = async () => {
  await axios
    .get("https://movie-recommendation-398607.ue.r.appspot.com/movies/avatar")
    .then((res) => console.log(res));
};

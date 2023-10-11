const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const PORT = 3133;
const HOST = "localhost";
const API_SERVICE_URL =
  "https://movie-recommendation-398607.ue.r.appspot.com/movies";

app.use(morgan("dev"));
app.use(cors());

const getMoviesRecommendation = async (movieName) => {
  const response = await axios.get(`${API_SERVICE_URL}/${movieName}`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  });
};

app.get("/movies", async (req, res, next) => {
  try {
    const movieTitle = req.query.title;
    const response = await axios.get(`${API_SERVICE_URL}/${movieTitle}`);
    res.json(response.data);
  } catch (error) {
    console.error("*****", error.message);
    res.status(500).json({
      error: "Failed to fetch data",
    });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

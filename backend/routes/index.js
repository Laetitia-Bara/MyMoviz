var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

router.get("/movies", async (requestAnimationFrame, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  try {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ result: false, error: "problème clé API" });
    }
    const url =
      `https://api.themoviedb.org/3/discover/movie` +
      `?api_key=${apiKey}` +
      `&language=en-US` +
      `&sort_by=popularity.desc` +
      `&include_adult=false` +
      `&include_video=false` +
      `&page=1`;

    const response = await fetch(url);
    const data = await response.json();

    return res.json({ result: true, movies: data.results });
  } catch (error) {
    return res.status(500).json({ result: false, error: error.message });
  }
});

module.exports = router;

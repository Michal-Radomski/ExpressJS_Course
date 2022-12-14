import express, { NextFunction, Request, Response, Router } from "express";
import axios from "axios";

const indexRouter: Router = express.Router();

const apiKey = process.env.API_KEY;
const apiBaseUrl = "http://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";

//* Test Route
// indexRouter.get("/", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   // res.send("<h1 style='color:green;text-align:center'>API is running - indexRouter.ts</h1>");
//   res.render("index", {});
// });

indexRouter.use((_req: Request, res: Response, next: NextFunction) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

//* GET home page
indexRouter.get("/", async function (_req: Request, res: Response) {
  const response = await axios.get(nowPlayingUrl);
  const dataToDisplay = response?.data;
  // console.log({ dataToDisplay });
  // res.json({dataToDisplay});
  res.render("index", {
    dataToDisplay: dataToDisplay?.results,
  });
});

//* /movie/:id is a wildcard route.
indexRouter.get("/movie/:id", async (req, res) => {
  const movieId = req.params.id;
  // console.log({ movieId });
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  // console.log({ thisMovieUrl });
  // res.send({ thisMovieUrl });
  const response = await axios.get(thisMovieUrl);
  const dataToDisplay = response?.data;
  // console.log({ dataToDisplay });
  // res.json({ dataToDisplay });
  res.render("single-movie", {
    dataToDisplay: dataToDisplay,
  });
});

indexRouter.post("/search", async (req: Request, res: Response) => {
  // res.send("JSON.stringify(req.body):" + JSON.stringify(req.body));
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;
  // console.log({ userSearchTerm, cat });
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`;
  // res.send(movieUrl);
  const response = await axios.get(movieUrl);
  const dataToDisplay = response?.data;
  // res.json({ dataToDisplay });
  if (cat == "person") {
    dataToDisplay.results = dataToDisplay.results[0].known_for;
  }
  res.render("index", {
    dataToDisplay: dataToDisplay.results,
  });
});

export default indexRouter;

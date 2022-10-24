import express, { NextFunction, Request, Response, Router } from "express";
import axios from "axios";
import passport from "passport";

const apiKey = process.env.API_KEY;
const apiBaseUrl = "http://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";

const indexRouter: Router = express.Router();

indexRouter.use((_req: Request, res: Response, next: NextFunction) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

//* GET home page
indexRouter.get("/", async function (req: Request, res: Response) {
  // console.log("req.user:", req.user);
  const response = await axios.get(nowPlayingUrl);
  const dataToDisplay = response?.data;
  res.render("index", {
    dataToDisplay: dataToDisplay?.results,
  });
});

indexRouter.get("/favorites", (req: Request, res: Response) => {
  // @ts-ignore
  const name = req.user!.displayName;
  res.json(name);
});

indexRouter.get("/login", passport.authenticate("github"));

indexRouter.get(
  "/auth",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/loginFailed",
  })
);

//* /movie/:id is a wildcard route.
indexRouter.get("/movie/:id", async (req, res) => {
  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  const response = await axios.get(thisMovieUrl);
  const dataToDisplay = response?.data;
  res.render("single-movie", {
    dataToDisplay: dataToDisplay,
  });
});

indexRouter.post("/search", async (req: Request, res: Response) => {
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`;
  const response = await axios.get(movieUrl);
  const dataToDisplay = response?.data;
  if (cat == "person") {
    dataToDisplay.results = dataToDisplay.results[0].known_for;
  }
  res.render("index", {
    dataToDisplay: dataToDisplay.results,
  });
});

export default indexRouter;

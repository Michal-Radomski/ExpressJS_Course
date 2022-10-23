import express, { NextFunction, Request, Response, Router } from "express";

import movieDetails from "../data/movieDetails";

const movieRouter: Router = express.Router();

movieRouter.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  // res.send("<h1 style='color:orangered;text-align:center'>API is running - movieRouter.ts</h1>");
  res.render("index", { title: "Express Movie Api" });
});

function requireJSON(req: Request, res: Response, next: NextFunction) {
  if (!req.is("application/json")) {
    res.json({ msg: "Content type must be application/json" });
  } else {
    next();
  }
}

movieRouter.param("movieId", (req: Request, _res: Response, next: NextFunction) => {
  // If only certain apiKey are allowed to hit movieId - update the db with analytics data
  console.log("Someone hit a route that used the movieId wildcard!");
  console.log("req.query:", req.query);
  next();
});

/* GET movie page. */
// GET /movie/top_rated
movieRouter.get("/top_rated", (req: Request, res: Response) => {
  let page = req.query.page;
  console.log({ page });
  if (!page) {
    page = "1";
  }
  const results = movieDetails.sort((a, b) => {
    return b.vote_average - a.vote_average; //* descending order
  });
  const indexToStart = (parseInt(page as string) - 1) * 20;
  res.json(results.slice(indexToStart, indexToStart + 20));
});

// GET /movie/movieId
//* This one needs to come last of all /ONETHING
movieRouter.get("/:movieId", (req: Request, res: Response) => {
  const movieId = req.params.movieId;
  const result = movieDetails.find((movie) => {
    // console.log(movie.id, "===", movieId);
    return movie.id === parseInt(movieId); //* or -> movie.id == movieId
  });
  // console.log({results})
  if (!result) {
    res.json({
      msg: "Movie ID is not found",
      production_companies: [],
    });
  } else {
    res.status(200).json(result);
  }
});

// POST /movie/{movie_id}/rating
movieRouter.post("/:movieId/rating", requireJSON, (req: Request, res: Response) => {
  // const movieId = req.params.movieId;
  // console.log({movieId})
  // console.log(req.get('content-type'))
  const userRating = req.body.value;
  // console.log({userRating})
  if (userRating < 0.5 || userRating > 10) {
    res.json({ msg: "Rating must be between 0.5 and 10" });
  } else {
    res.json({
      msg: "Thank you for submitting your rating.",
      status_code: 200,
    });
  }
});

// DELETE /movie/{movie_id}/rating
movieRouter.delete("/:movieId/rating", requireJSON, (_req: Request, res: Response) => {
  res.json({ msg: "Rating deleted!" });
});

export default movieRouter;

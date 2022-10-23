import express, { Request, Response, Router } from "express";

import movies from "../data/movies";

const indexRouter: Router = express.Router();

indexRouter.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  // res.send("<h1 style='color:orangered;text-align:center'>API is running - indexRouter.ts</h1>");
  res.render("index", { title: "Express Movie Api" });
});

indexRouter.get("/most_popular", (req: Request, res: Response) => {
  // Get the page variable from the query string
  let page = req.query.page;
  if (page === undefined) {
    page = "1";
  }
  // console.log({ page });
  // if (req.query.api_key != process.env.API_KEY) {
  //   res.json("Invalid API Key");
  // } else {
  let results = movies.filter((movie) => {
    return movie.most_popular;
  });
  const indexToStart = (parseInt(page as string) - 1) * 20;
  results = results.slice(indexToStart, indexToStart + 19);
  res.json({
    page: page,
    results: results,
  });
  // }
});

export default indexRouter;

import express, { NextFunction, Request, Response, Router } from "express";

import movies from "../data/movies";
import people from "../data/people";

const searchRouter: Router = express.Router();

searchRouter.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  // res.send("<h1 style='color:orangered;text-align:center'>API is running - searchRouter.ts</h1>");
  res.render("index", { title: "Express Movie Api" });
});

function queryRequired(req: Request, res: Response, next: NextFunction) {
  const searchTerm = req.query.query as string;
  if (!searchTerm) {
    res.json({ msg: "Query is required." });
  } else {
    next();
  }
}

// This middleware will be used by ALL routes in THIS router
searchRouter.use(queryRequired);

// GET /search/movie
searchRouter.get("/movie", (req: Request, res: Response) => {
  const searchTerm = req.query.query as string;
  // console.log("req.query:", req.query);
  // console.log({searchTerm})
  const results = movies.filter((movie) => {
    const found = movie.overview.includes(searchTerm) || movie.title.includes(searchTerm);
    return found;
  });
  res.json({ results: results });
});

// GET /search/person
searchRouter.get("/person", (req: Request, res: Response) => {
  const searchTerm = req.query.query as string;
  // console.log("req.query:", req.query);
  // console.log({searchTerm})
  const results = people.filter((person) => {
    const found = person.name.includes(searchTerm);
    return found;
  });
  res.json({ results: results });
});

export default searchRouter;

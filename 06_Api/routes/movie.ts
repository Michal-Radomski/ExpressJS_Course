import express, { Request, Response, Router } from "express";

const movieRouter: Router = express.Router();

movieRouter.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:orangered;text-align:center'>API is running - movieRouter.ts</h1>");
});

export default movieRouter;

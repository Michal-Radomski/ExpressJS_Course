import express, { Request, Response, Router } from "express";

const searchRouter: Router = express.Router();

searchRouter.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:orangered;text-align:center'>API is running - searchRouter.ts</h1>");
});

export default searchRouter;

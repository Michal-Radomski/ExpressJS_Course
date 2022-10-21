import express, { Request, Response, Router } from "express";
const theRouter: Router = express.Router();

theRouter.get("/", (_req: Request, res: Response) => {
  res.json({
    msg: "Router works!",
  });
});

export default theRouter;

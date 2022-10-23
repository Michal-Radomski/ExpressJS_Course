import express, { Request, Response, Router } from "express";

const indexRouter: Router = express.Router();

indexRouter.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:orangered;text-align:center'>API is running - indexRouter.ts</h1>");
});

export default indexRouter;

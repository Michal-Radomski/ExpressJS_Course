import express, { Request, Response, Router } from "express";

const indexRouter: Router = express.Router();

indexRouter.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  // res.send("<h1 style='color:green;text-align:center'>API is running - indexRouter.ts</h1>");
  res.render("index", {});
});

export default indexRouter;

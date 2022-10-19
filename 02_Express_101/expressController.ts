import { Request, RequestHandler, Response } from "express";

export const getMethod: RequestHandler = (req: Request, res: Response): void => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:green;text-align:center'>API is running - controller</h1>");
};

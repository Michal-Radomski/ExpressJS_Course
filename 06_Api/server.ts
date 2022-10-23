import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import createError from "http-errors";
import path from "path";
import http from "http";

// Import routes
import indexRouter from "./routes";

// The server
const app: Express = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middlewares
app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);
app.use((req: Request, res: Response, next: NextFunction) => {
  // Cut off the response if the api key is bad
  if (req.query.api_key != process.env.API_KEY) {
    res.status(401); //* Unauthorized = 401
    res.json("Invalid API Key");
  } else {
    next();
  }
});

//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/public/favicon.png"));
});

// Test route
// app.get("/test", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>API is running - server.ts</h1>");
// });

//Route middleware
app.use("/", indexRouter);

const errorPage = createError(404, "This page does not exist!");
app.use(function (_req: Request, _res: Response, next: NextFunction) {
  next(errorPage);
});

// Port
const port = (process.env.PORT || 5000) as number;

const server = http.createServer(app);
server.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

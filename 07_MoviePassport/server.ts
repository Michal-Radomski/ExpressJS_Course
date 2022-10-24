import path from "path";
import http from "http";
import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import createError from "http-errors";

//* Passport files
import session from "express-session";
import passport from "passport";
const GitHubStrategy = require("passport-github").Strategy;
// console.log({GitHubStrategy});

// Import routes
import indexRouter from "./routes/index";

// The server
const app: Express = express();

//* Passport Config
app.use(
  session({
    secret: process.env.SessionSecret as string,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.ClientID as string,
      clientSecret: process.env.ClientSecret as string,
      callbackURL: process.env.CallbackURL as string,
    },
    function (_accessToken: string, _refreshToken: string, profile: Object, cb: Function) {
      // console.log({ _accessToken, _refreshToken });
      // console.log({ profile });
      return cb(null, profile);
    }
  )
);
passport.serializeUser((user, cb) => {
  // console.log({ user });
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  // console.log({ user });
  cb(null, user!);
});

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
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

//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/public/favicon.png"));
});
//* LESS Style
app.get("/movie/style.less", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/public/style.less"));
});

// Test route
app.get("/test", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running - server.ts</h1>");
});

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

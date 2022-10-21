import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";

// The server
const app: Express = express();

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.query.msg === "fail") {
    res.locals.msg = `Sorry. This username and password combination does not exist.`;
  } else {
    res.locals.msg = ``;
  }
  next();
});

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (_req: Request, res: Response) => {
  // console.log("req.ip:", req.ip);
  // res.send("<h1 style='color:orangered;text-align:center'>API is running</h1>");
  res.redirect("/login");
});
app.get("/login", (req: Request, res: Response) => {
  // console.log("req.query:", req.query);
  const msg = req.query?.msg;
  if (msg === "fail") {
    console.log("Login failed", { msg });
  }
  res.render("login");
});
app.post("/process_login", (req: Request, res: Response) => {
  // req.body is made by urlencoded, which parses the http message for sent data!
  const { username, password } = req.body;
  // console.log({ username, password });
  // if user credentials are valid save their username in a cookie - is send them to the welcome page
  if (password === (process.env.PASSWORD as string)) {
    res.cookie("username", username);
    // console.log({ username });
    res.redirect("/welcome");
  } else {
    // The "?" is a special character in a URL
    res.redirect("/login?msg=fail&test=hello");
  }
  // res.json(req.body);
});
app.get("/welcome", (req: Request, res: Response) => {
  // req.cookies object will have a property for every named cookie that has been set.
  // console.log("req.cookies.username:", req.cookies.username);
  // res.send("Welcome!");
  res.render("welcome", {
    username: req.cookies.username,
  });
});
app.get("/logout", (_req: Request, res: Response) => {
  res.clearCookie("username");
  res.redirect("/login");
});

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

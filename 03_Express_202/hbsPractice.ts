import express, { Express, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import path from "path";

import { encodedPic } from "./encodedPic";

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
app.use(express.static("view_HBS"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// View engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "view_HBS"));

function validateUser(_req: Request, res: Response, next: NextFunction) {
  res.locals.validated = true;
  next();
}
app.use(validateUser);

// Routes
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.render("index", {
    country: {
      name: "Poland",
      bestCity: "Gdansk",
    },
    msg: "Failure!",
    msg2: "Success!",
    html: encodedPic,
    countries: [
      {
        name: "Ukraine",
        capital: "Kiev",
        western: false,
      },
      {
        name: "England",
        capital: "London",
        western: true,
      },
    ],
  });
});
app.get("/about", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.render("about", {});
});

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

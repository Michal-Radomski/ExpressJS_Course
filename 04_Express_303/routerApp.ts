import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import path from "path";

// The server
const app: Express = express();

// Import Routes
import theRouter from "./theRouter";
import userRouter from "./userRouter";

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Test Route
app.get("/test", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:orangered;text-align:center'>API is running</h1>");
});
//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/public/favicon.png"));
});

app.use("/", theRouter);
app.use("/user", userRouter);

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

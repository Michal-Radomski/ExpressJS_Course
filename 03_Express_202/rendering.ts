import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import path from "path";

// The server
const app: Express = express();

// Middleware
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//     crossOriginResourcePolicy: false,
//     crossOriginEmbedderPolicy: false,
//     crossOriginOpenerPolicy: false,
//   })
// );
// app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Test route
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  // res.send("<h1 style='color:blue;text-align:center'>API is running - rendering.ts</h1>");
  // res.json({ msg: "API is running - rendering.ts" });
  res.render("index");
});

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

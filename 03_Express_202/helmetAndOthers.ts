import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import path from "path";
// import bodyParser from "body-parser";

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
app.use(express.urlencoded({ extended: false })); //* parses body (like body-parser) -> false for array, true for any object
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:green;text-align:center'>API is running - helmetAndOthers.ts</h1>");
});

app.get("/test", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.sendFile(path.resolve(__dirname, "public", "node.html"));
  // console.log(path.join('__dirname + "/node.html":', __dirname + "/node.html"));
  // console.log({ __dirname });
  // console.log("process.cwd():", process.cwd());
});

app.post("/test", (req: Request, res: Response) => {
  // console.log("req.body:", req.body);
  // console.log("req.headers:", req.headers);
  // res.send("This is answer");
  res.json(["This is answer", 1, 2, 3, 4]);
});

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

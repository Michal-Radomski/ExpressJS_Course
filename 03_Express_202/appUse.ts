import express, { Express, Request, Response, NextFunction } from "express";

// The server
const app: Express = express();

function validateUser(_req: Request, res: Response, next: NextFunction) {
  // console.log("res.locals:", res.locals);
  res.locals.validated = true;
  // console.log("res.locals:", res.locals);
  console.log("Validated Ran!");
  next();
}
// Middleware
app.use(validateUser); //* At application level - run on every HTTP request

//* This will run validateUser on '/admin', all methods!
// app.use("/admin", validateUser);
//* This will run validateUser on '/', only on get methods! And, by the way, it looks like this...
// app.get("/", validateUser);

// Routes
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running - appUse.ts</h1>");
});

app.get("/admin", (_req: Request, res: Response) => {
  res.send("<h1>Admin Page</h1>");
  // console.log("res.locals:", res.locals);
});

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

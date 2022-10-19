import express, { Express, Request, Response } from "express";
import path from "path";

// Import routes
import router from "./expressRouting";

// The server
const app: Express = express();

//Route middleware
app.use("/api", router);

// Test route
// app.get("/", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>API is running - expressServer.ts</h1>");
// });

// Static files
app.use(express.static("public"));

app.get("/*", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.sendFile(path.resolve(__dirname, "public", "node.html"));
  // console.log(path.join('__dirname + "/node.html":', __dirname + "/node.html"));
  // console.log({ __dirname });
  // console.log("process.cwd():", process.cwd());
});

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

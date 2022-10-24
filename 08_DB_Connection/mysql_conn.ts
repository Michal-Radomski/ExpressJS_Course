import express, { Express, Request, Response } from "express";
import mysql from "mysql2";

// The server
const app: Express = express();

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "testDB",
});

// Route
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  // Simple query
  connection.query("SELECT * FROM `shop_item` WHERE `price` > 10", function (error, results, _fields) {
    if (error) {
      console.log({ error });
    }
    // console.log({results}); // Results contains rows returned by server
    // console.log({fields}); // Fields contains extra meta data about results, if available
    res.json({ results });
  });
});

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

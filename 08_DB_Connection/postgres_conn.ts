// const { Pool } = require('pg')

// const pg = require('pg');
// const pgPool = pg.Pool;

import express, { Express, Request, Response } from "express";
import pg from "pg";

const PoolClass = pg.Pool;

const pool = new PoolClass({
  user: "postgres",
  host: "localhost",
  database: "weather_db",
  port: 5432,
  password: "",
});

// The server
const app: Express = express();

// Route
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  const query = "SELECT * FROM city_weathers WHERE id > $1";
  const scaryDataFromInternet = 36;
  pool.query(query, [scaryDataFromInternet], (_error, dbResponse) => {
    const response = dbResponse.rows;
    console.log({ response });
    res.json({ response });
  });
  pool.end();
});

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

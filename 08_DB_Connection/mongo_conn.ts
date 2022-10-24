import express, { Express, Request, Response } from "express";
import { MongoClient } from "mongodb";

// The server
const app: Express = express();

// Connection URL
const mongoUrl = `mongodb://localhost:27017`;
const client = new MongoClient(mongoUrl);

// Database Name
const dbName = "test";

// Route
app.get("/", async (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);

  try {
    await client.connect();
    await console.log("Connected successfully to MongoDB");
    const db = await client.db(dbName);
    const collection = await db.collection("cars").find().toArray();
    await res.json({ collection });
  } catch (error) {
    console.log({ error });
  } finally {
    client.close();
  }
});

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

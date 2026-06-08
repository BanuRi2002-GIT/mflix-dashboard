const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
let db;

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db("sample_mflix");
  console.log("✅ Connected to MongoDB");
}

app.get("/api/v1/movies", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const movies = await db.collection("movies_n").find().skip(skip).limit(limit).toArray();
    const total = await db.collection("movies_n").countDocuments();

    res.json({ movies, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/v1/movies/:id", async (req, res) => {
  try {
    const movie = await db.collection("movies_n").findOne({ _id: new ObjectId(req.params.id) });
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", port: PORT });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  });
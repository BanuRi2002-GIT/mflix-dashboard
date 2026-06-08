const { MongoClient } = require("mongodb");

const MOVIES = [
  {
    title: "Inception",
    year: 2010,
    directors: ["Christopher Nolan"],
    genres: ["Action", "Sci-Fi", "Thriller"],
    imdb: { rating: 8.8 },
    runtime: 148,
    plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX700_.jpg",
    status: "published",
    lastupdated: new Date().toISOString()
  },
  {
    title: "The Dark Knight",
    year: 2008,
    directors: ["Christopher Nolan"],
    genres: ["Action", "Crime", "Drama"],
    imdb: { rating: 9.0 },
    runtime: 152,
    plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY2048_.jpg",
    status: "published",
    lastupdated: new Date().toISOString()
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    directors: ["Quentin Tarantino"],
    genres: ["Crime", "Drama"],
    imdb: { rating: 8.9 },
    runtime: 154,
    plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster: "https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_FMjpg_UX1055_.jpg",
    status: "published",
    lastupdated: new Date().toISOString()
  },
  {
    title: "The Shawshank Redemption",
    year: 1994,
    directors: ["Frank Darabont"],
    genres: ["Drama"],
    imdb: { rating: 9.3 },
    runtime: 142,
    plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_FMjpg_UX1200_.jpg",
    status: "published",
    lastupdated: new Date().toISOString()
  },
  {
    title: "The Godfather",
    year: 1972,
    directors: ["Francis Ford Coppola"],
    genres: ["Crime", "Drama"],
    imdb: { rating: 9.2 },
    runtime: 175,
    plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster: "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_FMjpg_UY1982_.jpg",
    status: "published",
    lastupdated: new Date().toISOString()
  },
  {
    title: "Interstellar",
    year: 2014,
    directors: ["Christopher Nolan"],
    genres: ["Adventure", "Drama", "Sci-Fi"],
    imdb: { rating: 8.6 },
    runtime: 169,
    plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UY3600_.jpg",
    status: "published",
    lastupdated: new Date().toISOString()
  }
];

async function seedDatabase() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    
    const db = client.db("sample_mflix");
    
    // Seed BOTH collections to be safe
    
    // 1. Seed "movies" collection (used by homepage and API)
    console.log("\n📊 Seeding 'movies' collection...");
    await db.collection("movies").deleteMany({});
    const moviesResult = await db.collection("movies").insertMany(MOVIES);
    console.log(`   ✅ Inserted ${moviesResult.insertedCount} movies into 'movies'`);
    
    // 2. Seed "movies_n" collection (used by admin actions)
    console.log("\n📊 Seeding 'movies_n' collection...");
    await db.collection("movies_n").deleteMany({});
    const moviesNResult = await db.collection("movies_n").insertMany(MOVIES);
    console.log(`   ✅ Inserted ${moviesNResult.insertedCount} movies into 'movies_n'`);
    
    // Verify both collections
    const moviesCount = await db.collection("movies").countDocuments();
    const moviesNCount = await db.collection("movies_n").countDocuments();
    
    console.log("\n📊 FINAL COUNTS:");
    console.log(`   - 'movies' collection: ${moviesCount} movies`);
    console.log(`   - 'movies_n' collection: ${moviesNCount} movies`);
    
    // Show sample from each
    const sampleMovies = await db.collection("movies").find().limit(1).toArray();
    const sampleMoviesN = await db.collection("movies_n").find().limit(1).toArray();
    
    console.log("\n📽️ Sample from 'movies':");
    if (sampleMovies.length > 0) {
      console.log(`   Title: ${sampleMovies[0].title}`);
    }
    
    console.log("\n📽️ Sample from 'movies_n':");
    if (sampleMoviesN.length > 0) {
      console.log(`   Title: ${sampleMoviesN[0].title}`);
    }
    
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await client.close();
  }
}

seedDatabase();

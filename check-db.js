const { MongoClient } = require("mongodb");

async function checkDatabase() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    
    const db = client.db("sample_mflix");
    
    // Check what collections exist
    const collections = await db.listCollections().toArray();
    console.log("\n📚 Collections in sample_mflix:");
    if (collections.length === 0) {
      console.log("   No collections found!");
    } else {
      collections.forEach(c => console.log(`   - ${c.name}`));
    }
    
    // Check movies_n collection
    const moviesCount = await db.collection("movies_n").countDocuments();
    console.log(`\n🎬 Movies in 'movies_n' collection: ${moviesCount}`);
    
    if (moviesCount > 0) {
      const sample = await db.collection("movies_n").find().limit(1).toArray();
      console.log("\n📽️ Sample movie:");
      console.log(JSON.stringify(sample[0], null, 2).substring(0, 300) + "...");
    }

    // Check movies collection (original)
    const originalCount = await db.collection("movies").countDocuments();
    console.log(`\n🎬 Movies in 'movies' collection: ${originalCount}`);

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await client.close();
  }
}

checkDatabase();

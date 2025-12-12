const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    const dbo = client.db("mydb");
    await dbo.createCollection("customers");
    console.log("Collection created!");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();

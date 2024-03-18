const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

if(!uri){
    throw new Error("MONGO_DB Connection is not provided")
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const db = client.db("HospitalManagementDB")

module.exports = db
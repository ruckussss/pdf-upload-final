const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://venwiz-mvp-dev2:WtsVS0f4clVFtGIk@cluster2.vs2kj.mongodb.net/vendor-profile?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
    } catch (e) {
        console.error("Connection to MongoDB failed", e);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);

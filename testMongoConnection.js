const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://venwiz-mvp-dev2:WtsVS0f4clVFtGIk@cluster2.vs2kj.mongodb.net/vendor-profile?retryWrites=true&w=majority';

async function testConnection() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await client.close();
  }
}

testConnection();

const mongoose = require('mongoose');

let _mongoServer = null;

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    // In development with no MONGO_URI set, spin up an in-memory MongoDB
    if (!uri || uri === 'your_mongo_connection_string') {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      _mongoServer = await MongoMemoryServer.create();
      uri = _mongoServer.getUri();
      console.log('Using in-memory MongoDB (no MONGO_URI set)');
    }

    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

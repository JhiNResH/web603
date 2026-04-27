const mongoose = require('mongoose');

let _mongoServer = null;
let _connectionPromise = null;

const connectDB = async () => {
  if (global.__TASKFLOW_MEMORY_STORE__) {
    return null;
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (_connectionPromise) {
    return _connectionPromise;
  }

  try {
    let uri = process.env.MONGO_URI;

    // In development with no MONGO_URI set, spin up an in-memory MongoDB
    if (!uri || uri === 'your_mongo_connection_string') {
      if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
        global.__TASKFLOW_MEMORY_STORE__ = true;
        console.warn('No MONGO_URI configured. Using temporary in-memory demo data.');
        return null;
      }

      const { MongoMemoryServer } = require('mongodb-memory-server');
      _mongoServer = await MongoMemoryServer.create();
      uri = _mongoServer.getUri();
      console.log('Using in-memory MongoDB (no MONGO_URI set)');
    }

    _connectionPromise = mongoose.connect(uri);
    await _connectionPromise;
    console.log('MongoDB connected');
    return mongoose.connection;
  } catch (err) {
    _connectionPromise = null;
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      global.__TASKFLOW_MEMORY_STORE__ = true;
      console.warn('MongoDB unavailable. Using temporary in-memory demo data.');
      return null;
    }

    throw err;
  }
};

connectDB.isUsingMemoryStore = () => Boolean(global.__TASKFLOW_MEMORY_STORE__);

module.exports = connectDB;

require('dotenv').config();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = {
  connect,
  disconnect,
  createEventListeners
};

function connect() {
  const uri = DATABASE;
  mongoose.connect(uri, { useMongoClient: true });
}

function disconnect() {
  mongoose.disconnect();
}

function createEventListeners() {
  mongoose.connection.on('connected', () => {
    console.log('Connected to database');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Database connection closed');
  });

  mongoose.connection.on('error', () => {
    console.log();
  });
}

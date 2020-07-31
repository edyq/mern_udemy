// for mongodb connection

const mongoose = require('mongoose'); // instantiate mongoose
const config = require('config'); // use global vars in config
const db = config.get('mongoURI'); // retrieve uri from default.json

const connectDB = async () => {
  try {
    await mongoose.connect(db, { 
      useNewUrlParser: true, // get rid of deprecation warning
      useUnifiedTopology: true // get rid of deprecation warning
    });

    console.log('MongoDB Connected...');
  } catch(err) {
    console.error(err.message);
    process.exit(1); // exit process with failure
  }
}

module.exports = connectDB;
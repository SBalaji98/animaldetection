const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDb is Connected');
  } catch (error) {
    console.error(err.message);
    //Exits process with a failure
    process.exit(1);
  }
};

module.exports = connectDB;

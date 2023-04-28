const mongoose = require('mongoose');
//127.0.0.1:27017
//localhost
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/me-time', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
 // useFindAndModify: false,
});

module.exports = mongoose.connection;

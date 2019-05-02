var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
var murl = 'mongodb://localhost:27017/pm2-monitoring-api';

mongoose.connect(murl, { useNewUrlParser: true });

module.exports = {
  mongoose: mongoose
};

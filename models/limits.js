var mongoose = require('mongoose');

var LimitSchema = new mongoose.Schema(
  {
    pm_id: {
      type: Number,
      required: true,
      trim: true
    },
    parameter: {
      type: String,
      required: true,
      trim: true
    },
    threshold: {
      type: Number,
      required: true,
      trim: true
    },
    capture_date: {
      type: String,
      default: null
    },

    capture_time: {
      type: String,
      default: null
    }
  }
);



var Limits = mongoose.model('Limits', LimitSchema);


module.exports = { Limits };

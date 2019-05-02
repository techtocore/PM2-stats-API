var { ObjectID } = require('mongodb');
var { mongoose } = require("./../db/mongoose.js");
var { Limits } = require("./../models/limits");
var moment = require('moment');

var setLimits = async (obj) => {

  var date = moment();
  var dat = date.format('MMM Do, YYYY');
  var time = date.format('HH:mm:ss');
  var json = {
    "pm_id": obj.pm_id,
    "parameter": obj.parameter,
    "threshold": obj.threshold,
    "capture_date": dat,
    "capture_time": time
  }
  var flag = 0;
  var ret = await Limits.find({}).then(async (ob) => {

    for (var i = 0; i < ob.length; i++) {
      if (ob[i].parameter === obj.parameter && ob[i].pm_id === obj.pm_id) {
        let parameter = ob[i].parameter;
        var ret1 = await Limits.updateOne({ "parameter": parameter },
          { $set: json }
        );
        flag = 1;
        break;
      }
    }

  });
  if (flag === 0) {
    var newVal = new Limits(json);
    var ret1 = await newVal.save();
    return ret1;
  }

  return ret;
}

module.exports = { setLimits };


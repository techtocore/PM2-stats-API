var express = require("express");
var bodyParser = require("body-parser");
var pm2 = require('pm2');
var moment = require("moment");
var { Limits } = require("./models/limits");
var { setLimits } = require("./utility/setLimits.js");


var cors = require("cors");
var app = express();
app.use(cors());

app.get("/", function (req, res) {
  res.send("I'm listening");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/list", function (req, res) {
  pm2.list(function (err, processDescriptionList) {
    if (err) {
      res.status(500);
    }
    else {

      console.log("list retrived");
      var jsonarr = processDescriptionList;
      var json = {};
      var stat = [];
      var date = moment();
      var dat = date.format('MMM Do, YYYY');
      var time = date.format('HH:mm:ss');
      jsonarr.forEach(proc => {
        var tmpJson = {};
        tmpJson.pid = proc.pid;
        tmpJson.name = proc.name;
        tmpJson.cpu = proc.monit.cpu;
        tmpJson.memory = proc.monit.memory;
        tmpJson.date = dat;
        tmpJson.time = time;
        tmpJson.pm_id = proc.pm_id;
        // TODO: check if details like uptime, createdAt, version, number of instances, etc are required
        stat.push(tmpJson);
      });
      json.stat = stat;
      res.json(json);
    }
  });
});

app.post("/setLimits", async function (req, res) {
  var data = req.body;
  console.log(data);
  await setLimits(data)
    .then(ob => {
      //console.log(ob);
      res.status(200).send();
    })
    .catch(err => {
      res.status(400).json({ err: err.message });
    });
});

app.get("/limits", function (req, res) {
  Limits.find({}, function (err, docs) {
    res.send(docs);
  });

});

const PORT = 8088;
const HOST = "0.0.0.0";

app.listen(PORT, () => {
  console.log(`Server Up and Running on 8088`);
});

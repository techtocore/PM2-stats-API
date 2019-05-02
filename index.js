var express = require("express");
var bodyParser = require("body-parser");
var pm2 = require('pm2');

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
    console.log("list retrived");
    var jsonarr = processDescriptionList;
  });
});

const PORT = 8088;
const HOST = "0.0.0.0";

app.listen(PORT, () => {
  console.log(`Server Up and Running on 8088`);
});

const express = require("express");
const app = express();

app.use(express.static("./public/templated-roadtrip"));

app.get("/generic", function (req, res) {
  res.sendFile(__dirname + "/public/templated-roadtrip/generic.html");
});
app.get("/elements", function (req, res) {
  res.sendFile(__dirname + "/public/templated-roadtrip/elements.html");
});

app.listen(8080);

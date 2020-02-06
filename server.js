const express = require("express");
const path = require("path");

const app = express();

// Serve only the static files form the dist directory
app.use("/", express.static(__dirname + "/dist/se-planner"));

//Serve studiengangsdata
app.get("/data", function(req, res) {
  res.sendFile(path.join(__dirname + "/data/studiengang_se14.json"));
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/se-planner/index.html"));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

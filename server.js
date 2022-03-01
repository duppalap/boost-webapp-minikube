const express = require("express");

const app = express();

const path = require("path");

const port = process.env.PORT || 9000;

console.log(`Amp4Boost app is running on port: ${port}`);

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port);

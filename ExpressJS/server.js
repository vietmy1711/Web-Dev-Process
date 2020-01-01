const express = require("express");

const app = express();

app.get("/", function(req, res) {
  res.send("<h1>Hello, world!</h1>");
});

app.get("/contact", function(req, res) {
  res.send("Contact me at: zzvietmyzz@gmail.com");
});

app.get("/about", function(req, res) {
  res.send(
    "I'm Nguyen Viet My, student at the University of Information and Technology"
  );
});

app.get("/hobbies", function(req, res) {
  res.send("<ul><li>Code</li><li>Guitar</li><li>Game</li></ul>");
});

app.listen(3000, function() {
  console.log("server started");
});

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/fdc7ec38fc",
    method: "POST",
    headers: {
      Authorization: "nguyenvietmy 68c85cb4d65648e4bcf4abf8eef477c3-us4"
    },
    body: jsonData
  };

  console.log(firstName, lastName, email);
  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200)
        res.sendFile(__dirname + "/success.html");
      else res.sendFile(__dirname + "/failure.html");
    }
  });
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Port 3000");
});

// 68c85cb4d65648e4bcf4abf8eef477c3-us4
// fdc7ec38fc

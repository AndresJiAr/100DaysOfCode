var express = require("express");
var app = express();
let bodyParser = require("body-parse");

let message = { message: "Hello json" };

// --> 7)  Mount the Logger middleware here
app.use((req, res, next) => {
  let string = `${req.method} ${req.path} - ${req.ip}`;
  console.log(string);

  next();
});
// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlenconded({ extend: false }));
/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */

app.get("/", (req, res) => {
  res.send("Hello Express");
});
/** 3) Serve an HTML file */

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
/** 4) Serve static assets  */
app.use("/assets", express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
app.get("/json", (req, res) => {
  res.json({
    message: "Hello json"
  });
});

/** 6) Use the .env file to configure the app */
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({
      message: "HELLO JSON"
    });
  } else {
    res.json(message);
  }
});

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

app.get("/json", (req, res, next) => {
  console.log(req.method + "" + req.path + "-" + req.ip);
  next();
});

/** 8) Chaining middleware. A Time server */

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);

/** 9)  Get input from client - Route parameters */

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

app.get("/name", (req, res) => {
  var firstName = req.query.first;
  var lastName = req.query.last;
  var { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  });
});

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

app.post("/name", (req, res) => {
  var firstName = req.body.first;
  var lastName = req.body.last;
  res.send({ name: firstName + " " + lastName });
});

/** 12) Get data form POST  */
app.post("/name", function(req, res) {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});
// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;

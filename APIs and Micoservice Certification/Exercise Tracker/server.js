//All requirements
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const cors = require("cors");
const mongoose = require("mongoose");

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
  useCreateIndex: true
});

//Use the requirements
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// // let's make json a bit cleaner
// app.set("json spaces", 2);

//Send the HTML
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//Import model
let user = require("./schema.js").user;
// functions
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

//  /api/exercise/new-user  code
app.post("/api/exercise/new-user", (req, res, next) => {
  let username = req.body.username;

  if (username) {
    //check if name is entered in field
    let userAdd = { username: username, count: 0, log: [] };
    user.findOne({ username: userAdd.username }, (err, data) => {
      if (err) next(err);
      if (data) {
        res.send("Username is already taken.");
      } else {
        user.create(userAdd, (err, data) => {
          if (err) next(err);
          res.json({ username: data.username, _id: data._id });
        });
      }
    });
  } else {
    res.send("Please provide a username");
  }
});

//  /api/exercise/add  code
app.post("/api/exercise/add", upload.none(), (req, res, next) => {
  console.log("Status: " + res.statusCode);
  console.log("Header: " + JSON.stringify(req.headers));
  var contype = req.headers["content-type"];
  console.log(contype);

  let userId = req.body.userId;
  let description = req.body.description;
  let duration = req.body.duration;
  let date = req.body.date ? new Date(req.body.date) : new Date();
  console.log(
    "userId:",
    req.body.userId,
    "description:",
    req.body.description,
    "duration:",
    req.body.duration,
    "date:",
    req.body.date
  );
  if (contype.split(";", 1) == "multipart/form-data") {
    console.log("Headers:====\n", req.headers);
    console.log("body========\n", req.body);
    console.log("Request Object========\n", req);
  }

  let exerciseData;

  if (userId && description && duration) {
    user.findById(userId, function(err, data) {
      if (err) {
        console.log(err);
        next(err);
      }
      if (data) {
        console.log("user Data found:", data);
        console.log("found User and adding exercise");
        data.count = data.count + 1;
        let additionExercise = {
          description: description,
          duration: duration,
          date: date.toDateString()
        };
        data.log.push(additionExercise);
        data.save((err, data) => {
          if (err) console.log(err);
          exerciseData = {
            username: data.username,
            _id: data._id,
            description: description,
            duration: duration,
            date: date.toDateString()
          };
          console.log(exerciseData);
          console.log(additionExercise);
          res.json(exerciseData);
        });
      }
    });
  } else {
    res.send("Please fill in all required fields.");
  }
});

app.get("/api/exercise/log", function(req, res, next) {
  let userId = req.query.userId;
  console.log(userId);
  if (userId) {
    let from = req.query.from ? new Date(req.query.from) : "";
    let to = req.query.to ? new Date(req.query.to) : "";
    let limit = Number(req.query.limit);
    const limitOptions = {};
    if (limit) limitOptions.limit = limit;

    user
      .findById(userId)
      .populate({
        path: "log",
        match: {},
        select: "-_id",
        options: limitOptions
      })
      .exec((err, data) => {
        if (err) next(err);
        if (data) {
          let displayData = {
            id: data.id,
            username: data.username,
            count: data.count
          };
          if (from) displayData.from = from.toDateString();
          if (to) displayData.to = to.toDateString();
          displayData.log = data.log.filter(item => {
            if (from && to) {
              return item.date >= from && item.date <= to;
            } else if (from) {
              return item.date >= from;
            } else if (to) {
              return item.date <= to;
            } else {
              return true;
            }
          });
          console.log(displayData);
          res.json(displayData);
        } else {
          next();
        }
      });
  } else {
    res.send(
      "UserId is required. For example, api/exercise/log?userId=554fejdcdd485fje"
    );
  }
});

app.get("/api/exercise/users", function(req, res) {
  user.find({}, function(err, data) {
    if (err) err;
    let obj = data.map(item => {
      return `username:${item.username}, _id:${item._id}`;
    });
    res.json(obj);
  });
});

app.get("/api/exercise/users", function(req, res) {
  console.log("loading///");
  user.find({}, function(err, data) {
    if (err) err;
    let obj = data.map(item => {
      return `username:${item.username}, _id:${item._id}`;
    });
    res.json(obj);
  });
});

// Not found middleware
app.use((req, res, next) => {
  return next({ status: 404, message: "not found" });
});

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage;

  if (err.errors) {
    // mongoose validation error
    errCode = 400; // bad request
    const keys = Object.keys(err.errors);
    // report the first validation error
    errMessage = err.errors[keys[0]].message;
  } else {
    // generic or custom error
    errCode = err.status || 500;
    errMessage = err.message || "Internal Server Error";
  }
  res
    .status(errCode)
    .type("txt")
    .send(errMessage);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
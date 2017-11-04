'use strict';

var express = require("express");
var app = express();
var routes = require("./routes");

var jsonParser = require("body-parser").json;
var logger = require("morgan");


app.use(logger("dev"));
app.use(jsonParser());

var mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost:27017/sandbox");
//mongoose.connect("mongodb://ainojie@gmail.com:p@lleter1@localhost:27017/sandbox");
const MONGODB_URI = "mongodb://Ainojie:p@lleter1@ds243055.mlab.com:43055/student_resources";

mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;

db.on("error", (err) => {
    console.error("connection error:", err);
});

db.once("open", () => {
    console.log("db connection successfull");
    //All database communication goes here
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use("/resources",routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
});


var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Express server is listening on port ", port);
});


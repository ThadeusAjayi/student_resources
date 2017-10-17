'use strict';

var express = require("express");
var app = express();
var apiroutes = require("./apiroutes");
var webroutes = require("./webroutes");

var jsonParser = require("body-parser").json;
var logger = require("morgan");

app.use(logger("dev"));
app.use(jsonParser());

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox");

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
    res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use("/static", express.static(__dirname + "/public"));

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/resources", apiroutes);

app.use("/", webroutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    //Check req details to make an if/else statement to handle api errors and html errors separately
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


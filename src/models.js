'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//These are schemas for public reference to db schema

var StudentSchema = new Schema ({
    name: String,
    age:  Number,
    sex: String, 
    level:  String, 
    department: String,
    faculty: String
});

//If all fails remove this
// StudentSchema.pre("save", function (next) {
//     this.Student.name.sort();
//     next();
// });

var UserSchema = new Schema ({
    username: String,
    email: String,
    password: String
});

var Student = mongoose.model("Student", StudentSchema);
var User = mongoose.model("User", UserSchema);

module.exports.Student = Student;
module.exports.User = User;
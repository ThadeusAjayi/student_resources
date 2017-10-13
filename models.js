'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;


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

var Student = mongoose.model("Student", StudentSchema);

module.exports.Student = Student;
'use strict';

var mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost/sandbox");
//mongodb://<dbuser>:<dbpassword>@ds243055.mlab.com:43055/student_resources
const MONGODB_URI = "mongodb://Ainojie:p@lleter1@ds243055.mlab.com:43055/student_resources";

mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;

db.on("error", (err) => {
    console.error("connection error:", err);
});

db.once("open", () => {
    console.log("db connection successfull");
    //All database communication goes here

    var Schema = mongoose.Schema;
    var StudentSchema = new Schema({
        name:   {type: String, default: "Student"},
        age:    {type: Number, default: 18},
        sex:    {type: String, default: ""},
        level:  String, 
        department: {type: String, default: ""},
        faculty:    {type: String, default: ""}
    });

    //Arrow functions fails here so normal function call for callback
    StudentSchema.pre("save", function(next) {
        if (this.level == undefined) {
            if (this.age >= 25) {
                this.level = "Graduate";
            } else {
                this.level = "Undergraduate";
            }
        }
        next();
    });

    //Static  function for creating special queries on the module
    //Static function without predefined search parameter
    StudentSchema.statics.findLevel = function(level, callback) {
        return this.find({level: level}, callback);
    };

    //Static function with predefined search parameter
    StudentSchema.statics.findGraduates = function(callback) {
        return this.find({sex: "F"}, callback);
    };

    //Instance methods on each document (i.e items in database)
    //Search a document and others that have a similar property being checked
    StudentSchema.methods.findAge = function(callback) {
        //this == document 
        return this.model("Student").find({level: "Graduate"}, callback);
    }

    //Mongoose object called model
    var Student = mongoose.model("Student", StudentSchema);

    var person = new Student({
        name: "Thadeus",
        age: 27,
        sex: "M",
        level: "Graduate",
        department: "Political Science",
        faculty: "Social Science"
    });

    var person2 = new Student({});

    var studentsArray = [
        {
            name: "Jane",
            age: 29,
            sex: "F",
            department: "Business Administration"
        },
        {
            name: "Audrey",
            age: 25,
            sex: "F",
            department: "Business Administration"
        },
        {
            name: "Hillary",
            age: 31,
            sex: "F",
            department: "Accounting"
        },
        {
            name: "Rice",
            age: 33,
            sex: "F",
            department: "Accounting"
        },
        person,
        person2,
        {
            name: "Trump",
            age: 24,
            sex: "M",
            department: "Computer Science",
            faculty: "Science"
        }
    ]

    Student.remove({}, (err) => {
        if (err) console.error(err);
        Student.create(studentsArray,(err, students) => {
            if (err) console.error("Save Failed", err);
            Student.findOne({sex: "F"}, (err, student) => {
                student.findAge((err, students) => {
                    students.forEach((student) => {
                        console.log(student.name + " the " + student.age + " year old " + student.department + " student is a/an " + student.level);
                    });
                    db.close(() => {
                        console.log("db Connection closed");
                    });
                });
            });     
        });  
    });
});
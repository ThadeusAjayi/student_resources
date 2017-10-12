'use strict';

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on("error", (err) => {
    console.error("connection error:", error);
});

db.once("open", () => {
    console.log("db connection successfull");
    //All database communication goes here

    var Schema = mongoose.Schema;
    var StudentSchema = new Schema({
        name:   {type: String, default: "Student"},
        age:    {type: String, default: 18},
        sex:    {type: String, default: "Sex"},
        level:  {type: String, default: "Undergraduate"},
        department: {type: String, default: ""},
        faculty:    {type: String, default: ""}
    });

    //Mongoose object called model
    var Student = mongoose.model("Student",StudentSchema);

    var person = new Student({
        name: "Thadeus",
        age: 27,
        sex: "M",
        level: "Graduate",
        department: "Political Science",
        faculty: "Social Science"
    });

    var person2 = new Student({});

    var nathan = new Student({
        name: "Nathan",
        age: 24,
        sex: "M",
        level: "Undergraduate",
        department: "Computer Science",
        faculty: "Science"
    });

    Student.remove({}, (err) => {
        if (err) console.error(err);
        person.save((err)=> {
            if (err) console.error("Save Failed.", err);
            person2.save((err) => {
                if (err) console.error("Save Failed.", err);
                nathan.save((err) => {
                    if (err) console.error("Save Failed", err);
                    Student.find({sex: "M"}, (err, students) => {
                        students.forEach((student) => {
                            console.log(student.name + " the " + student.age + " " + student.department)
                        });
                        db.close(() => {
                            console.log("db Connection closed");
                        });
                    });
                });                    
            });
        });
    });
});
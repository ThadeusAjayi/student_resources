'use strict';

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/sandbox");

var db = mongoose.connection;

db.on("error", (err) => {
    console.error("connection error:", err);
});

db.once("open", () => {
    console.log("db connection successfull");
    //All database communication goes here

    var Schema = mongoose.Schema;
    //Create schema into the database
    var UserSchema = new Schema ({
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        }
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

    //Mongoose object called model
    var User = mongoose.model("User", UserSchema);

    var person = new Student({
        username: "Thadeus",
        email: "ainojie@gmail.com",
        password: "p@lleter1"
    });

    var person2 = new Student({});

    var studentsArray = [
        {
            username: "Thadeus",
            email: "ainojie@gmail.com",
            password: "p@lleter1"
        },
        {
            username: "Thadeus",
            email: "ainojie@gmail.com",
            password: "p@lleter1"
        },
        {
            username: "Thadeus",
            email: "ainojie@gmail.com",
            password: "p@lleter1"
        },
        {
            username: "Thadeus",
            email: "ainojie@gmail.com",
            password: "p@lleter1"
        },
        person,
        person2,
        {
            username: "Thadeus",
            email: "ainojie@gmail.com",
            password: "p@lleter1"
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
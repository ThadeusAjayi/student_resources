'use strict';

var express = require("express");
var router = express.Router();
var Student = require("./models").Student;

//GET /resources
//Route to get all students' resources
router.get("/", (req, res, next) => {
    Student.find({}, (err, students) => {
        if (err) return next(err);
        res.json(students);
    });
});

//GET /resources
//Route to specific students' resources it is currently ObjetId in db
router.get("/:id", (req, res, next) => {
    Student.findById(req.params.id, (err, doc) => {
        if (doc == null) return next(err);
        res.json(doc);
    });
});

//POST /resources
//Route to create students' resources
router.post("/", (req, res, next) => {
    var student = new Student(req.body);
    student.save((err, student) => {
        if (err) return next(err);
        res.status = 201;
        res.json(student);
    });
});

//PUT /resources
//Route to update students' resources
router.put("/:id", (req, res, next) => {
    Student.findById({_id: req.params.id}, (err, doc) => {
        if (doc == null) return next (err);
        doc.update(req.body, (err) => {
            if (err) return next (err);
            res.json({
                response: "You sent to UPDATE " + doc.name
            })
        })
    })
});

//DELETE /resources
//Route to delete students' resources
//TODO make sure delete doesnt send when item doesnt exit
router.delete("/:id", (req, res, next) => {
    Student.findById({_id: req.params.id}, (err, doc) => {
        if (doc == null) return next(err);
        Student.remove({_id: req.params.id}, (err) => {
            if (err) return next(err);
            res.status = 201;
            res.json({
                response: "You have sent to delete the user :" + doc.name
            })
        });
    })
});

module.exports = router;
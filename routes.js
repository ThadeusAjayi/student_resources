'use strict';

var express = require("express");
var router = express.Router();

//GET /resources
//Route to get all students' resources
router.get("/", (req, res) => {
    res.json({response: "You sent me a GET request"});
});

//GET /resources
//Route to specific students' resources
router.get("/:id", (req, res) => {
    res.json({
        response: "You sent me a GET request" + req.params.id
    });
});

//POST /resources
//Route to create students' resources
router.post("/", (req, res) => {
    res.json({
        response: "You sent me a GET request",
        body: req.body
    });
});

//PUT /resources
//Route to update students' resources
router.put("/:id", (req, res) => {
    res.json({
        response: "You sent me a PUT request",
        body: req.body
    });
});

//DELETE /resources
//Route to delete students' resources
router.delete("/:id", (req, res) => {
    res.json({
        response: "You sent me a DELETE request " + req.params.id
    });
});

module.exports = router;
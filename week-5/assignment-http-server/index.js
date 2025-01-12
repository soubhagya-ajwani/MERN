const express = require("express")

const app = express()

app.get("/multiply", function(req, res) {
    output = req.query.a * req.query.b
    res.send(output)
})

app.get("/add", function(req, res) {
    output = req.query.a + req.query.b
    res.send(output)
})

app.get("/divide", function(req, res) {
    output = req.query.a / req.query.b
    res.send(output)
})

app.get("/subtract", function(req, res) {
    output = req.query.a - req.query.b
    res.send(output)
})

app.listen(3000)
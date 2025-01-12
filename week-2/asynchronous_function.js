const fs = require("fs")

function read(err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
}

// Asynchronous functions
fs.readFile("a.txt", "utf-8", read)
fs.readFile("b.txt", "utf-8", read)
fs.readFile("c.txt", "utf-8", read)
console.log("Done!")
const fs = require("fs")

// var data = fs.readFile("a.txt", "utf-8", function(err, data) {
//     return data
// })
// console.log(data)

function readFilePromisified(file, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, encoding, function(err, data) {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

function printData(data) {
    console.log(data)
}

function printError(err) {
    console.error(err)
}

readFilePromisified("c.txt", "utf-8").then(printData).catch(printError)
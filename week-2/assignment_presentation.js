/*
    Write a function that
    Reads the contents of a file
    Trims the extra space from the left and right
    Writes it back to the file
*/

const fs = require("fs")

function onDone() {
    console.log("File operation completed")
}

function logError(err) {
    console.error(err)
}

// callback approach
function cleanFile(inputFile, outputFile) {
    fs.readFile(inputFile, "utf-8", function(err, data) {
        if (err) {
            console.error("Error while reading the file")
        } else {
            data = "Trimmed data: " + data.trim()
            fs.writeFile(outputFile, data, err => {
                if (err) {
                   logError(err)
                } else {
                    onDone()
                }
            })
        }
    })
}

// cleanFile("a.txt", "output.txt")

// promisfied approach
function readFilePromisified(inputFile, outputFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(inputFile, "utf-8", function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve({
                    "data": data,
                    "outputFile": outputFile
                })
            }
        })
    })
}

function trimDataPromisified(object) {
    return new Promise((resolve) => {
        resolve({
            "data": "Trimmed data: " + object.data.trim(),
            "outputFile": object.outputFile
        })
    })
}

function writeFilePromisified(object) {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            object.outputFile,
            object.data,
            err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            }
        )
    })
}

function cleanFilePromisified(inputFile, outputFile) {
    readFilePromisified(inputFile, outputFile).catch(logError)
    .then(trimDataPromisified)
    .then(writeFilePromisified).catch(logError)
    .then(onDone)
}

cleanFilePromisified("a.txt", "output.txt")
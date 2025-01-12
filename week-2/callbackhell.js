// callback hell
/*
    logs hi after 1 second
    logs hello 3 seconds after step 1
    logs hello there 5 seconds after step 2
*/
function callback() {
    console.log("hi")
    setTimeout(function() {
        console.log("hello")
        setTimeout(function() {
            console.log("hello there")
        }, 5000)
    }, 3000)
}

// setTimeout(callback, 1000)

// promisified version
function setTimeoutPromisified(ms) {
    return new Promise(resolve => {setTimeout(resolve, ms)})
}

// setTimeoutPromisified(1000).then(function() {
//     console.log("hi")
//     setTimeoutPromisified(3000).then(function() {
//         console.log("hello")
//         setTimeoutPromisified(5000). then(function () {
//             console.log("hello there")
//         })
//     })
// })

// alternate promisified version
setTimeoutPromisified(1000).then(function() {
    console.log("hi")
    return setTimeoutPromisified(3000)
}).then(function() {
    console.log("hello")
    return setTimeoutPromisified(5000)
}).then(function() {
    console.log("hello there")
})
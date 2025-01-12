// Write your own promise class

class Promise2 {

    constructor(fn) {
        this.fn = fn
        this.promiseStatus = "pending"
        this. value = undefined
        this.callBacks = []
        this.resolve = this.resolve.bind(this)
        this.fn(value => this.resolve(value))
    }

    resolve(value) {
        this.value = value
        this.promiseStatus = "fulfilled"
        this.callBacks.forEach(callBack => callBack(this.value))
    }

    then(callBack) {
        if (this.promiseStatus == "fulfilled") {
            callBack(this.value)
        } else {
            this.callBacks.push(callBack)
        }
        return this
    }
}

function setTimeoutPromisified(ms) {
    return new Promise2(resolve => {setTimeout(resolve, ms)})
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

// function dummyFunction(resolve) {
//     resolve()
// }

// function dummyFunction2(resolve) {
//     setTimeout(resolve, 5000)
// }

// function callBack(value) {
//     console.log("CallBack with value: " + value)
// }

// // var promise = new Promise2(dummyFunction).then(callBack).then(callBack)
// // console.log(promise)

// var promise2 = new Promise2(dummyFunction2).then(callBack).then(callBack)
// console.log(promise2)


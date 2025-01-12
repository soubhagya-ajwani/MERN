function sum(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function doOp(a, b, opName) {
    return opName(a, b)
}

console.log(1, 2, sum)
console.log(doOp(1, 2, sum))
console.log(doOp(1, 2, multiply))
console.log(doOp(1, 2, subtract))
console.log(doOp(1, 2, divide))
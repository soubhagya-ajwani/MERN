// Assignment 1
function sum(a,b) {
    return a + b
}

// Assignment 2
function canVote(age) {
    return age > 18
}

// Assignment 3
function sumUpto(input) {
    let sum = 0
    for (i = 1; i <= input; i++) {
        sum += i
    }
    return sum
}

// Assignment no... who cares!
function greet(user) {
    let salutation
    if (user.gender == "male") {
        salutation = "Mr."
    } else if (user.gender == "female") {
        salutation = "Ms."
    } else {
        salutation = "dear"
    }

    return "Hello " + salutation + " " + user.name + ", your age is " + user.age + "."
}

console.log(sum(1,2))
console.log(canVote(16))
console.log(canVote(19))
console.log(sum("Hello"," Soubhagya"))
console.log(sum("Hello",3))
console.log(sumUpto(5))

let soubhagya = {
    name: "Soubhagya",
    age: 24,
    gender: "male"
}

let deepika = {
    name: "Deepika",
    age: 28,
    gender: "female"
}

let prateek = {
    name: "Prateek",
    age: 25,
    gender: "other"
}

console.log(greet(soubhagya))
console.log(greet(deepika))
console.log(greet(prateek))

// Another cool assignment (approach 1)
function filterOlderThan18(users) {
    let olderThan18 = []
    for (user of users) {
        if (user.age > 18) {
            olderThan18.push(user)
        }
    }
    return olderThan18
}

// Approach 2
function filterOlderThan18SecondApproach(users) {
    return users.filter(user => user.age > 18)
}

let users = [
    {
        name: "Soubhagya",
        age: 24,
        gender: "male" 
    },
    {
        name: "Deepika",
        age: 29,
        gender: "female"
    },
    {
        name: "Vanshu",
        age: 12,
        gender: "male"
    }
]

console.log(filterOlderThan18(users))
// should return the same output as above
console.log(filterOlderThan18SecondApproach(users))
class Rectangle {

    constructor(height, width, color) {
        this.height = height
        this.width = width
        this.color = color
    }

    area() {
        return this.height * this.width
    }

    paint() {
        return "The color of this rectangle is " + this.color + "."
    }
}

const rectangle = new Rectangle(2,4)
console.log(rectangle.area())

const rectangle_2 = new Rectangle(3,5,"red")
console.log(rectangle_2.paint())
import Drawable from './Drawable'


export default class Food extends Drawable {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }

    setX(newX) {
        this.x = newX
    }

    setY(newY) {
        this.y = newY
    }

    draw() {
        this.ctx.fillStyle = "green"
        this.ctx.fillRect(this.x, this.y, snakeSize, snakeSize)
    }
}
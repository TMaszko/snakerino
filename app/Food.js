
class Food extends Drawable {
    constructor(size) {
        super();
        this.size = size
        this.x = null;
        this.y = null
    }

    setX(newX) {
        this.x = newX
    }

    setY(newY) {
        this.y = newY
    }

    draw() {
        this.ctx.fillStyle = "green"
        this.ctx.fillRect(this.x, this.y, this.size, this.size)
    }
}
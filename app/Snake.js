

class Snake extends Drawable {
    constructor(body, speed, direction = {}) {
        super();
        this.direction = direction
        this.body = body
        this.speed = speed
        this.size = speed
    }

    getDirection() {
        return this.direction
    }

    setDirection(newDirection) {
        this.direction = newDirection
    }

    draw() {
        this.ctx.fillStyle = "#000"
        this.body.forEach(cell => {
            this.ctx.fillRect(cell.x, cell.y, this.size, this.size)
        })
    }
    eat(food) {
        this.body.unshift({ x: food.x, y: food.y })
    }

    //afterMove
    isCollidingWithOwnBody() {
        const bodyWithoutHead = this.body.slice(1)
        const [head] = this.body
        const isColliding = bodyWithoutHead.findIndex(bodyPart => 
            bodyPart.x === head.x && 
            bodyPart.y === head.y) !== -1
        return isColliding

    }

    getHead() {
        return this.body[0]
    }

    setHead(position) {
        this.body[0] = position
    }
    move() {
        const head = this.getHead()
        this.body = [
            {
                x: head.x + this.speed * this.direction.x,
                y: head.y + this.speed * this.direction.y
            }, 
            ...this.body.slice(0, -1)
        ]
    }

    shouldEat(food) {
        const [head] = this.body
        return head.x === food.x && head.y === food.y
    }

    update() {
        this.move()
    }
}
class Game extends Drawable {
    constructor(tileSize, frameRate = 15) {
        super();
        this.tileSize = tileSize;
        this.canvas = document.querySelector('canvas')
        this.frameRate = frameRate;
        this.state = {
            startTime: 0,
            keysState: null,
            snake: null,
            food: new Food(tileSize),
            isRunning: true
        }
    }

    prepareSizeOfGame() {
        this.canvas.width = 1000
        this.canvas.height = 800
    }

    prepareGame() {
        window.addEventListener('keydown', this.setNewKeyStateIfValidMove.bind(this))
        this.setNewRandomFoodLocation(this.state.food)
        this.state.snake = new Snake(this.getInitSnakePosition(), this.tileSize)
        this.state.keysState = config
        this.state.startTime = new Date()
     
    }

    getInitSnakePosition() {
        const initPosition = [
            {
                x: Math.floor((this.canvas.width - this.tileSize) / 2 / this.tileSize) * this.tileSize,
                y: Math.floor((this.canvas.height - this.tileSize) / 2 / this.tileSize) * this.tileSize
            }
        ]

        return initPosition 
    }

    prepare() {
        this.prepareSizeOfGame()
        this.prepareGame()
    }

    setNewKeyStateIfValidMove(event) {
        const keyCode = parseInt(event.which, 10)
        const currentSnakeDirectionKeyCode = this.state.snake.getDirection().keyCode
        const isValidMove = Math.abs(currentSnakeDirectionKeyCode - keyCode) !== 2
        if(keyCode !== parseInt(currentSnakeDirectionKeyCode) && isValidMove) {
            this.state.keysState[keyCode].active = true,
            this.state.keysState[currentSnakeDirectionKeyCode].active = false
        }
    }

    getDirectionFromActiveKey() {
        const { keysState } = this.state
        const currentActiveKey = Object.keys(keysState).find(keyCode => keysState[keyCode].active)
        return { ...keysState[currentActiveKey].dir, keyCode: currentActiveKey }
    }


    handleEdges() {
        const { snake } = this.state
        const snakeHead = snake.getHead()
        if (snakeHead.x >= this.canvas.width || snakeHead.x < 0) {
            snakeHead.x = snakeHead.x - snake.getDirection().x * this.canvas.width
        } else if (snakeHead.y >= this.canvas.height || snakeHead.y < 0) {
            snakeHead.y = snakeHead.y - snake.getDirection().y * this.canvas.height
        }
        
    }

    isGameOver() {
        return this.state.snake.isCollidingWithOwnBody()
    }

    update() {
        if(this.isGameOver()) {
            this.state.isRunning = false
        } else {
            const { snake, food } = this.state
            if(snake.shouldEat(food)) {
                snake.eat(food)
                this.setNewRandomFoodLocation()
            }
            snake.setDirection(this.getDirectionFromActiveKey())
            snake.update()
        }
    }
    
    shouldUpdate() {
        if(this.state.isRunning) {
            const delta = new Date() - this.state.startTime
            return delta >= 1000 / this.frameRate
        }
        return false;
    }
    render() {
        if(!this.state.isRunning) {
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.fillStyle = "#fff"
            this.ctx.fillText('GAME OVER', 100, 100);
        } else {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            const {snake, food } = this.state
            this.handleEdges()
            snake.draw()
            food.draw()
        }
        
    }
    setNewRandomFoodLocation() {
        const newFoodX = Math.floor((Math.random() * this.canvas.width) / this.tileSize) * this.tileSize
        const newFoodY = Math.floor((Math.random() * this.canvas.height) / this.tileSize) * this.tileSize 
        this.state.food.setX(newFoodX)
        this.state.food.setY(newFoodY)
    }

    start() {
        if(this.shouldUpdate()) {
            this.update()
            this.render()
            this.state.startTime = new Date();
        }
        requestAnimationFrame(this.start.bind(this))
    }
}
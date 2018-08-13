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
        const initPosition = [this.getRandomLocationInGame()]
        return initPosition 
    }

    prepare() {
        this.prepareSizeOfGame()
        this.prepareGame()
    }

    isValidKeyPair(currentKeyCode, keyCode) {
        return Math.abs(currentKeyCode - keyCode) !== 2
    }

    setNewKeyStateIfValidMove(event) {
        const keyCode = parseInt(event.which, 10)
        const currentSnakeDirectionKeyCode = parseInt(this.state.snake.getDirection().keyCode, 10)
        const isValidMove = this.isValidKeyPair(currentSnakeDirectionKeyCode, keyCode) 
        if (keyCode !== currentSnakeDirectionKeyCode && isValidMove) {
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

    drawGameOverScreen() {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = "#fff"
        this.ctx.fillText('GAME OVER', 100, 100);
    }


    render() {
        if(!this.state.isRunning) {
            this.drawGameOverScreen()
        } else {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            const {snake, food } = this.state
            this.handleEdges()
            snake.draw()
            food.draw()
        }
        
    }

    getRandomNumberInMaxRange(maxRange) {
        return Math.floor((Math.random() * maxRange) / this.tileSize) * this.tileSize
    }

    getRandomLocationInGame() {
        const x = this.getRandomNumberInMaxRange(this.canvas.width)
        const y = this.getRandomNumberInMaxRange(this.canvas.height)
        return {
            x,
            y
        }
    }

    setNewRandomFoodLocation() {
        const {x : newFoodX, y: newFoodY} = this.getRandomLocationInGame()
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
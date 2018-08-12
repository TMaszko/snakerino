
window.addEventListener('load', () => {

    const LEFT = '37'
    const UP = '38'
    const RIGHT = '39'
    const DOWN = '40'
    

    var stop = false
    var canvas = document.getElementById('canv')
    var ctx = canvas.getContext('2d')
    canvas.width = 800
    canvas.height = 1000
    var speed = 10
    var snakeSize = 10;
    var snake = [{x: Math.floor((canvas.width - snakeSize)/2 /10) * 10, y: Math.floor((canvas.height - snakeSize)/2 /10) * 10}]
    var food = generateFood()
    var snakeCurrentDirection = {
        no: RIGHT,
        dir: {x: 1, y: 0}
    }
    var startTime = new Date()
    var delta;
    let keys = {
        [LEFT]: {
            pressed: false,
            dir: {
                x: -1,
                y: 0
            }
        },
        [UP]: {
            pressed: false,
            dir: {
                x: 0,
                y: -1,
            }
        },
        [RIGHT]:{ 
            pressed: false,
            dir: {
                x: 1,
                y: 0
            }
        },
        [DOWN] :{
            pressed: false, 
            dir: {
                x: 0,
                y: 1
            }
        },
    }
    console.log(food)
    loop()


window.addEventListener('keydown', changeDirection)


 function render() {
     ctx.fillStyle = "#000"
     snake.forEach(cell => {
         ctx.fillRect(cell.x, cell.y, snakeSize, snakeSize)
     })
     ctx.fillStyle = "green"
     ctx.fillRect(food.x, food.y, snakeSize, snakeSize)

 }

 function eat() {

     snake.unshift({x: food.x, y: food.y})
 }



 function generateFood() {
     return { x: Math.floor((Math.random() * canvas.width) / 10) * 10, y: Math.floor((Math.random() * canvas.height) / 10) * 10 }
    
 }
 function changeDirection(event) {
    const keyPressed = event.keyCode.toString()
    const previousPressedKey = Object.keys(keys).find(k => keys[k].pressed) || RIGHT
    keys[previousPressedKey].pressed = false
    keys[keyPressed].pressed = true
 }

 function makeMove(snake, xDirection, yDirection) {
     return {
         x: snake.x + speed * xDirection,
         y: snake.y + speed * yDirection
     }
 }

 function update(currentKey, currentSnakeDirection) {
     // Cant change snakeDirection in makeMove ,only values which are sep
     if(currentSnakeDirection.no === RIGHT && currentKey !== LEFT ||
        currentSnakeDirection.no === LEFT && currentKey !== RIGHT ||
        currentSnakeDirection.no === UP && currentKey !== DOWN ||
        currentSnakeDirection.no === DOWN && currentKey !== UP
    ) {
        currentSnakeDirection.dir = keys[currentKey].dir
        currentSnakeDirection.no = currentKey
    }
     if (snake[0].x === food.x && snake[0].y === food.y) {
         eat()
         food = generateFood()
     } else
     if (snake.slice(1).findIndex(el => el.x === snake[0].x && el.y === snake[0].y) !== -1) {
         console.log(snake)
         console.log(snake.slice(1).find(el => el.x === snake[0].x && el.y === snake[0].y))

         stop = true
         ctx.fillRect(0, 0, canvas.width, canvas.height)
         ctx.fillStyle = "#fff"
         ctx.fillText('GAME OVER', 100, 100);
     }
     snake = [makeMove(snake[0], currentSnakeDirection.dir.x, currentSnakeDirection.dir.y ), ...snake.slice(0, snake.length -  1)]
     console.log(snake[0].x, snake[0].y)
     if (snake[0].x >= canvas.width) {
         snake[0].x = snake[0].x -  canvas.width
         console.log(snake[0].x, canvas.width)
     } else if(snake[0].x < 0) {
         snake[0].x += canvas.width
     } else if (snake[0].y >= canvas.height) {
         snake[0].y -= canvas.height
     } else if (snake[0].y < 0) {
         snake[0].y += canvas.height
     }

    
 }


 function loop() {
     delta = (new Date() - startTime)
     if (delta >= 1000 / 10 && !stop) { 
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const currentKey = Object.keys(keys).find(k => keys[k].pressed) 
        update(currentKey || snakeCurrentDirection.no , snakeCurrentDirection)
        render()
        startTime = new Date()
     }
    
    
    requestAnimationFrame(loop)
 }



})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
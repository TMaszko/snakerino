const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40


var config = {
    [LEFT.toString()]: {
        keyCode: LEFT,
        name: 'LEFT',
        active: false,
        dir: {
            x: -1,
            y: 0
        }
    },
    [UP.toString()]: {
        keyCode: UP,
        name: 'UP',
        active: false,
        dir: {
            x: 0,
            y: -1,
        }
    },
    [RIGHT.toString()]: {
        keyCode: RIGHT,
        name: 'RIGHT',
        active: true,
        dir: {
            x: 1,
            y: 0
        }
    },
    [DOWN.toString()]: {
        keyCode: DOWN,
        name: 'DOWN',
        active: false,
        dir: {
            x: 0,
            y: 1
        }
    },
}
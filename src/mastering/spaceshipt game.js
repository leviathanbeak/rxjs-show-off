import { Observable } from 'rxjs/Rx'

// CONSTANTS
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const SPEED = 40
const STAR_NUMBER = 250
const HERO_Y = canvas.height - 30

// event streams
const mouseMove$ = Observable.fromEvent(canvas, 'mousemove')

const SpaceShip$ = mouseMove$.map(evt => ({ x: evt.clientX, y: HERO_Y }))
    .startWith({
        x: canvas.width / 2,
        y: HERO_Y
    })



const StarStream$ = Observable.range(1, STAR_NUMBER)
    .map(() => ({ x: parseInt(Math.random() * canvas.width), y: parseInt(Math.random() * canvas.height), size: Math.random() * 3 + 1 }))
    .toArray()
    .flatMap(starArray => {
        return Observable.interval(SPEED).map(() => {
            starArray.forEach(star => {
                if (star.y >= canvas.height) {
                    star.y = 0
                }

                star.y += star.size
            })
            return starArray
        })
    })

const Game$ = Observable.combineLatest(
    StarStream$, SpaceShip$, (stars, spaceship) => ({ stars, spaceship })
)


// HELPER FUNCTIONS

function _paintStars(stars) {
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#ffffff'
    stars.forEach(star => {
        ctx.fillRect(star.x, star.y, star.size, star.size)
    })
}

function _drawTriangle(x, y, width, color, direction) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(x - width, y)
    ctx.lineTo(x, direction === 'up' ? y - width : y + width)
    ctx.lineTo(x + width, y)
    ctx.lineTo(x - width, y)
    ctx.fill()
}

function _paintSpaceShip(x, y) {
    _drawTriangle(x, y, 20, '#ff0000', 'up')
}

function _renderScene(actors) {
    _paintStars(actors.stars)
    _paintSpaceShip(actors.spaceship.x, actors.spaceship.y)
}

// APPLICATION

Game$.subscribe(_renderScene)
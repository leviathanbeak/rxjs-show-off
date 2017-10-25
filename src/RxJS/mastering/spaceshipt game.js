import { Observable, BehaviorSubject } from 'rxjs/Rx'

// CONSTANTS
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const SPEED = 40
const STAR_NUMBER = 250
const HERO_Y = canvas.height - 30
const ENEMY_FREQUENCY = 1500
const SHOOTING_SPEED = 15
const ENEMY_SHOOTING_FREQUENCY = 750

// event streams
const ScoreBehaviorSubject = new BehaviorSubject(0)
const score$ = ScoreBehaviorSubject.scan((prev, curr) => prev + curr, 0)
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

const EnemyStream$ = Observable.interval(ENEMY_FREQUENCY)
    .scan(enemyArray => {
        const enemy = {
            x: parseInt(Math.random() * canvas.width),
            y: -30,
            shots: []
        }

        Observable.interval(ENEMY_SHOOTING_FREQUENCY).subscribe(() => {
            if (!enemy.isDead) {
                enemy.shots.push({ x: enemy.x, y: enemy.y })
            }
            enemy.shots = enemy.shots.filter(_isVisible)
        })

        enemyArray.push(enemy)
        return enemyArray.filter(_isVisible).filter(enemy => !(enemy.isDead && enemy.shots.length === 0))
    }, [])

const PlayerFiring$ = Observable.merge(
    Observable.fromEvent(canvas, 'click'),
    Observable.fromEvent(document, 'keydown').filter(evt => evt.keycode === 32)
).startWith({}).sample(Observable.interval(200)).timestamp()

const HeroShots$ = Observable.combineLatest(
        PlayerFiring$, SpaceShip$, (shotEvents, spaceShip) => ({ timestamp: shotEvents.timestamp, x: spaceShip.x })
    ).distinctUntilChanged(null, shot => shot.timestamp)
    .scan((shotArray, shot) => {
        shotArray.push({ x: shot.x, y: HERO_Y })
        return shotArray
    }, [])

const Game$ = Observable.combineLatest(
    StarStream$, SpaceShip$, EnemyStream$, HeroShots$, score$, (stars, spaceship, enemies, heroShots, score) => ({ stars, spaceship, enemies, heroShots, score })
).sample(Observable.interval(SPEED)).takeWhile(actors => !_gameOver(actors.spaceship, actors.enemies))


// HELPER FUNCTIONS

function _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

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
    _paintEnemies(actors.enemies)
    _paintHeroShots(actors.heroShots, actors.enemies)
    _paintScore(actors.score)
}

function _paintEnemies(enemies) {
    enemies.forEach(enemy => {
        enemy.y += 5
        enemy.x += _getRandomInt(-15, 15)

        if (!enemy.isDead) {
            _drawTriangle(enemy.x, enemy.y, 20, '#00ff00', 'down')
        }

        enemy.shots.forEach(shot => {
            shot.y += SHOOTING_SPEED
            _drawTriangle(shot.x, shot.y, 5, '#00ffff', 'down')
        })
    })
}

function _paintHeroShots(heroShots, enemies) {
    heroShots.forEach((shot, i) => {

        for (let enemy of enemies) {
            if (!enemy.isDead && _collision(shot, enemy)) {
                ScoreBehaviorSubject.next(10)
                enemy.isDead = true
                shot.x = shot.y = -100
                break
            }
        }

        shot.y -= SHOOTING_SPEED
        _drawTriangle(shot.x, shot.y, 5, '#ffff00', 'up')
    })
}

function _isVisible(obj) {
    return obj.x > -40 && obj.x < canvas.width + 40 && obj.y > -40 && obj.y < canvas.height + 40
}

function _collision(target1, target2) {
    return (target1.x > target2.x - 20 && target1.x < target2.x + 20) && (target1.y > target2.y - 20 && target1.y < target2.y + 20)
}

function _gameOver(ship, enemies) {
    return enemies.some(enemy => {
        if (_collision(ship, enemy)) {
            return true
        }

        return enemy.shots.some(shot => {
            return _collision(ship, shot)
        })
    })
}

function _paintScore(score) {
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 26px sans-serif'
    ctx.fillText(`Score ${score}`, 40, 43)
}

// APPLICATION
Game$.subscribe(_renderScene)
import { Observable } from 'rxjs/Rx'

function updateDistance(acc, i) {
    if (i % 2 === 0) {
        acc += 1
    }
    return acc
}

const ticksObservable = Observable.interval(1000).scan(updateDistance, 0)

//ticksObservable.subscribe(evenTicks => console.log(evenTicks))
//ticksObservable.subscribe(evenTicks => console.log(evenTicks))

const button = document.getElementById('button')


function onClick(prev, next) {
    console.log(`previous is ${prev}`)
    console.log(`next is ${next}`)
    return next
}

Observable.fromEvent(button, 'click').scan(onClick, 0).subscribe(e => console.log(e))
import { Observable } from 'rxjs/Rx'

const input = document.createElement('input')
input.setAttribute('id', 'amount')
input.setAttribute('type', 'number')
document.body.appendChild(input)
const inputAmount = document.querySelector('#amount')

// buffer() gathers events emitted by source observables into a buffer until a passed-in observable called the closing observable emits an event
Observable.timer(0, 50)
    .buffer(Observable.timer(550))
    .subscribe(x => {
        console.log(`data in buffer ${x}`)
    })

// bufferCount() retains a certain amount of data at a time, which you define by passing a size
Observable.fromEvent(inputAmount, 'keyup')
    .bufferCount(5)
    .map(events => events[0].target.value)
    .map(val => parseInt(val, 10))
    .filter(val => !Number.isNaN(val))
    .subscribe(amount => {
        console.log(`5 digit number: ${amount}`)
    })

// bufferWhen() is useful for caching events until another observable emits a value
Observable.fromEvent(document, 'mousemove')
    .throttleTime(1000)
    .bufferWhen(() => Observable.fromEvent(document, 'click'))
    .subscribe(x => {
        console.log(`in subscriber`)
        console.log(x)
    })

// buferTime() holds onto data from an observable sequence for a specific period of time and then emits it as an observable
Observable.fromEvent(inputAmount, 'keyup')
    .bufferTime(4000)
    .subscribe(x => console.log(x))
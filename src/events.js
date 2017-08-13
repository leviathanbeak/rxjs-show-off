import Rx from 'rxjs/Rx'
import getSubscriber from './getSubscriber'

const input = document.getElementById('input')
const button = document.getElementById('button')
const coords = document.getElementById('coords')

const buttonStream$ = Rx.Observable.fromEvent(button, 'click')

buttonStream$.subscribe(x => {
    console.log('Clicked')
}, err => {
    console.log(err)
}, () => {
    console.log('completed')
})

const inputStream$ = Rx.Observable.fromEvent(input, 'keyup')

inputStream$.subscribe(x => {
    console.log(x)
})

const mouseMove$ = Rx.Observable.fromEvent(document, 'mousemove')

mouseMove$.subscribe(x => {
    coords.innerHTML = `X: ${x.clientX} - Y: ${x.clientY}`
})

const nums = [1, 2, 3, 4, 5, 6, 7]

Rx.Observable.from(nums).subscribe(getSubscriber('nums'))

const map = new Map([
    [1, 2],
    [3, 4],
    [5, 6]
])

Rx.Observable.from(map).subscribe(getSubscriber('map'))
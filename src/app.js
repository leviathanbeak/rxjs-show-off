import Rx from 'rxjs/Rx'

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
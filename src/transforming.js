import { Observable } from 'rxjs/Rx'
import getSubscriber from './getSubscriber'

Observable.interval(1000)
    .take(10)
    .map(v => v * v)
    .subscribe(getSubscriber('map'))

let names = ["elvis", "sarah"]
Observable.from(names)
    .map(v => v.toUpperCase())
    .subscribe(getSubscriber('name'))

const input = document.getElementById('input')

Observable.fromEvent(input, 'keyup')
    .map(e => e.target.value)
    .map(v => ({ value: v, length: v.length }))
    .subscribe(x => console.log(x))

let arr = [
    { value: 0 },
    { value: 1 },
    { value: 2 }
]

Observable.from(arr)
    .pluck('value')
    .subscribe(getSubscriber('pluck'))

Observable.from(arr)
    .first()
    .pluck('value')
    .subscribe(getSubscriber('first'))

Observable.from(arr)
    .last()
    .pluck('value')
    .subscribe(getSubscriber('last'))

Observable.from(arr)
    .single()
    .pluck('value')
    .subscribe(getSubscriber('single')) //needs only single value in the array

Observable.from(arr)
    .find(obj => obj.value === 2)
    .pluck('value')
    .subscribe(getSubscriber('find'))

Observable.from(arr)
    .skip(2)
    .pluck('value')
    .subscribe(getSubscriber('skip'))

Observable.from(arr)
    .skipWhile(obj => obj.value < 1)
    .pluck('value')
    .subscribe(getSubscriber('skipWhile'))

Observable.from(arr)
    .takeWhile(obj => obj.value < 1)
    .pluck('value')
    .subscribe(getSubscriber('takeWhile'))
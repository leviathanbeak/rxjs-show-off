import { Observable } from 'rxjs/Rx'
import getSubscriber from './getSubscriber'

Observable.range(1, 10)
    .filter(x => x > 5)
    .subscribe(getSubscriber('filter'))

let products = [
    { sku: '001', name: 'red thishrt', price: 4.99 },
    { sku: '002', name: 'pikachu', price: 24.50 },
    { sku: '003', name: 'batman belt', price: 7.75 },
    { sku: '004', name: 'elephant', price: 400 },
]

const input = document.getElementById('input')

Observable.from(products)
    .filter(e => e.price < 30)
    .pluck('name')
    .subscribe(getSubscriber('filter2'))

Observable.fromEvent(input, 'keyup')
    .map(e => e.target.value)
    .distinct()
    .debounceTime(1000)
    .subscribe(getSubscriber('debounce'))
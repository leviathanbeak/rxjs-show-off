import { Observable } from 'rxjs/Rx'
import getSubscriber from './getSubscriber'

const source$ = new Observable(observer => {
    console.log('creating observable')

    observer.next('next value')

    observer.complete()
})

source$.subscribe(getSubscriber('my observable'))

//hot observables
const hot$ = new Observable(observer => {
    observer.next(Date.now())
}).publish()

hot$.subscribe(getSubscriber('one'))
hot$.subscribe(getSubscriber('two'))

hot$.connect() //this one connects it, so now both subscribers get the same state (value)

//this one is running even if nobody listens
const hot2$ = new Observable
    .interval(1000)
    .publish()

hot2$.connect()

setTimeout(() => {
    hot2$.subscribe(getSubscriber('hot2'))
}, 3000)

//this one is started once someone subscribes
const hot3$ = new Observable
    .interval(1000)
    .publish()
    .refCount()

setTimeout(() => {
    hot3$.subscribe(getSubscriber('hot 3'))
}, 4000)
setTimeout(() => {
    hot3$.subscribe(getSubscriber('hot 3B'))
}, 8000)
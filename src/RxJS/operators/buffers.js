import { Observable } from 'rxjs/Rx'
import getSubscriber from './getSubscriber'

Observable.interval(1000)
    .buffer(Observable.interval(4000)) //bufferTime(4000) same thing
    .subscribe(getSubscriber('buffer'))

Observable.range(1, 100)
    .bufferCount(10)
    .subscribe(getSubscriber('bufferCount'))

//super combo buffer
const obs1$ = Observable.interval(1000)
const obs2$ = Observable.fromEvent(document, 'click')

const myBuffer = obs1$.buffer(obs2$)
myBuffer.subscribe(getSubscriber('myComboBuffer'))
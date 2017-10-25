import { Observable } from 'rxjs/Rx'
import getSubscriber from '../getSubscriber'

//hot observable, do not expect historical data

//cold observable, when u subscribe to it, then it's when it starts emitting something

const interval$ = Observable.interval(1000)
    .take(10)
    .publish()

interval$.connect()

setTimeout(() => {
    interval$.subscribe(getSubscriber('int1'))
}, 2000)

setTimeout(() => {
    interval$.subscribe(getSubscriber('int2'))
}, 3000)

const socket = { on: () => {} }

const chatMessages$ = new Observable(observer => {
        console.log('subscribed')
        socket.on('message', message => observer.next(message))
    }).publish() //so all the subscribers get the same

chatMessages$.connect()

chatMessages$.subscribe(getSubscriber('caht1'))
chatMessages$.subscribe(getSubscriber('caht2'))
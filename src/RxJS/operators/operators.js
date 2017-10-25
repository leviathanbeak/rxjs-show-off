import { Observable } from 'rxjs/Rx'
import getSubscriber from './getSubscriber'


const interval$ = new Observable
    .interval(100)
    .take(10)
    .subscribe(getSubscriber('interval'))

const source$ = new Observable
    .timer(3000, 100)
    .take(10)
    .subscribe(getSubscriber('timer'))

const range$ = new Observable
    .range(0, 5)
    .subscribe(getSubscriber('range'))

const of$ = new Observable
    .of(45, 'Hello', [23, 3213, 124, 124, 141, 4])
    .subscribe(getSubscriber('of'))

let i = 0
const defer$ = new Observable
    .defer(() => {
        i++
        return Observable.of(i)
    })

defer$.subscribe(getSubscriber('iA'))
defer$.subscribe(getSubscriber('iB'))
defer$.subscribe(getSubscriber('iC'))
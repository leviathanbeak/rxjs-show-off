import { Observable } from 'rxjs/Rx'
import getSubscriber from './getSubscriber'

const src1$ = Observable.of('one')
const src2$ = Observable.of('two')
const src3$ = Observable.of('three')
const src4$ = Observable.of('four')

const src$ = Observable.zip(
    src1$,
    src2$,
    src3$,
    src4$.delay(3000)
)

src$.subscribe(getSubscriber('zip'))

const interval$ = Observable.interval(1000)

const srcAgain$ = Observable.zip(
    interval$,
    interval$.take(5) //all will end as soon as one observable finishes
)

srcAgain$.subscribe(getSubscriber('zip2'))

const interval2$ = Observable.interval(500)

interval$.withLatestFrom(interval2$)
    .subscribe(getSubscriber('withLatest'))

const timer1$ = Observable.timer(1000, 4000)
const timer2$ = Observable.timer(2000, 4000)
const timer3$ = Observable.timer(3000, 4000)

const srcTimer$ = Observable.combineLatest(
    timer1$,
    timer2$,
    timer3$
)

srcTimer$.subscribe(getSubscriber('combineLatest'))
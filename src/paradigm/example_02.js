import { Observable } from 'rxjs/Rx'
import getSubscriber from '../getSubscriber'

Observable.interval(1000).take(5)

Observable.timer(1000, 500).take(6).subscribe(getSubscriber('timer'))

Observable.of('one', 'two', 'three').subscribe(getSubscriber('of'))

Observable.from(['one', 'two', 'three']).subscribe(getSubscriber('from'))

Observable.from([new Error('hey')])
    .subscribe(getSubscriber('error will be as a value'))

Observable.throw(1124124141)
    .subscribe(getSubscriber('from'))

Observable.empty()
    .subscribe(getSubscriber('empty'))

let sideEffect = 0

const defer$ = Observable.defer(() => {
    sideEffect++
    return Observable.of(sideEffect)
})

defer$.subscribe(getSubscriber('defer'))

Observable.never().subscribe(getSubscriber('never'))

Observable.range(10, 30).subscribe(getSubscriber('range'))
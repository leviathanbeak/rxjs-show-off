import { Observable } from 'rxjs/Rx'
import getSubscriber from './getSubscriber'

Observable.of('Hello')
    .merge(Observable.of('World'))
    .subscribe(getSubscriber('merge'))

Observable.interval(2000)
    .merge(Observable.interval(500))
    .take(10)
    .subscribe(getSubscriber('mergeIntervals'))

let source1$ = Observable.interval(2000).map(i => 'M1 ' + i)
let source2$ = Observable.interval(500).map(i => 'M2 ' + i)

Observable.merge(source1$, source2$).take(25)
    .subscribe(getSubscriber('merger'))

Observable.range(0, 3)
    .map(x => Observable.range(0, 3))
    .mergeAll()
    .subscribe(getSubscriber('mergeAll'))
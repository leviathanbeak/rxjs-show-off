import { Observable } from 'rxjs/Rx'
import getSubscriber from './getSubscriber'

const source$ = Observable.of()

source$.defaultIfEmpty('DEFAULT VALUE')
    .subscribe(getSubscriber('defo'))

Observable.of(1, 2, 3)
    .every(value => value % 2 === 0)
    .subscribe(getSubscriber('every'))

Observable.of(1, 2, 3, 4, 5, 6, 7)
    .do(v => console.log(`before map ${v}`))
    .map(v => v * v)
    .do(v => console.log(`after map ${v}`))
    .subscribe(getSubscriber('do'))

const src2$ = Observable.of(null)

Observable.merge(
    src2$.mapTo('First').delay(1000),
    src2$.mapTo('Second').delay(400),
    src2$.mapTo('Third'),
    src2$.mapTo('Fourth').delay(2000)
).subscribe(getSubscriber('delay'))

Observable.interval(1000)
    .delayWhen(() => Observable.timer(4000))
    .subscribe(getSubscriber('delayWhen'))

Observable.of(1, 2, 3, 4, 5)
    .map(v => v + 1)
    .let(obs => obs.map(v => v + 2))
    .subscribe(v => console.log('LET ', v))

const obsProm$ = v => Observable.of(v).delay(2000)

obsProm$('hello world')
    .toPromise()
    .then(res => console.log('from promise: ' + res))
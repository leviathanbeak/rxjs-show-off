import { Observable } from 'rxjs/Rx'
import getSubscriber from '../getSubscriber'

Observable.range(1, 110)
    .bufferCount(25)
    .subscribe(getSubscriber('bufferCount'))

Observable.interval(500).bufferTime(2000).mergeMap(i => Observable.of(i).map(res => `veri fani ${res}`)).subscribe(getSubscriber('myCombo'))

Observable.range(1, 10)
    .zip(Observable.interval(500), (left, right) => `item: ${left}, at ${right*500}`)
    .subscribe(getSubscriber('zip'))
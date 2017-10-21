import { Observable } from 'rxjs/Rx'
import getSubscriber from '../getSubscriber'

Observable.merge(
    Observable.interval(1000).map(i => `${i} seconds`),
    Observable.interval(500).map(i => `${i} half seconds`)
).take(10).subscribe(getSubscriber('merged'))

Observable.interval(500).take(5).concat(Observable.range(3, 9)).subscribe(getSubscriber('concat'))
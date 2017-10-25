import { Observable } from 'rxjs/Rx'
import getSubscriber from '../getSubscriber'

Observable.range(1, 3)
    .mergeMap(i => Observable.timer(i * 1000).map(() => `After ${i} Seconds`))
    .subscribe(getSubscriber('mergeMap'))
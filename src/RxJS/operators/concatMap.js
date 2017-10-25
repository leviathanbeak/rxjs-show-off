import { Observable } from 'rxjs/Rx'
import getSubscriber from './getSubscriber'

Observable.range(0, 10)
    .concatMap((x, i) => Observable.interval(1000)
        .take(x)
        .map(() => i)
    )
    .subscribe(getSubscriber('concatMap'))
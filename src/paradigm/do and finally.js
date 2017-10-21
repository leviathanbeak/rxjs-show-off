import { Observable } from 'rxjs/Rx'
import getSubscriber from '../getSubscriber'

Observable.range(1, 10)
    .do(n => console.log(`squaring ${n}`))
    .finally(() => console.log('I have completed'))
    .map(n => n * n)
    .subscribe(getSubscriber('squared'))

Observable.interval(1000).startWith(-20).subscribe(getSubscriber('startWithExample'))
import { Observable } from 'rxjs/Rx'
import getSubscriber from './getSubscriber'

const src1$ = Observable.throw(new Error('Something went wicked'))

src1$
    .catch(err => Observable.of(err))
    .subscribe(getSubscriber('error'))

src1$.onErrorResumeNext(
    Observable.of(1, 2, 3)
).subscribe(getSubscriber('resume next'))
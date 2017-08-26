import { Observable } from 'rxjs/Rx'
import getSubscriber from './getSubscriber'

let src1$ = Observable.of(45)
let src2$ = Observable.of(23)

Observable.concat(src1$, src2$)
    .subscribe(getSubscriber('concat'))

let src3$ = Observable.from([1, 2, 3, 4, 5, 6])
let src4$ = Observable.from([9, 8, 7])

Observable.concat(src3$, src4$)
    .subscribe(getSubscriber('concat2'))

//Observable.concatAll(src1$, src2$, src4$) doesn't exist anymore?
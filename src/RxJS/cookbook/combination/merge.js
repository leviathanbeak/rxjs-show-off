import { Observable } from 'rxjs/Rx'

// Turn multiple observables into a single observable.

const first$ = Observable.interval(2500)
const second$ = Observable.interval(2000)

Observable.merge(
    first$.mapTo('FIRST'),
    second$.mapTo('SECOND')
).subscribe(console.log)
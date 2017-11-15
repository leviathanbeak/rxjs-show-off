import { Observable } from 'rxjs/Rx'

// The observable to emit first is used.

Observable.race(
    Observable.interval(1000),
    Observable.interval(900)
).subscribe(console.log)
import { Observable } from 'rxjs/Rx'

// Combines multiple Observables to create an Observable whose values are calculated from the latest values of each of its input Observables.

const TimerOne$ = Observable.timer(1000, 4000)
const TimerTwo$ = Observable.timer(2000, 4000)
const TimerThree$ = Observable.timer(3000, 4000)

Observable.combineLatest(TimerOne$, TimerTwo$, TimerThree$).subscribe(
    ([v1, v2, v3]) => console.log(`ONE: ${v1}, TWO: ${v2}, THREE: ${v3} `)
)
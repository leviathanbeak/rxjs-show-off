import { Observable } from 'rxjs/Rx'

// Also provide the last value from another observable.

const firstSource$ = Observable.interval(5000)

const secondSource$ = Observable.interval(1000)

firstSource$.withLatestFrom(secondSource$).map(([first, second]) => `First ${first} and Second ${second}`).subscribe(console.log)
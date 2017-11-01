import { Observable } from 'rxjs/Rx'

// forkJoin() emits only the latest values from each of the input observables.
// I wouldnt say "latest", rather LAST values from each, so it basically waits for both (or more)
// streams to COMPLETE then it emits its last values, so basically using infinite streams is no go

const letter$ = Observable.interval(1000)
    .map(num => String.fromCharCode(65 + num))
    .map(letter => `Source 1 -> ${letter}`)
    .take(4)

const number$ = Observable.interval(1000)
    .map(num => `Source 2 -> ${num}`)
    .take(8)

Observable.forkJoin(
    letter$,
    number$
).subscribe(console.log)

Observable.forkJoin(
    Observable.of(42),
    Observable.interval(1000).take(5)
).subscribe(console.log)
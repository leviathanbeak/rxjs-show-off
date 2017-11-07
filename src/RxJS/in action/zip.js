import { Observable } from 'rxjs/Rx'

// In some ways, zip() works like combineLatest(), except that the former matches the index of the corresponding events one-to-one, 
// whereas the latter just combines the latest values when any of the observables emits a value.

const s1$ = Observable.of(1, 2, 3)
const s2$ = Observable.of('a', 'b', 'c')

Observable.zip(s1$, s2$).subscribe(console.log)
Observable.combineLatest(s1$, s2$).subscribe(console.log)

// now we implement a linear backoff that retries the first time after 1 second, the next time after 2 seconds, and so on
Observable.of(2, 4, 5, 6, 8, 10)
    .map(num => {
        if (num % 2 !== 0) {
            throw new Error(`unexpected odd number: ${num}`)
        }
        return num
    })
    .retryWhen(errors$ =>
        Observable.range(0, 3) //3 retries
        .zip(errors$, val => val) //zip is used to combine one-to-one values from the source observable (range) with the error observable. You pass a selector function, known in FP as the identity function, that returns the value of the first argument passed to it.        
        .mergeMap(i =>
            Observable.timer(i * 1000).do(() => console.log(`retrying after ${i} seconds`)) //Merges map with a timer observable based on the number of attempts. 
        )
    ).subscribe(
        next => console.log(next),
        err => console.log(err),
        () => console.log(`completed`)
    )

const MAX_RETRIES = 3
Observable.of(2, 4, 5, 6, 8, 10)
    .map(num => {
        if (num % 2 !== 0) {
            throw new Error(`unexpected odd number: ${num}`)
        }
        return num
    })
    .retryWhen(errors$ =>
        Observable.range(0, MAX_RETRIES + 1)
        .zip(errors$, (i, err) => ({ i, err }))
        .do(val => console.log(val))
        .mergeMap(({ i, err }) => {
            if (i === MAX_RETRIES) {
                return Observable.throw(err)
            }
            return Observable.timer(i * 1000).do(() => console.log(`retrying after ${i} seconds`))
        })
    ).subscribe(
        next => console.log(next),
        err => console.log(err),
        () => console.log(`completed`)
    )


Observable.of(2, 4, 5, 6, 8, 10)
    .map(num => {
        if (num % 2 !== 0) {
            throw new Error(`unexpected odd number: ${num}`)
        }
        return num
    })
    .retryWhen(errors$ =>
        Observable.range(0, MAX_RETRIES)
        .zip(errors$, (i, err) => ({ i, err }))
        .mergeMap(({ i, err }) => {
            return Observable.if(
                () => i <= MAX_RETRIES - 1,
                Observable.timer(i * 1000).do(() => console.log(`retrying after ${i} seconds`)),
                Observable.throw(err))
        })
    ).subscribe(
        next => console.log(next),
        err => console.log(err),
        () => console.log(`completed`)
    )
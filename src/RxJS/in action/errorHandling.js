import { Observable } from 'rxjs/Rx'

Observable.of(2, 4, 5, 6, 8, 10)
    .map(num => {
        if (num % 2 !== 0) {
            throw new Error(`unexpected odd number: ${num}`)
        }
        return num
    })
    .catch(err => Observable.of(6))
    .map(n => n / 2)
    .subscribe(
        next => console.log(next),
        err => console.log(err),
        () => console.log(`aaaaand it's gone`)
    )
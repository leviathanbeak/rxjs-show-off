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

// if you want to start from the beginning if error happens
// WARNING: this could be dangerous since you can enter into infinte loop

Observable.of(2, 3, 4)
    .map(num => {
        if (num % 2 !== 0) {
            throw new Error(`unexpected odd number: ${num}`)
        }
        return num
    })
    .catch((err, source) => source)
    .map(n => n / 2)
    .subscribe(
        next => console.log(next),
        err => console.log(err),
        () => console.log(`never gonna happen since we are stuck in the infinite loop`)
    )

// the same problem could happen with Promises 
// Because Promises are not retriable artifacts, dereferencing the value of a Promise will always return its fulfilled value or error, as the case may be

const requestQuote$ = symbol =>
    Observable.fromPromise(
        ajax(webservice.replace(/\$symbol/, symbol))
    )
    .catch((err$, promsie$) => promise$)
    .map(response => response.replace(/"/g, ''))
    .map(csv)

// RxJS provides more-intuitive ways of retrying via the retry() operator, which combines this notion of catching and reexecuting the source observable into one function
Observable.of(2, 4, 5, 6, 8, 10)
    .map(num => {
        if (num % 2 !== 0) {
            throw new Error(`unexpected odd number: ${num}`)
        }
        return num
    })
    .retry(3)
    .map(n => n / 2)
    .subscribe(
        next => console.log(next),
        err => console.log(err),
        () => console.log(`not gonna happen cuz there is an error`)
    )
    // Repeats this sequence three more times (a total of four) if there’s an error before giving up and letting the exception propagate down to the observer

// you can add catch after it and add some default value
Observable.of(2, 4, 5, 6, 8, 10)
    .map(num => {
        if (num % 2 !== 0) {
            throw new Error(`unexpected odd number: ${num}`)
        }
        return num
    })
    .retry(3)
    .map(n => n / 2)
    .catch(err => Observable.of(6))
    .subscribe(
        next => console.log(next),
        err => console.log(err),
        () => console.log(`aaaaand it's gone again with default value 6 yaaay`)
    )


// using retryWhen() and with help of scan() track num of times
Observable.of(2, 4, 5, 6, 8, 10)
    .map(num => {
        if (num % 2 !== 0) {
            throw new Error(`unexpected odd number: ${num}`)
        }
        return num
    })
    .retryWhen(errors$ =>
        errors$.scan((errorCount, err) => {
            console.log('goodbye')
            if (errorCount >= 3) {
                throw err
            }
            return errorCount + 1
        }, 0).delay(3000)
    )
    .map(n => n / 2)
    .subscribe(
        next => console.log(next),
        err => console.log(err),
        () => console.log(`not gonna happen cuz there is an error`)
    )

//  Because you’re running a two-second interval, you don’t expect a completion, but in the event of an error, you should also clean up the interval and cancel the subscription, so that the updated time shown reflects the last quoted update received before the error occurred
const lastUpdated = document.querySelector('#last-updated')
const updateSubscription = Observable.interval(2000).subscribe(() => {
    lastUpdated.innerHTML = new Date().toLocaleTimeString()
})

const requestQuote$ = symbol =>
    Observable.fromPromise(
        ajax(webservice.replace(/\$symbol/, symbol))
    )
    .catch((err$, promsie$) => promise$)
    .map(response => response.replace(/"/g, ''))
    .map(csv)
    .catch(() => Observable.of([new Error('check again later...'), 0]))
    .finally(() => {
        updateSubscription.unsubscribe()
    })
    // on finally() -> this operator mirrors the source observable and invokes a specified void function after the source observable terminates by invoking the observer’s complete() or error() methods. So the expectation is that finally() could perform some kind of side effect, if need be, such as cleanup actions.
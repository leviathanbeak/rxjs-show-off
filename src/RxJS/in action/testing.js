import { Observable } from 'rxjs/Rx'

describe('show off tests, how it should go', () => {
    it('should add numbers together', () => {
        const adder = (total, delta) => total + delta

        Observable.from([1, 23, 12, 354, 23, 52, 3, 5])
            .reduce(adder)
            .subscribe(total => {
                expect(total).to.equal(528)
            })
    })

    it('should fetch pages and search term', (done) => {
        const searchTerm = 'king bluetooth'

        const url = `someurlforsearching.com/term=${searchTerm}`

        const testFn = query => Observable.fromPromise(fakeAjaxPromise(query))
            .subscribe(data => {
                expect(data).to.have.property('query')
                    .with.property('search')
                    .with.length(10)
            }, null, done)

        testFn(url)
    })

})

Observable.interval(1000)
    .take(10)
    .filter(num => num % 2 === 0)
    .map(num => num * num)
    .reduce((total, delta) => total + delta)
    .subscribe(console.log)

//In order to make this program testable you need to do a few things:

// 1. Split out the business logic from the observable pipeline.
// 2. Decouple the consumer and producer and isolate the stream pipeline.This will allow you to inject your assertion code.
// 3. Wrap the stream into a function that you can call with the proper observer.

const isEven = num => num % 2 === 0
const square = num => num * num
const add = (a, b) => a + b

const runInterval = (source$) =>
    source$
    .take(10)
    .filter(isEven)
    .map(square)
    .reduce(add)

it('should square and add even numbers', (done) => {
    this.timeout(20000)
    runInterval(observable.interval(1000))
        .subscribe({
            next: total => expect(total).to.equal(120),
            err: err => assert.fail(err.message),
            complete: done
        })
})
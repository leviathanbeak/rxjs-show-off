import { Observable } from 'rxjs/Rx'

// In simple terms, a cold observable is one that doesn’t begin emitting all of its values until an observer subscribes to it.

// Furthermore, the declaration of a cold observable frequently begins with static operators such as of() or from(), 
// and timing observables interval() and timer() also behave coldly.

const arr$ = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
const sub1 = arr$.subscribe(console.log) // Every subscriber gets their own independent copy of the same data no matter when the subscription happens.

// ... moments later ... //
const sub2 = arr$.subscribe(console.log) // sub2 could have subscribed moments later, yet it still receives the entire array of elements.

// DEFINITION: A cold observable is one that, when subscribed to, emits the entire sequence of events to any active subscribers.

// COLD is when your observable creates the producer.

// HOT is when your observable closes over the producer.

// The lifecycle of the producer entity (a generic object) is bound to that of the observable’s
const cold$ = new Observable(observer => {
    const producer = new Producer()

    producer.addEventListener('some-event', e => observer.next(e))

    return () => producer.dispose()
})

// making a Hot -> Cold
const ws$ = new Observable(observer => {
    const socket = new Websocke('url')
    socket.addEventListener('message', e => observer.next(e))
    return () => socket.close()
})

const sub1 = ws$.map(msg => JSON.parse(msg.data)).subscribe(msg => console.log(`Sub1 ${msg}`))

const sub2 = ws$.map(msg => JSON.parse(msg.data)).subscribe(msg => console.log(`Sub2 ${msg}`))

// 1. Not global but instantiated with every observer
// 2. Gets its own dedicated socket connection


// PROBLEM (hot)
const futureVal = new Promise((resolve, reject) => {
    const value = computeValue();

    resolve(value);
});

const promise$ = Rx.Observable.fromPromise(futureVal);

// SOLUTION (cold)
const requestQuote$ = symbol => Observable.fromPromise(ajax('url'))

const fetchDataInterval$ = symbol => twoSecond$.mergeMap(() => requestQuote$(symbol))

// In essence, this is analogous to what you just learned, which is to move the source or the producer of events into the observable context:

const coldPromise$ = new Rx.Observable(observer => {
    const futureVal = new Promise((resolve, reject) => {

        const value = computeValue();

        resolve(value);
    });

    futureVal.then(result => {
        observer.next(result);
        observer.complete();
    });
})
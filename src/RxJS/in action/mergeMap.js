import { Observable } from 'rxjs/Rx'

// But there are also cases that occur frequently where an observable emits other observables of its own, a situation we call nesting the observable,
// But what happens when the function you’re trying to map also returns an observable? In other words, instead of mapping a function that returns some scalar value as you’ve been doing all along, the mapped function returns another observable—known as projecting an observable onto another, or an observable of observables.

// So the return would be something like this
// Observable<Observable<Array>>

// lets imageine sendRequest returns an observable

const sendRequest = () => Observable.of(1, 2, 3)

Observable.fromEvent(document, 'click')
    .mergeMap(event => sendRequest())
    .subscribe(console.log)
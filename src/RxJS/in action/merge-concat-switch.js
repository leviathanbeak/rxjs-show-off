import { Observable } from 'rxjs/Rx'

// following strategies

// 1. Interleave envets by merging streams - this strategy is useful for forwarding events from multiple streams and is ideal for handling different types of user interaction events like mouse or touch
// MERGE

// 2. Preserve order of events by concatonating streams - this one is used when the order of the events emitted by multiple streams needs to be perserved
// CONCAT



// 3. Switch to the latest stream data - this is used when one type of event kicks off anotehr, such as butn click initiation a remote HTTP call or beginning a timer
// SWITCH


// MERGE : ----->

const mouseUp$ = Observable.fromEvent(document, 'mouseup').map(event => ({ left: event.clientX, top: event.clientY }))
const touchEnd$ = Observable.fromEvent(document, 'touchend').map(event => ({ left: event.changedTouches[0].clientX, top: event.changedTouches[0].clientY }))

Observable.merge(
    mouseUp$,
    touchEnd$
).subscribe(x => console.log(x))

// WARNING: it iterates through all numbers first and then all letters
//this happens because the data is synchrounously available to emit
const src1$ = Observable.of(1, 2, 3)
const src2$ = Observable.of('a', 'b', 'c')
Observable.merge(src1$, src2$).subscribe(x => console.log(x))

// --------------------------------------------

// CONCAT: ------------>
// its IMPORANT TO note that a merge differs from concatenation on one key behavior
// whereas the merge() operator will allow you to subscribe to all of the src observables
// concat() will subscribe to only one observable at a time, it will hold only a single subscribption at a time and process that before the next one in order

// use it when order is important, so it will wait for first to finish then emit the second one
// WARNING: dont use concat with infinite streams, cuz if first one is INFINITE the second one will never happen, cuz first one wont complete ever ever
const src1$ = Observable.of(1, 2, 3).delay(3000)
const src2$ = Observable.of('a', 'b', 'c')

Observable.concat(src1$, src2$).subscribe(x => console.log(x))

// You can use merge() when you want to receive the latest event from any observable as it’s emitted, whereas concat() is useful when you wish to preserve the absolute ordering between observables.

// -----------------------------------------------------

// SWITCH : ---------->
// suppose you wanted a different behavior, such as cancelling the first sequence when a new one begins emitting.

Observable.fromEvent(document, 'click')
    .map(click => Observable.range(1, 3))
    .switch()
    .subscribe(console.log)

// When the click event occurs, this event is cancelled and replaced by another observable with numbers 1 through 3. In other words, subscribers never see the click event come in—a switch happened.
// The caveat is that each time the source observable emits, switch() immediately unsubscribes from it and begins emitting events from the latest observable that was mapped.
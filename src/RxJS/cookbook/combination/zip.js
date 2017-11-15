import { Observable } from 'rxjs/Rx'

// The zip operator will subscribe to all inner observables, waiting for each to emit a value. Once this occurs, all values with the corresponding index will be emitted. This will continue until at least one inner observable completes.

//emit every 1s
const interval = Observable.interval(1000)
    //when one observable completes no more values will be emitted
const example = Observable
    .zip(
        interval,
        interval.take(2)
    );
//output: [0,0]...[1,1]
const subscribe = example.subscribe(val => console.log(val))
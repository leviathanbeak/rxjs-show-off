import { Observable } from 'rxjs/Rx'

// Collect and subscribe to all observables.

const myPromise = val => new Promise(resolve => setTimeout(() => resolve(`Result: ${val}`), 2000))
    //emit 1,2,3
const source = Observable.of(1, 2, 3);

const example = source
    //map each value to promise
    .map(val => myPromise(val))
    //emit result from source
    .mergeAll();

/*
  output:
  "Result: 1"
  "Result: 2"
  "Result: 3"
*/
const subscribe = example.subscribe(val => console.log(val));
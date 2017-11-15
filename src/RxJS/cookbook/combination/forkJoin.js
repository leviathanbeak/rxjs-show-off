import { Observable } from 'rxjs/Rx'

// When all observables complete, emit the last value from each.

const myPromise = val => new Promise(resolve => setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000))

/*
  when all observables complete, give the last
  emitted value from each as an array
*/
const example = Observable.forkJoin(
    //emit 'Hello' immediately
    Observable.of('Hello'),
    //emit 'World' after 1 second
    Observable.of('World').delay(1000),
    //emit 0 after 1 second
    Observable.interval(1000).take(1),
    //emit 0...1 in 1 second interval
    Observable.interval(1000).take(2),
    //promise that resolves to 'Promise Resolved' after 5 seconds
    myPromise('RESULT')
);
//output: ["Hello", "World", 0, 1, "Promise Resolved: RESULT"]
const subscribe = example.subscribe(val => console.log(val));

//make 5 requests
const queue = Observable.of([1, 2, 3, 4, 5]);
//emit array of all 5 results
const exampleTwo = queue
    .mergeMap(q => Observable.forkJoin(...q.map(myPromise)));
/*
  output:
  [
   "Promise Resolved: 1", 
   "Promise Resolved: 2", 
   "Promise Resolved: 3", 
   "Promise Resolved: 4",    
   "Promise Resolved: 5"
  ]
*/
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
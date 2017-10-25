import { Observable, ReplaySubject, Subject } from 'rxjs/Rx'

//example of normal Subject
let subject = new Subject()

subject.next(1)
subject.subscribe(n => console.log(n))
subject.next(2)
subject.next(3)

//subject will only output 2 and 3, NOT 1, since it was before subscription

//replay subject will output all of them, no matter when is the subscription happening,
//so its caching the results

let replaySubject = new ReplaySubject()
replaySubject.next(1)
replaySubject.subscribe(n => console.log(n))
replaySubject.next(2)
replaySubject.next(3)

//paramters for ReplaySubject

//first paramter, how many values do u want to cache
let onlyLastTwoReplaySubject = new ReplaySubject(2)

//secod paramter, the time period (in milliseconds)
let last10SecondsReplaySubject = new ReplaySubject(null, 10000)
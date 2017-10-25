import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs/Rx'
import getSubscriber from './getSubscriber'

const subject$ = new Subject()

subject$.subscribe(getSubscriber('subject'))

subject$.next('hello')
subject$.next('world')

const behSubject$ = new BehaviorSubject(45)

behSubject$.subscribe(getSubscriber('behavior subject'))
behSubject$.next(12)
behSubject$.complete()

const replaySubject$ = new ReplaySubject(3)

replaySubject$.next(1)
replaySubject$.next(2)
replaySubject$.next(3)
replaySubject$.next(4)
replaySubject$.next(5)
replaySubject$.next(6)

replaySubject$.subscribe(getSubscriber('replay'))

const asyncSubject$ = new AsyncSubject()

asyncSubject$.next(1)
asyncSubject$.complete() //it has to complete
asyncSubject$.subscribe(getSubscriber('async'))
import { Observable, Subject } from 'rxjs/Rx'
import getSubscriber from '../getSubscriber'

// import fs from 'fs'

// const reddir$ = Observable.bindNodeCallback(fs.readdir)

// reddir$('../src')
//     .mergeMap(files => Observable.from(files))
//     .map(file => `MANIPULATED ${file}`)
//     .subscribe(getSubscriber('node stuff'))

const interval$ = Observable.interval(1000).take(5)
const intervalSubject$ = new Subject()
interval$.subscribe(intervalSubject$)

intervalSubject$.subscribe(getSubscriber('sub1'))
intervalSubject$.subscribe(getSubscriber('sub2'))
intervalSubject$.subscribe(getSubscriber('sub3'))

setTimeout(() => {
    //this is actually great, since its sharing the same timeout
    intervalSubject$.subscribe(getSubscriber('sub4'))
}, 3000)
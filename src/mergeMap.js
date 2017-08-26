import { Observable } from 'rxjs/Rx'
import getSubscriber from './getSubscriber'

Observable.of('Hello')
    .subscribe(v => {
        Observable.of(v + ' world')
            .subscribe(getSubscriber('WRONG'))
    })

//the right way
Observable.of('Hello')
    .mergeMap(v => Observable.of(v + ' World'))
    .subscribe(getSubscriber('RIGHT'))

//with promises
const myPromise = v => new Promise((resolve, reject) => resolve(v + ' World from promise'))

Observable.of('Hello')
    .mergeMap(v => myPromise(v))
    .subscribe(getSubscriber('promise'))
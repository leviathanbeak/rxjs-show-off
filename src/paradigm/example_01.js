import { Observable } from 'rxjs/Rx'
import getSubscriber from '../getSubscriber'

const simple$ = new Observable(observer => {
    console.log('Generating observable')

    setTimeout(() => {
        observer.next('first value')
        observer.next('second value')
        observer.complete()
    }, 1000)
})

simple$.subscribe({
    next: item => console.log(item),
    error(error) {
        console.log(error)
    },
    complete: function() {
        console.log('completed')
    }
})

function createInterval$(time) {
    return new Observable(observer => {
        let index = 0
        setInterval(() => {
            observer.next(index++)
        }, time)
    })
}

function take$(sourceObservable$, amount) {
    return new Observable(observer => {
        let count = 0
        const subscription = sourceObservable$.subscribe({
            next(item) {
                observer.next(item)
                if (++count >= amount) observer.complete()
            },
            error(error) { observer.error(error) },
            complete() { observer.complete() }
        })

        return () => subscription.unsubscribe()
    })
}

const everySecond$ = createInterval$(1000)
const firstFiveSeconds$ = take$(everySecond$, 5)
firstFiveSeconds$.subscribe(getSubscriber('everySecond'))
import { Observable } from 'rxjs/Rx'

//“Hot” Observables emit values regardless of Observers being subscribed to them. On the other hand, 
// “cold” Observables emit the entire sequence of values from the start to every Observer.

//We can turn a cold Observable into a hot one using publish. Calling publish creates a new Observable that acts as a proxy to the original one. 
//It does that by subscribing itself to the original and pushing the values it receives to its subscribers.
// A published Observable is actually a ConnectableObservable, which has an extra method called connect that we call to start receiving values. 
//This allows us to subscribe to it before it starts running:

const source$ = Observable.interval(1000)
const publisher$ = source$.publish()

// still no values are pushed yet untill we connect it!
const observer1 = publisher$.subscribe(x => {
    console.log(`observer1: ${x}`)
})

publisher$.connect()

setTimeout(() => {
    const observer2 = publisher$.subscribe(x => {
        console.log(`observe2 ${x}`)
    })
}, 5000)

//you can use share() to make it a HOT observable and dont need to worry about this connect() stuff
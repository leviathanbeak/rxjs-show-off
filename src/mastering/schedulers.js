arr​.groupBy(​function​(value) {​​ return​ value % 2 === 0;​ })​.map(​function​(value) { return​ value.observeOn(Rx.Scheduler.​default​);​ })​.map(​function​(groupedObservable) {​​ return​ expensiveOperation(groupedObservable);​ });

// observeOn takes a Scheduler and returns a new Observable that uses that Scheduler. It will make every onNext call run in the new Scheduler.

//The immediate Scheduler emits notifications from the Observable synchronously, so whenever an action is scheduled on the immediate Scheduler, 
//it will be executed right away, blocking the thread.

​
console.log(​'Before subscription'​);​​
Rx.Observable.range(1, 5)​.​do​(​function​(a) {​ console.log(​'Processing value'​, a);​ })​.map(​function​(value) {​ return​ value * value; })​.subscribe(​function​(value) { console.log(​'Emitted'​, value); });​​
console.log(​'After subscription'​)

//The default Scheduler runs actions asynchronously. You can think of it as a rough equivalent of setTimeout with zero milliseconds delay that keeps the order in the sequence. 
//It uses the most efficient asynchronous implementation available on the platform it runs
console.log(​'Before subscription'​);​
Rx.Observable.range(1, 5)​.​do​(​function​(value) {​ console.log(​'Processing value'​, value);​ })​.observeOn(Rx.Scheduler.​default​)​.map(​function​(value) {​ return​ value * value; })​.subscribe(​function​(value) { console.log(​'Emitted'​, value); });​
console.log(​'After subscription'​);

//The default Scheduler never blocks the event loop, so it’s ideal for operations that involve time, like asynchronous requests. 
//It can also be used in Observables that never complete, because it doesn’t block the program while waiting for new notifications (which may never happen).
//The currentThread Scheduler is useful for operations that involve recursive operators like repeat, and in general for iterations that contain nested operators.
​​
var​ scheduler = Rx.Scheduler.currentThread;​
Rx.Observable.​return​(10, scheduler).repeat().take(1)​.subscribe(​function​(value) {​ console.log(value);​ });
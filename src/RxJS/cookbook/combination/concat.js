import { Observable } from 'rxjs/Rx'

// Creates an output Observable which sequentially emits all values from every given input Observable after the current Observable.

const srcOne$ = Observable.of(1, 2, 3)
const srcTwo$ = Observable.of(4, 5, 6)

srcOne$.concat(srcTwo$).subscribe(console.log)
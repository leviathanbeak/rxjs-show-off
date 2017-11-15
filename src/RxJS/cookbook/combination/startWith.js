import { Observable } from 'rxjs/Rx'

// Emit given value first.

Observable.of(1, 2, 3).startWith("jesam").subscribe(console.log)